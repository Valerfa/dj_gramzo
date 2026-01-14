"use client";

import Image from "next/image";
import { useRef, useState } from "react";

type Slide = {
  id: string;
  src: string;
  alt: string;
  kind: "h" | "v"; // horizontal / vertical
};

const slides: Slide[] = [
  { id: "01", src: "/images/01.jpg", alt: "Диджей и ведущий", kind: "h" },

  
  { id: "02", src: "/images/02.jpg", alt: "Диджей за пультом", kind: "v" },
  { id: "03", src: "/images/03.jpg", alt: "Fuckup Event", kind: "h" },
  { id: "10", src: "/images/10.jpg", alt: "Диджей в наушниках", kind: "v" },
  { id: "06", src: "/images/06.jpg", alt: "День рождения Чайханы", kind: "v" },
  { id: "04", src: "/images/04.jpg", alt: "Школа диджеев", kind: "h" },
  { id: "09", src: "/images/09.jpg", alt: "Диджей за работой", kind: "v" },
  { id: "07", src: "/images/07.jpg", alt: "Студийное фото", kind: "v" },

  { id: "05", src: "/images/05.jpg", alt: "Диджей за пультом", kind: "h" },
  
  
  
];

export default function GallerySlider() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;

    setIsDown(true);
    el.setPointerCapture(e.pointerId);

    startX.current = e.clientX;
    startScrollLeft.current = el.scrollLeft;
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el || !isDown) return;

    const dx = e.clientX - startX.current;
    el.scrollLeft = startScrollLeft.current - dx;
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    const el = scrollerRef.current;
    if (!el) return;

    setIsDown(false);
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {}
  }

  return (
    <section id="gallery" className="relative w-full">
      {/* Background */}
      <div className="absolute inset-0 bg-black">
        <Image
          src="/images/12.jpg"
          alt="Фон галереи"
          fill
          priority
          className="object-cover grayscale"
          sizes="100vw"
        />
        {/* Transparent overlay */}
        <div className="absolute inset-0 bg-beige" />
      </div>

      {/* Высота блока */}
      <div className="w-full">
       
   

        {/* Лента */}
        <div className="w-full">
          <div
            ref={scrollerRef}
            className={[
              "no-scrollbar",
              "flex items-center gap-2",
              "overflow-x-auto overflow-y-hidden",
              "select-none",
              "cursor-grab active:cursor-grabbing",
              "scroll-smooth",
              "pb-6",
            ].join(" ")}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            {/* отступ слева 50px для первой фотографии */}
            <div className="shrink-0" />

            {slides.map((s) => (
            
              <div
                key={s.id}
                className={[
                  "relative shrink-0 rounded-xl",
                  "h-[400px]",
                  // ширина зависит от ориентации (чтобы выглядело как “плашки” на рефе)
                  s.kind === "v" ? "w-[320px]" : "w-[520px]",
                  "bg-white/10",
                  "backdrop-blur-[2px]",
                  "overflow-hidden",
                ].join(" ")}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 85vw, 520px"
                  draggable={false}
                />
              </div>
             
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
