"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

type Slide = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  date: string,
  kind: "h" | "v"; // horizontal / vertical
};

const slides: Slide[] = [
  { id: "01", src: "/images/01.jpg", alt: "Диджей и ведущий", kind: "h", caption: "Озвучиваю корпоратив в Москве", date: "2024 г."},
  { id: "02", src: "/images/02.jpg", alt: "Диджей за пультом", kind: "v", caption: "Играю DJ-сет в клубе в Иваново", date: "2022 г."},
  { id: "03", src: "/images/03.jpg", alt: "Fuckup Event", kind: "h", caption: "На мероприятии \"FUCKUP EVENT ИСТОРИИ\"", date: "2025 г." },
  { id: "10", src: "/images/10.jpg", alt: "Диджей в наушниках", kind: "v", caption: "Камерный день рождения в Питере", date: "2025 г." },
  { id: "06", src: "/images/06.jpg", alt: "День рождения Чайханы", kind: "v", caption: "10 лет ресторану \"Чайхана\"", date: "2025 г." },
  { id: "04", src: "/images/04.jpg", alt: "Школа диджеев", kind: "h", caption: "Выпускной в школе диджеев", date: "2021 г." },
  { id: "09", src: "/images/09.jpg", alt: "Диджей за работой", kind: "v", caption: "Озвучиваю свадьбу", date: "2024 г." },
  { id: "07", src: "/images/07.jpg", alt: "Студийное фото", kind: "v", caption: "Фотосессия с ведущими Алексеем и Еленой", date: "2025 г." },
  { id: "05", src: "/images/05.jpg", alt: "Диджей за пультом", kind: "h", caption: "Играю DJ-сет в клубе во Владимире", date: "2025 г." },
  
  
  
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

  useEffect(() => {
  const el = scrollerRef.current;
  if (!el) return;

  let rafId: number;
  const speed = 0.9; // ← скорость (меньше = медленнее)

  const autoScroll = () => {
    if (!isDown) {
      el.scrollLeft += speed;

      // если дошли до конца — начинаем сначала
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
    }

    rafId = requestAnimationFrame(autoScroll);
  };

  rafId = requestAnimationFrame(autoScroll);

  return () => cancelAnimationFrame(rafId);
}, [isDown]);

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
      "group relative shrink-0 rounded-xl",
      "h-[400px]",
      s.kind === "v" ? "w-[320px]" : "w-[520px]",
      "bg-light/10",
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

    {/* ПОДПИСЬ */}
    <div
  className="
    absolute bottom-3 left-3
    bg-white/10 backdrop-blur-sm
    rounded-lg
    p-4
    text-xs
    text-white
    pointer-events-none

    /* mobile — всегда видно */
    opacity-100 translate-y-0

    /* desktop — только при hover */
    md:opacity-0 md:translate-y-2
    md:group-hover:opacity-100
    md:group-hover:translate-y-0

    transition-all duration-300 ease-out
  "
>
  {s.caption}
  <p className="text-white/50 mt-1">{s.date}</p>
</div>
  </div>
))}

          </div>
        </div>
      </div>
    </section>
  );
}
