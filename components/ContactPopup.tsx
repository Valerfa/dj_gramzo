// components/ContactPopup.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";


type Props = {
  open: boolean;
  onClose: () => void;
};

type Messenger = "telegram" | "whatsapp" | "vk" | "";

function normalizePhone(raw: string) {
  // оставляем только цифры
  const digits = raw.replace(/\D/g, "");
  // для РФ: допускаем +7XXXXXXXXXX или 8XXXXXXXXXX
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8"))) return digits;
  if (digits.length === 10) return "7" + digits; // если ввели без кода
  return digits;
}

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  // строим маску +7 (999) 999-99-99
  let digits = d;

  // если пользователь начал с 8 — визуально всё равно показываем +7
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);

  // если начал с 7 и ввёл больше — оставим как есть
  const dd = digits.slice(0, 11);

  const p1 = dd.slice(1, 4);
  const p2 = dd.slice(4, 7);
  const p3 = dd.slice(7, 9);
  const p4 = dd.slice(9, 11);

  let out = "+7";
  if (p1) out += ` (${p1}`;
  if (p1.length === 3) out += `)`;
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;

  return out;
}

export default function ContactPopup({ open, onClose }: Props) {
  const [name, setName] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [messenger, setMessenger] = useState<Messenger>("");
  const [consent, setConsent] = useState(false);

  // закрытие по Esc + блок скролла
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const normalizedPhone = useMemo(() => normalizePhone(phoneInput), [phoneInput]);

  const phoneIsValid = useMemo(() => {
    // РФ номер: 11 цифр и начинается с 7
    return normalizedPhone.length === 11 && normalizedPhone.startsWith("7");
  }, [normalizedPhone]);

  // Кнопка активна, если:
  // 1) есть валидный телефон ИЛИ выбран мессенджер
  // 2) поставлено согласие
  const canSubmit = useMemo(() => {
    const contactOk = phoneIsValid || messenger !== "";
    return contactOk && consent;
  }, [phoneIsValid, messenger, consent]);

  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value;
    setPhoneInput(formatPhone(raw));
  }

  async function handleSubmit() {
  if (!canSubmit) return;

  await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "callback",
      name,
      phone: phoneInput,
      comment,
    }),
  });

  setSubmitted(true);
}

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* overlay */}
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* modal */}
      <div className="relative z-[2001] w-[min(540px,92vw)] bg-whitesoft rounded-2xl shadow-2xl p-4 md:p-6 pt-6 md:pt-12">
        {/* close X */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute right-4 top-4 h-10 w-10 rounded-lg text-black hover:bg-black hover:text-light transition flex items-center justify-center"
        >
          ✕
        </button>

        {!submitted ? (
  <>
    <h2 className="hero-subtitle text-center font-bold">
      Укажите номер, <br /> по которому с вами <br /> можно связаться
    </h2>

    <div className="mt-4 lg:mt-6 space-y-3">
      {/* name */}
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Ваше имя"
        className="w-full h-12 lg:h-16 rounded-xl border border-black/20 px-6 text-lg lg:text-xl outline-none focus:border-black"
      />

      {/* phone */}
      <div className="bg-white w-full h-12 lg:h-16 rounded-xl border border-black/20 px-6 flex items-center gap-3 focus-within:border-black">
        <span className="text-lg lg:text-xl">🇷🇺</span>
        <input
          inputMode="tel"
          value={phoneInput}
          onChange={handlePhoneChange}
          placeholder="+7 (000) 000-00-00"
          className="w-full h-full text-lg lg:text-xl outline-none bg-white"
        />
      </div>

      {/* comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий (необязательно)"
        rows={3}
        className="w-full rounded-xl border border-black/20 px-6 py-4 text-base lg:text-lg outline-none resize-none focus:border-black"
      />

      {/* consent */}
      <label className="mt-4 flex items-start gap-4 text-xs">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          className="mt-1 h-6 w-6 accent-black"
        />
        <span className="leading-snug">
          Я даю согласие на обработку персональных данных в соответствии с{" "}
          <Link
            href="/privacy"
            className="text-accent underline underline-offset-2 hover:text-accent/70"
            onClick={onClose}
          >
            Политикой конфиденциальности
          </Link>
        </span>
      </label>

      {/* submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!canSubmit}
        className={[
          "mt-6 w-full h-12 lg:h-16 rounded-2xl font-medium text-lg transition",
          canSubmit
            ? "bg-black text-light hover:opacity-90"
            : "bg-black/20 text-black/40 cursor-not-allowed",
        ].join(" ")}
      >
        Отправить данные
      </button>
    </div>
  </>
) : (


  <div className="py-20 text-center flex flex-col items-center gap-6">
  {/* success icon */}
  <svg
    className="success-icon"
    width="48"
    height="48"
    viewBox="0 0 72 72"
    fill="none"
  >
    <circle
      cx="36"
      cy="36"
      r="34"
      fill="#56AE62"
      strokeWidth="4"
      className="success-circle"
    />
    <path
      d="M22 38L32 48L50 28"
      stroke="#F3EDE6"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="success-check"
    />
  </svg>

  <p className="text-xl lg:text-2xl font-medium leading-snug">
    Данные успешно отправлены!</p>
   
</div>
)}
      </div>
    </div>
  );
}