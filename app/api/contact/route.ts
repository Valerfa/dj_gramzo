import { NextResponse } from "next/server";

// Получатель заявок (можно переопределить через .env: MAIL_TO=...)
const MAIL_TO = process.env.MAIL_TO || "linkall_rus@mail.ru";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;

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
      return NextResponse.json({ error: "Unknown form type" }, { status: 400 });
    }

    // 1) Telegram (если переменные заданы) — оставляем как было
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (token && chatId) {
      try {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: message }),
        });
      } catch {
        // не падаем — пробуем e-mail дальше
      }
    }

    // 2) E-mail на linkall_rus@mail.ru через SMTP
    //    Используем nodemailer, если он установлен и SMTP_* заданы.
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    let mailSent = false;
    let mailError: string | null = null;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        // Динамический импорт, чтобы сборка не падала, если зависимость не установлена
        const nodemailer = await import("nodemailer").then((m) => m.default || m);
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(process.env.SMTP_PORT || 465),
          secure: (process.env.SMTP_SECURE || "true") === "true",
          auth: { user: smtpUser, pass: smtpPass },
        });

        await transporter.sendMail({
          from: process.env.MAIL_FROM || smtpUser,
          to: MAIL_TO,
          subject,
          text: message,
        });
        mailSent = true;
      } catch (e) {
        mailError = e instanceof Error ? e.message : "mail error";
      }
    } else {
      mailError = "SMTP env vars are not configured";
    }

    return NextResponse.json({
      ok: true,
      delivery: {
        telegram: Boolean(token && chatId),
        email: mailSent,
        emailTo: MAIL_TO,
        emailError: mailError,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
