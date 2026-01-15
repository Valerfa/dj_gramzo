import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      return NextResponse.json(
        { error: "Telegram env vars are missing" },
        { status: 500 }
      );
    }

    let message = "";

    // ===== ОБРАТНЫЙ ЗВОНОК (popup) =====
    if (type === "callback") {
      message = `
📞 ОБРАТНЫЙ ЗВОНОК

👤 Имя: ${body.name || "—"}
📞 Телефон: ${body.phone || "—"}
💬 Комментарий: ${body.comment || "—"}
`;
    }

    // ===== АНКЕТА =====
    if (type === "questionnaire") {
  message = `
📝 АНКЕТА

💍 Пара: ${body.coupleNames || "—"}
🎉 Формат: ${body.eventFormat || "—"}

📅 Дата: ${body.eventDate || "—"}
📍 Место: ${body.eventLocation || "—"}
👥 Гостей: ${body.guestsCount || "—"}

🎤 Программа:
${body.showProgram || "—"}

🎶 Артисты:
${body.artists || "—"}

⛔ Стоп-лист:
${body.stopList?.trim() || "Не указан"}

📞 Связь (${body.contactMethod}):
${body.contactDetails || "—"}
`;
}

    if (!message) {
      return NextResponse.json(
        { error: "Unknown form type" },
        { status: 400 }
      );
    }

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}