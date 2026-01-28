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
              alt="Логотип"
              width={36}
              height={36}
              priority
            />
          </a>

          {/* ТЕЛЕФОН */}
          <a className="phone" href="tel:+79203669096">
            +7 (920) 366-90-96
          </a>
        </nav>
      </div>
    </header>
  );
}