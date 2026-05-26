import { NextResponse } from "next/server";
import { promises as dnsPromises, Resolver } from "node:dns";

export const runtime = "nodejs";

// Получатель заявок. Берётся ТОЛЬКО из .env, фолбэк — на текущий рабочий ящик,
// если переменная не задана в окружении (например, забыли положить .env на проде).
const FALLBACK_MAIL_TO = "linkall_rus@mail.ru";

type DeliveryResult = {
  ok: boolean;
  error: string | null;
  durationMs: number;
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

function getErrorDetails(error: unknown) {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message,
      stack: error.stack,
    };
  }
  return { message: String(error) };
}

// Резолвим SMTP-хост через публичный DNS, если включён SMTP_DNS_BYPASS=true.
// Нужно для локальной разработки, когда системный резолвер отдаёт sinkhole-IP
// (например, через AdGuard/NextDNS/VPN). На проде с нормальным DNS не используется.
async function resolveSmtpHostIfNeeded(
  host: string,
  requestId: string
): Promise<string> {
  if (process.env.SMTP_DNS_BYPASS !== "true") return host;

  const dnsServers = (process.env.SMTP_DNS_SERVERS || "8.8.8.8,1.1.1.1")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const systemIps = await dnsPromises.lookup(host, { all: true });
    const resolver = new Resolver();
    resolver.setServers(dnsServers);
    const publicIps = await new Promise<string[]>((resolve, reject) => {
      resolver.resolve4(host, (err, addrs) => {
        if (err) reject(err);
        else resolve(addrs);
      });
    });

    console.info("[contact-api] SMTP DNS bypass", {
      requestId,
      host,
      dnsServers,
      systemIps: systemIps.map((r) => r.address),
      publicIps,
    });

    return publicIps[0] || host;
  } catch (error) {
    console.warn("[contact-api] SMTP DNS bypass failed, using system DNS", {
      requestId,
      error: getErrorDetails(error),
    });
    return host;
  }
}

async function sendTelegram(
  requestId: string,
  message: string
): Promise<DeliveryResult> {
  const started = Date.now();
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[contact-api] Telegram skipped (no env)", { requestId });
    return {
      ok: false,
      error: "Telegram env vars are not configured",
      durationMs: Date.now() - started,
    };
  }

  console.info("[contact-api] Telegram start", { requestId });

  try {
    // Таймаут на запрос к Telegram, чтобы не вешать handler на минуты,
    // даже если у Telegram что-то с сетью.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message }),
        signal: controller.signal,
      }
    );
    clearTimeout(timeoutId);

    const responseText = await response.text();
    const durationMs = Date.now() - started;

    if (!response.ok) {
      const error = `Telegram API ${response.status}: ${responseText}`;
      console.error("[contact-api] Telegram done (failed)", {
        requestId,
        durationMs,
        status: response.status,
      });
      return { ok: false, error, durationMs };
    }

    console.info("[contact-api] Telegram done (ok)", {
      requestId,
      durationMs,
    });
    return { ok: true, error: null, durationMs };
  } catch (error) {
    const durationMs = Date.now() - started;
    console.error("[contact-api] Telegram done (exception)", {
      requestId,
      durationMs,
      error: getErrorDetails(error),
    });
    return { ok: false, error: getErrorMessage(error), durationMs };
  }
}

