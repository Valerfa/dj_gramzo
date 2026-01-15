"use client";

import { useState } from "react";
import Link from "next/link";


type ContactMethod = "phone" | "telegram" | "whatsapp";

export default function QuestionnairePage() {
  const [form, setForm] = useState({
    coupleNames: "",
    eventFormat: "",
    eventDate: "",
    eventLocation: "",
    guestsCount: "",
    showProgram: "",
    artists: "",
    stopList: "",
    contactMethod: "phone" as ContactMethod,
    contactDetails: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [consent, setConsent] = useState(false);

  const requiredFields = [
  form.coupleNames,
  form.eventFormat,
  form.eventDate,
  form.eventLocation,
  form.guestsCount,
  form.showProgram,
  form.artists,
  form.contactMethod,
  form.contactDetails,
  consent,
];

const allFilled = requiredFields.every(Boolean);

  function updateField<K extends keyof typeof form>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
  if (!allFilled) return;

  if (form.contactMethod === "phone") {
    if (!isValidPhone(form.contactDetails)) {
      setPhoneError("Введите корректный номер телефона");
      return;
    }
  }

  setPhoneError("");

  await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "questionnaire",
      ...form,
      consent: true, // 👈 можно явно отправлять
    }),
  });

  alert("Анкета отправлена");
}

  const contactOptions = [
  { label: "Телефон", value: "phone" },
  { label: "Telegram", value: "telegram" },
  { label: "WhatsApp", value: "whatsapp" },
];

function isValidPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  
  if (digits.length !== 11) return false;
  if (!digits.startsWith("7") && !digits.startsWith("8")) return false;

  return true;
}


  return (
    <main className="bg-white px-4 md:px-10 py-16 max-w-3xl mx-auto space-y-5">
      
      {/* ===== БЛОК 1. С ФОТО ===== */}
      <section className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Прошу вас ответить на несколько вопросов о вашем торжестве
        </h1>

        <input
          placeholder="Имена пары"
          value={form.coupleNames}
          onChange={(e) => updateField("coupleNames", e.target.value)}
          className="w-full h-14 rounded-xl border px-6"
        />

        <input
          placeholder="Формат мероприятия (свадьба, юбилей и т.д.)"
          value={form.eventFormat}
          onChange={(e) => updateField("eventFormat", e.target.value)}
          className="w-full h-14 rounded-xl border px-6"
        />
      </section>

      {/* ===== БЛОК 2. ДАТА ===== */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Дата мероприятия?</h2>

        <input
          type="date"
          value={form.eventDate}
          onChange={(e) => updateField("eventDate", e.target.value)}
          className="w-full h-14 rounded-xl border px-6"
        />

        <input
          placeholder="Место проведения"
          value={form.eventLocation}
          onChange={(e) => updateField("eventLocation", e.target.value)}
          className="w-full h-14 rounded-xl border px-6"
        />

        <input
          placeholder="Количество гостей"
          value={form.guestsCount}
          onChange={(e) => updateField("guestsCount", e.target.value)}
          className="w-full h-14 rounded-xl border px-6"
        />
      </section>

      {/* ===== БЛОК 3. ПРОГРАММА ===== */}
      <section className="space-y-1">
        <h2 className="text-2xl font-semibold">
          Планируется ли развлекательная программа?
        </h2>

        <textarea
          placeholder="Опишите формат программы"
          value={form.showProgram}
          onChange={(e) => updateField("showProgram", e.target.value)}
          className="w-full rounded-xl border px-6 py-4"
          rows={4}
        />

        <textarea
          placeholder="Артисты, выступления, пожелания"
          value={form.artists}
          onChange={(e) => updateField("artists", e.target.value)}
          className="w-full rounded-xl border px-6 py-4"
          rows={4}
        />
        <textarea
  placeholder="Композиции и исполнители «стоп-листа» (какую музыку вы хотите исключить?)"
  value={form.stopList}
  onChange={(e) => updateField("stopList", e.target.value)}
  className="w-full rounded-xl border px-6 py-4"
  rows={4}
/>
      </section>

      {/* ===== БЛОК 4. СПОСОБ СВЯЗИ ===== */}
      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">
          Укажите удобный способ для связи
        </h2>

        <div className="flex gap-6">
  {contactOptions.map(({ label, value }) => (
    <label key={value} className="flex items-center gap-2">
      <input
        type="radio"
        checked={form.contactMethod === value}
        onChange={() => updateField("contactMethod", value)}
      />
      {label}
    </label>
  ))}
</div>


        <input
  placeholder={
    form.contactMethod === "phone"
      ? "Телефон"
      : form.contactMethod === "telegram"
      ? "Telegram @username"
      : "WhatsApp номер"
  }
  value={form.contactDetails}
  onChange={(e) => {
    updateField("contactDetails", e.target.value);
    if (phoneError) setPhoneError("");
  }}
  className={`w-full h-14 rounded-xl border px-6 ${
    phoneError ? "border-red-500" : ""
  }`}
/>

{phoneError && (
  <p className="text-sm text-red-500 mt-1">
    {phoneError}
  </p>
)}
      </section>
<label className="mt-4 flex items-start gap-3 text-xs">
  <input
    type="checkbox"
    checked={consent}
    onChange={(e) => setConsent(e.target.checked)}
    className="mt-1 h-5 w-5 accent-black"
  />
  <span className="leading-snug">
    Я даю согласие на обработку персональных данных в соответствии с{" "}
    <Link
      href="/privacy"
      className="underline underline-offset-2 hover:opacity-70"
    >
      Политикой конфиденциальности
    </Link>
  </span>
</label>
      {/* ===== ОТПРАВКА ===== */}
      <button
  disabled={!allFilled}
  onClick={handleSubmit}
  className={`w-full h-14 rounded-2xl text-lg transition ${
    allFilled
      ? "bg-black text-white"
      : "bg-black/20 text-black/40 cursor-not-allowed"
  }`}
>
  Отправить анкету
</button>
    </main>
  );
}