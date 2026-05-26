"use client";

import { useEffect } from "react";

type Variant = "success" | "error";

const CONTENT: Record<
  Variant,
  { title: string; message: string; borderClass: string }
> = {
  success: {
    title: "✅ Заявка отправлена",
    message:
      "Спасибо! Я получил вашу заявку и свяжусь с вами в ближайшее время.",
    borderClass: "border-light/20",
  },
  error: {
    title: "❌ Не удалось отправить заявку",
    message: "Попробуйте ещё раз или свяжитесь со мной напрямую.",
    borderClass: "border-accent/40",
  },
};

type Props = {
  variant: Variant;
  onClose: () => void;
  autoCloseMs?: number;
};

export function FormSubmitSpinner() {
  return (
    <span
      className="inline-block h-5 w-5 shrink-0 rounded-full border-2 border-current/30 border-t-current animate-spin"
      aria-hidden="true"
    />
  );
}

export default function SuccessToast({
  variant,
  onClose,
  autoCloseMs = 6000,
}: Props) {
  const { title, message, borderClass } = CONTENT[variant];

  useEffect(() => {
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [onClose, autoCloseMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed z-[3000] bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md toast-enter"
    >
      <div
        className={`
          rounded-2xl border ${borderClass}
          bg-black/95 backdrop-blur-md
          shadow-2xl
          p-5 md:p-6
        `}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p
              className="text-light font-semibold text-base md:text-lg leading-snug"
              style={{ fontFamily: "Unbounded, sans-serif" }}
            >
              {title}
            </p>
            <p className="mt-2 text-light/80 text-sm md:text-base leading-relaxed">
              {message}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть уведомление"
            className="shrink-0 h-8 w-8 rounded-lg text-light/60 hover:text-light hover:bg-light/10 transition flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
