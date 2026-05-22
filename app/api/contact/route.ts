import { NextResponse } from "next/server";
import { promises as dnsPromises, Resolver } from "node:dns";

export const runtime = "nodejs";

// Получатель заявок (можно переопределить через .env: MAIL_TO=...)
const MAIL_TO = process.env.MAIL_TO || "fatykhova.l@yandex.ru";

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
  const bypass = process.env.SMTP_DNS_BYPASS === "true";
  if (!bypass) return host;

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

export async function POST(req: Request) {
  const requestId = crypto.randomUUID();

  try {
    console.info("[contact-api] Incoming request", {
      requestId,
      method: req.method,
      url: req.url,
    });

    const body = await req.json();
    const { type } = body;

    console.info("[contact-api] Parsed body", {
      requestId,
      type,
      bodyKeys: Object.keys(body),
    });

    let subject = "";
    let message = "";

    if (type === "callback") {
      subject = "Обратный звонок с сайта djgramzo.ru";
      message = `📞 ОБРАТНЫЙ ЗВОНОК

👤 Имя: ${body.name || "—"}
📞 Телефон: ${body.phone || "—"}
💬 Комментарий: ${body.comment || "—"}`;
    }

    if (type === "questionnaire") {
      subject = "Новая анкета с сайта djgramzo.ru";
      message = `📝 АНКЕТА

🎉 Формат: ${body.eventFormat || "—"}

📅 Дата: ${body.eventDate || "—"}
📍 Место: ${body.eventLocation || "—"}
👥 Гостей: ${body.guestsCount || "—"}

🎤 Программа и пожелания:
${body.showProgram || "—"}

📞 Связь (${body.contactMethod}):
${body.contactDetails || "—"}`;
    }

    if (!message) {
      console.warn("[contact-api] Unknown form type", { requestId, type });
      return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
    }

    // 1) Telegram (если переменные заданы)
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    let telegramSent = false;
    let telegramError: string | null = null;

    console.info("[contact-api] Runtime env availability", {
      requestId,
      TELEGRAM_BOT_TOKEN: Boolean(token),
      TELEGRAM_CHAT_ID: Boolean(chatId),
      SMTP_HOST: Boolean(process.env.SMTP_HOST),
      SMTP_PORT: Boolean(process.env.SMTP_PORT),
      SMTP_USER: Boolean(process.env.SMTP_USER),
      SMTP_PASS: Boolean(process.env.SMTP_PASS),
      SMTP_SECURE: Boolean(process.env.SMTP_SECURE),
      MAIL_FROM: Boolean(process.env.MAIL_FROM),
      MAIL_TO: Boolean(process.env.MAIL_TO),
      resolvedMailTo: MAIL_TO,
    });

    if (token && chatId) {
      try {
        const telegramResponse = await fetch(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ chat_id: chatId, text: message }),
          }
        );
        const telegramResponseText = await telegramResponse.text();

        if (!telegramResponse.ok) {
          telegramError = `Telegram API error ${telegramResponse.status}: ${telegramResponseText}`;
          console.error("[contact-api] Telegram send failed", {
            requestId,
            status: telegramResponse.status,
            response: telegramResponseText,
          });
        } else {
          telegramSent = true;
          console.info("[contact-api] Telegram send success", {
            requestId,
            status: telegramResponse.status,
          });
        }
      } catch (error) {
        const details = getErrorDetails(error);
        telegramError = details.message;
        console.error("[contact-api] Telegram send exception", {
          requestId,
          error: details,
        });
      }
    } else {
      telegramError = "Telegram env vars are not configured";
      console.warn("[contact-api] Telegram skipped", {
        requestId,
        TELEGRAM_BOT_TOKEN: Boolean(token),
        TELEGRAM_CHAT_ID: Boolean(chatId),
      });
    }

    // 2) E-mail получателю через SMTP (адрес берётся из MAIL_TO)
    //    Используем nodemailer, если он установлен и SMTP_* заданы.
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const missingSmtpVars = [
      ["SMTP_HOST", smtpHost],
      ["SMTP_USER", smtpUser],
      ["SMTP_PASS", smtpPass],
    ]
      .filter(([, value]) => !value)
      .map(([name]) => name);

    let mailSent = false;
    let mailError: string | null = null;

    if (smtpHost && smtpUser && smtpPass) {
      const smtpPort = Number(process.env.SMTP_PORT || 465);
      const smtpSecure = (process.env.SMTP_SECURE || "true") === "true";
      const mailFrom = process.env.MAIL_FROM || smtpUser;

      console.info("[contact-api] SMTP config", {
        requestId,
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        user: smtpUser,
        from: mailFrom,
        to: MAIL_TO,
      });

      try {
        const connectHost = await resolveSmtpHostIfNeeded(smtpHost, requestId);
        if (connectHost !== smtpHost) {
          console.info("[contact-api] SMTP connect host overridden", {
            requestId,
            originalHost: smtpHost,
            connectHost,
          });
        }

        // Динамический импорт, чтобы сборка не падала, если зависимость не установлена
        const nodemailer = await import("nodemailer").then((m) => m.default || m);
        const transporter = nodemailer.createTransport({
          host: connectHost,
          port: smtpPort,
          secure: smtpSecure,
          auth: { user: smtpUser, pass: smtpPass },
          // Если подключаемся по IP, SNI/сертификат всё равно проверяем на оригинальном хосте
          tls: { servername: smtpHost },
          connectionTimeout: 15000,
          greetingTimeout: 15000,
          socketTimeout: 20000,
        });

        try {
          await transporter.verify();
          console.info("[contact-api] SMTP connection verified", {
            requestId,
            host: smtpHost,
            port: smtpPort,
          });
        } catch (verifyError) {
          const details = getErrorDetails(verifyError);
          console.error("[contact-api] SMTP verify failed", {
            requestId,
            error: details,
          });
          throw verifyError;
        }

        const mailInfo = await transporter.sendMail({
          from: mailFrom,
          to: MAIL_TO,
          subject,
          text: message,
        });
        mailSent = true;
        console.info("[contact-api] SMTP send success", {
          requestId,
          messageId: mailInfo.messageId,
          accepted: mailInfo.accepted,
          rejected: mailInfo.rejected,
          response: mailInfo.response,
        });
      } catch (error) {
        const details = getErrorDetails(error);
        mailError = details.message;
        console.error("[contact-api] SMTP send exception", {
          requestId,
          error: details,
        });
      }
    } else {
      mailError = `SMTP env vars are not configured: ${missingSmtpVars.join(", ")}`;
      console.warn("[contact-api] SMTP skipped", {
        requestId,
        missingSmtpVars,
      });
    }

    console.info("[contact-api] Delivery result", {
      requestId,
      type,
      telegramSent,
      mailSent,
      telegramError,
      mailError,
    });

    return NextResponse.json({
      ok: true,
      requestId,
      delivery: {
        telegram: telegramSent,
        telegramError,
        email: mailSent,
        emailTo: MAIL_TO,
        emailError: mailError,
      },
    });
  } catch (error) {
    console.error("[contact-api] Request failed", {
      requestId,
      error: getErrorDetails(error),
    });

    return NextResponse.json(
      { error: "Failed to send message", requestId },
      { status: 500 }
    );
  }
}
