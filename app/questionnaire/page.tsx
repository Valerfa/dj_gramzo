"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type ContactMethod = "phone" | "telegram" | "max";

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, "");

  let normalized = digits;
  if (normalized.startsWith("8")) {
    normalized = "7" + normalized.slice(1);
  }

  normalized = normalized.slice(0, 11);

  let result = "+7";

  if (normalized.length > 1) {
    result += " (" + normalized.slice(1, 4);
  }
  if (normalized.length >= 4) {
    result += ")";
  }
  if (normalized.length >= 5) {
    result += " " + normalized.slice(4, 7);
  }
  if (normalized.length >= 8) {
    result += "-" + normalized.slice(7, 9);
  }
  if (normalized.length >= 10) {
    result += "-" + normalized.slice(9, 11);
  }

  return result;
}

export default function QuestionnairePage() {
  const [form, setForm] = useState({
    eventFormat: "",
    eventDate: "",
    eventLocation: "",
    guestsCount: "",
    showProgram: "",
    contactMethod: "phone" as ContactMethod,
    contactDetails: "",
  });

  const [phoneError, setPhoneError] = useState("");
  const [consent, setConsent] = useState(false);

  const requiredFields = [
    form.eventFormat,
    form.eventDate,
    form.eventLocation,
    form.guestsCount,
    form.showProgram,
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
        consent: true,
      }),
    });

    alert("Анкета отправлена");
  }

  const contactOptions: { label: string; value: ContactMethod }[] = [
    { label: "Телефон", value: "phone" },
    { label: "Telegram", value: "telegram" },
    { label: "MAX", value: "max" },
  ];

  function isValidPhone(phone: string) {
    const digits = phone.replace(/\D/g, "");

    if (digits.length !== 11) return false;
    if (!digits.startsWith("7") && !digits.startsWith("8")) return false;

    return true;
  }

  return (
    <main className="min-h-screen bg-white md:flex">
      <Link
        href="/"
        className="
          fixed top-4 left-4 z-50
          md:top-6 md:left-6
        "
      >
        <Image
          src="/icons/logo-black.svg"
          alt="Логотип Грамзо"
          width={36}
          height={36}
          priority
        />
      </Link>
      <Link
        href="/"
        className="
          fixed bottom-4 left-4 z-50
          md:bottom-6 md:left-6
          inline-flex items-center justify-center
          h-12 px-6
          rounded-lg
          bg-black text-white text-sm font-medium
          hover:bg-white hover:text-black transition
        "
      >
        ← Назад
      </Link>
      {/* ===== ЛЕВАЯ КОЛОНКА С ФОТО ===== */}
      <div className="relative w-full h-[33vh] md:hidden">
        <Image
          src="/images/konstantin-1.JPG"
          alt="Константин"
          fill
          priority
          className="object-cover"
        />
      </div>
      <aside className="hidden md:block md:w-1/3">
        <div className="sticky top-0 h-screen">
          <Image
            src="/images/konstantin-1.JPG"
            alt="Константин"
            fill
            priority
            className="object-cover"
          />
        </div>
      </aside>

      {/* ===== ПРАВАЯ КОЛОНКА С АНКЕТОЙ ===== */}
      <section className="w-full md:w-2/3 px-4 md:px-10 py-16 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-5">
          {/* ===== БЛОК 1. О МЕРОПРИЯТИИ ===== */}
          <section className="space-y-2">
            <h1 className="title text-2xl md:text-4xl text-center mb-8">
              Прошу вас ответить на несколько вопросов о вашем мероприятии
            </h1>

            <input
              placeholder="Формат мероприятия (свадьба, юбилей и т.д.)"
              value={form.eventFormat}
              onChange={(e) => updateField("eventFormat", e.target.value)}
              className="w-full h-14 rounded-xl border px-6"
            />
          </section>

          {/* ===== БЛОК 2. ДАТА ===== */}
          <section className="space-y-2">
            <h2 className="title text-lg text-black">Дата</h2>

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
            <h2 className="title text-lg text-black">
              Планируется ли развлекательная программа?
            </h2>

            <textarea
              placeholder="Опишите формат программы и Ваши пожелания"
              value={form.showProgram}
              onChange={(e) => updateField("showProgram", e.target.value)}
              className="w-full rounded-xl border px-6 py-4"
              rows={4}
            />
          </section>

          {/* ===== БЛОК 4. СПОСОБ СВЯЗИ ===== */}
          <section className="space-y-2">
            <h2 className="title text-lg text-black">
              Удобный способ связи
            </h2>

            <div className="flex gap-6 flex-wrap">
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
              inputMode="tel"
              placeholder="+7 (999) 999-99-99"
              value={form.contactDetails}
              onChange={(e) => {
                if (form.contactMethod === "phone") {
                  updateField("contactDetails", formatPhone(e.target.value));
                } else {
                  updateField("contactDetails", e.target.value);
                }
                if (phoneError) setPhoneError("");
              }}
              className={`w-full h-14 rounded-xl border px-6 ${
                phoneError ? "border-red-500" : ""
              }`}
            />

            {phoneError && (
              <p className="text-sm text-red-500 mt-1">{phoneError}</p>
            )}
          </section>
          <label className="mt-4 flex items-center gap-3 text-xs">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="h-5 w-5 accent-black"
            />
            <span className="leading-snug">
              Я даю согласие на обработку персональных данных в соответствии с{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-2 hover:text-accent/70 text-accent"
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
        </div>
      </section>
    </main>
  );
}
