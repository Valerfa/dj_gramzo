"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="
        fixed top-0 z-50
        mx-2 mt-2
        w-[calc(100%-1rem)]
        flex justify-center
        pointer-events-none
      "
    >
      <div
        className={`
          pointer-events-auto
          transition-all duration-500 ease-out
          ${scrolled
            ? "w-[420px] bg-black/40 backdrop-blur-xl rounded-2xl shadow-lg"
            : "w-full bg-transparent"
          }
        `}
      >
        <nav className="nav flex items-center justify-between px-4 md:px-4 lg:px-8 xl:px-12 py-3">
          {/* ЛОГО */}
          <a href="/" className="flex items-center">
            <Image
              src="/icons/logo.svg"
              alt="Логотип Грамзо"
              width={36}
              height={36}
              priority
            />
          </a>

          {/* ТЕЛЕФОН + MAX */}
          <div className="flex items-center gap-3 md:gap-4">
            <a className="phone" href="tel:+79203669096">
              +7 (920) 366-90-96
            </a>
            <a
              href="https://max.ru/u/f9LHodD0cOI50J_6W7Qn3gk0z1t8bR3Bh6tWeAuVO5xLz52vbgrjTOkKzvU"
              target="_blank"
              rel="noopener noreferrer"
              title="Написать в MAX"
              className="text-light/90 hover:text-[var(--color-accent)] transition-colors"
              aria-label="Открыть чат в MAX"
            >
              <Image
                src="/icons/max-color.svg"
                alt="MAX"
                width={32}
                height={32}
                className="block"
              />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}