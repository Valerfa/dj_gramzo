"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "djgramzo_cookie_consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === "accepted") return;
    setVisible(true);
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Уведомление об использовании cookie"
      className="
        fixed z-[1000]
        bottom-4 left-4 right-4
        md:left-auto md:right-6 md:bottom-6 md:max-w-md
        rounded-2xl border border-light/20
        bg-black/90 backdrop-blur-md
        shadow-2xl
        p-4 md:p-5
      "
    >
      <p className="text-light/90 text-sm md:text-base leading-snug">
        Мы используем файлы cookie для корректной работы сайта и улучшения
        пользовательского опыта.
      </p>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/privacy"
          className="text-light/70 text-sm underline underline-offset-2 hover:text-light transition-colors"
        >
          Политика конфиденциальности
        </Link>

        <button
          type="button"
          onClick={handleAccept}
          className="
            shrink-0
            h-10 px-6
            rounded-xl
            bg-accent text-light
            text-sm font-medium
            hover:opacity-90
            transition-opacity
          "
        >
          Принять
        </button>
      </div>
    </div>
  );
}
