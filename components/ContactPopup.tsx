// components/ContactPopup.tsx
"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import SuccessToast, { FormSubmitSpinner } from "@/components/ui/SuccessToast";

type Props = {
  open: boolean;
  onClose: () => void;
};

type Messenger = "telegram" | "whatsapp" | "vk" | "";
type ToastState = "success" | "error" | null;

function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && (digits.startsWith("7") || digits.startsWith("8")))
    return digits;
  if (digits.length === 10) return "7" + digits;
  return digits;
}

function formatPhone(raw: string) {
  const d = raw.replace(/\D/g, "");
  let digits = d;
  if (digits.startsWith("8")) digits = "7" + digits.slice(1);
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
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isSubmitting) onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose, isSubmitting]);

  const normalizedPhone = useMemo(() => normalizePhone(phoneInput), [phoneInput]);

  const phoneIsValid = useMemo(() => {
    return normalizedPhone.length === 11 && normalizedPhone.startsWith("7");
  }, [normalizedPhone]);

  const canSubmit = useMemo(() => {
    const contactOk = phoneIsValid || messenger !== "";
    return contactOk && consent;
  }, [phoneIsValid, messenger, consent]);

  function resetForm() {
    setName("");
    setPhoneInput("");
    setMessenger("");
    setComment("");
    setConsent(false);
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhoneInput(formatPhone(e.target.value));
  }

  async function handleSubmit() {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "callback",
          name,
          phone: phoneInput,
          comment,
        }),
      });

      const data = await res.json().catch(() => ({}));
      const delivered =
        data?.delivery?.telegram === true || data?.delivery?.email === true;

      if (!res.ok || !delivered) {
        setToast("error");
        return;
      }

      resetForm();
      onClose();
      setToast("success");
    } catch {
      setToast("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="Закрыть"
            onClick={onClose}
            disabled={isSubmitting}
            className="absolute inset-0 bg-black/70"
          />

          <div className="relative z-[2001] w-[min(540px,92vw)] bg-whitesoft rounded-2xl shadow-2xl p-4 md:p-6 pt-6 md:pt-12">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Закрыть"
              className="absolute right-4 top-4 h-10 w-10 rounded-lg text-black hover:bg-black hover:text-light transition flex items-center justify-center disabled:opacity-40 disabled:pointer-events-none"
            >
              ✕
            </button>

            <h2 className="hero-subtitle text-center font-bold">
              Укажите номер, <br /> по которому с вами <br /> можно связаться
            </h2>

            <div className="mt-4 lg:mt-6 space-y-3">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                disabled={isSubmitting}
                className="w-full h-12 lg:h-16 rounded-xl border border-black/20 px-6 text-lg lg:text-xl outline-none focus:border-black disabled:opacity-60"
              />

              <div className="bg-white w-full h-12 lg:h-16 rounded-xl border border-black/20 px-6 flex items-center gap-3 focus-within:border-black">
                <span className="text-lg lg:text-xl">🇷🇺</span>
                <input
                  inputMode="tel"
                  value={phoneInput}
                  onChange={handlePhoneChange}
                  placeholder="+7 (000) 000-00-00"
                  disabled={isSubmitting}
                  className="w-full h-full text-lg lg:text-xl outline-none bg-white disabled:opacity-60"
                />
              </div>

              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Комментарий (необязательно)"
                rows={3}
                disabled={isSubmitting}
                className="w-full rounded-xl border border-black/20 px-6 py-4 text-base lg:text-lg outline-none resize-none focus:border-black disabled:opacity-60"
              />

              <label className="mt-4 flex items-start gap-4 text-xs">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  disabled={isSubmitting}
                  className="mt-1 h-6 w-6 accent-black disabled:opacity-60"
                />
                <span className="leading-snug">
                  Я даю согласие на обработку персональных данных в соответствии
                  с{" "}
                  <Link
                    href="/privacy"
                    className="text-accent underline underline-offset-2 hover:text-accent/70"
                    onClick={onClose}
                  >
                    Политикой конфиденциальности
                  </Link>
                </span>
              </label>

              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className={[
                  "mt-6 w-full h-12 lg:h-16 rounded-2xl font-medium text-lg transition",
                  "flex items-center justify-center gap-2",
                  canSubmit && !isSubmitting
                    ? "bg-black text-light hover:opacity-90"
                    : "bg-black/20 text-black/40 cursor-not-allowed",
                ].join(" ")}
              >
                {isSubmitting ? (
                  <>
                    <FormSubmitSpinner />
                    Отправляем...
                  </>
                ) : (
                  "Отправить данные"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <SuccessToast variant={toast} onClose={() => setToast(null)} />
      )}
    </>
  );
}