async function sendEmail(
  requestId: string,
  subject: string,
  message: string,
  mailTo: string
): Promise<DeliveryResult> {
  const started = Date.now();

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  const missing = [
    !smtpHost && "SMTP_HOST",
    !smtpUser && "SMTP_USER",
    !smtpPass && "SMTP_PASS",
  ].filter(Boolean) as string[];

  if (missing.length > 0) {
    console.warn("[contact-api] SMTP skipped (no env)", {
      requestId,
      missing,
    });
    return {
      ok: false,
      error: `SMTP env vars missing: ${missing.join(", ")}`,
      durationMs: Date.now() - started,
    };
  }

  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const smtpSecure = (process.env.SMTP_SECURE || "true") === "true";
  const mailFrom = process.env.MAIL_FROM || smtpUser!;

  console.info("[contact-api] SMTP start", {
    requestId,
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    user: smtpUser,
    from: mailFrom,
    to: mailTo,
  });

  try {
    const connectHost = await resolveSmtpHostIfNeeded(smtpHost!, requestId);
    if (connectHost !== smtpHost) {
      console.info("[contact-api] SMTP connect host overridden", {
        requestId,
        originalHost: smtpHost,
        connectHost,
      });
    }

    const nodemailer = await import("nodemailer").then((m) => m.default || m);
    const transporter = nodemailer.createTransport({
      host: connectHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
      // SNI/сертификат проверяем на оригинальном хосте, даже если подключаемся по IP
      tls: { servername: smtpHost },
      // Жёсткие таймауты, чтобы handler не висел дольше 10s, если SMTP-порт зарезан
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
    });

    // НЕ вызываем transporter.verify() — он делает лишний RTT к SMTP
    // и удваивает задержку. sendMail сам поднимет ошибку, если сервер недоступен.
    const info = await transporter.sendMail({
      from: mailFrom,
      to: mailTo,
      subject,
      text: message,
    });

    const durationMs = Date.now() - started;
    console.info("[contact-api] SMTP done (ok)", {
      requestId,
      durationMs,
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    return { ok: true, error: null, durationMs };
  } catch (error) {
    const durationMs = Date.now() - started;
    console.error("[contact-api] SMTP done (exception)", {
      requestId,
      durationMs,
      error: getErrorDetails(error),
    });
    return { ok: false, error: getErrorMessage(error), durationMs };
  }
}

function buildMessage(body: Record<string, unknown>): {
  subject: string;
  message: string;
} | null {
  const type = body.type;

  if (type === "callback") {
    return {
      subject: "Обратный звонок с сайта djgramzo.ru",
      message: `📞 ОБРАТНЫЙ ЗВОНОК

👤 Имя: ${body.name || "—"}
📞 Телефон: ${body.phone || "—"}
💬 Комментарий: ${body.comment || "—"}`,
    };
  }

  if (type === "questionnaire") {
    return {
      subject: "Новая анкета с сайта djgramzo.ru",
      message: `📝 АНКЕТА

🎉 Формат: ${body.eventFormat || "—"}

📅 Дата: ${body.eventDate || "—"}
📍 Место: ${body.eventLocation || "—"}
👥 Гостей: ${body.guestsCount || "—"}

🎤 Программа и пожелания:
${body.showProgram || "—"}

📞 Связь (${body.contactMethod}):
${body.contactDetails || "—"}`,
    };
  }

  return null;
}

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();
  const requestStarted = Date.now();
  const mailTo = process.env.MAIL_TO || FALLBACK_MAIL_TO;

  console.info("[contact-api] Incoming request", {
    requestId,
    method: req.method,
    url: req.url,
  });

  try {
    const body = (await req.json()) as Record<string, unknown>;

    console.info("[contact-api] Parsed body", {
      requestId,
      type: body.type,
      bodyKeys: Object.keys(body),
    });

    const built = buildMessage(body);
    if (!built) {
      console.warn("[contact-api] Unknown form type", {
        requestId,
        type: body.type,
      });
      return NextResponse.json(
        { error: "Unknown form type", requestId },
        { status: 400 }
      );
    }

    console.info("[contact-api] Runtime env availability", {
      requestId,
      TELEGRAM_BOT_TOKEN: Boolean(process.env.TELEGRAM_BOT_TOKEN),
      TELEGRAM_CHAT_ID: Boolean(process.env.TELEGRAM_CHAT_ID),
      SMTP_HOST: process.env.SMTP_HOST || null,
      SMTP_PORT: process.env.SMTP_PORT || null,
      SMTP_USER: process.env.SMTP_USER || null,
      SMTP_PASS: Boolean(process.env.SMTP_PASS),
      SMTP_SECURE: process.env.SMTP_SECURE || null,
      MAIL_FROM: process.env.MAIL_FROM || null,
      MAIL_TO_env: process.env.MAIL_TO || null,
      MAIL_TO_resolved: mailTo,
    });

    // Параллельная доставка: Telegram + Email. Ждём оба, но не последовательно.
    const [telegramResult, emailResult] = await Promise.all([
      sendTelegram(requestId, built.message),
      sendEmail(requestId, built.subject, built.message, mailTo),
    ]);

    const totalMs = Date.now() - requestStarted;

    console.info("[contact-api] Delivery result", {
      requestId,
      type: body.type,
      mailTo,
      totalMs,
      telegram: {
        ok: telegramResult.ok,
        ms: telegramResult.durationMs,
        error: telegramResult.error,
      },
      email: {
        ok: emailResult.ok,
        ms: emailResult.durationMs,
        error: emailResult.error,
      },
    });

    return NextResponse.json({
      ok: true,
      requestId,
      durationMs: totalMs,
      delivery: {
        telegram: telegramResult.ok,
        telegramError: telegramResult.error,
        email: emailResult.ok,
        emailTo: mailTo,
        emailError: emailResult.error,
      },
    });
  } catch (error) {
    const totalMs = Date.now() - requestStarted;
    console.error("[contact-api] Request failed", {
      requestId,
      totalMs,
      error: getErrorDetails(error),
    });

    return NextResponse.json(
      { error: "Failed to send message", requestId },
      { status: 500 }
    );
  }
}
