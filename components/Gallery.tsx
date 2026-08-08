"use client";

import Image from "next/image";
import { useEffect, useState } from "react";


type Slide = {
  id: string;
  frames: string[];
  alt: string;
  kind: "h" | "v";
  label: string;
  labelPosition: string; 
};

const slides: Slide[] = [
  {
    id: "01",
    kind: "h",
    alt: "Диджей и ведущий",
    label: "Озвучиваю корпоративные мероприятия",
    labelPosition: "bottom-4 right-4",
    frames: [
      "/images/photo-1.jpg",
      "/images/photo-1-1.jpg",
      "/images/photo-1-2.jpg",
      "/images/photo-1-3.jpg",
      "/images/photo-1-4.jpg",
      "/images/photo-1-5.jpg",
    ],
  },
  {
    id: "02",
    kind: "v",
    alt: "Диджей за пультом",
    label: "Провожу DJ-сеты на вечеринках и в ночных клубах",
    labelPosition: "top-4 left-4",
    frames: [
      "/images/photo-2.jpg",
      "/images/photo-2-1.jpg",
      "/images/photo-2-2.jpg",
      "/images/photo-2-3.jpg",
      "/images/photo-2-4.jpg",
      "/images/photo-2-5.jpg",
      "/images/photo-2-6.jpg",
      "/images/photo-2-7.jpg",
    ],
  },
  {
    id: "03",
    kind: "h",
    alt: "Fuckup Event",
    label: "Посещаю мероприятия для сотрудников Event-сферы",
    labelPosition: "bottom-4 right-4",
    frames: [
      "/images/photo-3.jpg",
      "/images/photo-3-1.jpg",
      "/images/photo-3-2.jpg",
      "/images/photo-3-3.jpg",
      "/images/photo-3-4.jpg",
    ],
  },
  {
    id: "04",
    kind: "v",
    alt: "Камерный день рождения в Питере",
    label: "Озвучиваю камерные мероприятия",
    labelPosition: "top-4 right-4",
    frames: [
      "/images/photo-4.jpg",
      "/images/photo-4-1.jpg",
      "/images/photo-4-2.jpg",
      "/images/photo-4-3.jpg",
      "/images/photo-4-4.jpg",
      "/images/photo-4-5.jpg",
      "/images/photo-4-6.jpg",
    ],
  },
  {
    id: "05",
    kind: "v",
    alt: "10 лет ресторану Чайхана",
    label: "Организую техническое обеспечение любых площадок",
    labelPosition: "bottom-4 left-4",
    frames: [
      "/images/photo-5.jpg",
      "/images/photo-5-1.jpg",
      "/images/photo-5-2.jpg",
      "/images/photo-5-3.jpg",
      "/images/photo-5-4.jpg",
      "/images/photo-5-5.jpg",
    ],
  },
  {
    id: "06",
    kind: "h",
    alt: "Выпускной в школе диджеев",
    label: "Прохожу обучения и пробую новые форматы мероприятий",
    labelPosition: "bottom-6 right-6",
    frames: [
      "/images/photo-6.jpg",
      "/images/photo-6-1.jpg",
      "/images/photo-6-2.jpg",
      "/images/photo-6-3.jpg",
      "/images/photo-6-4.jpg",
      "/images/photo-6-5.jpg",
    ],
  },
  {
    id: "07",
    kind: "v",
    alt: "Озвучиваю свадьбу",
    label: "Озвучиваю свадебные вечера и церемонии",
    labelPosition: "top-4 right-4",
    frames: [
      "/images/photo-7.jpg",
      "/images/photo-7-1.jpg",
      "/images/photo-7-2.jpg",
      "/images/photo-7-3.jpg",
      "/images/photo-7-4.jpg",
      "/images/photo-7-5.jpg",
    ],
  },
  {
    id: "08",
    kind: "v",
    alt: "Фотосессия с ведущими",
    label: "Дружу и сотрудничаю с крутыми профи Event-индустрии",
    labelPosition: "bottom-4 left-4",
    frames: [
      "/images/photo-8.jpg",
      "/images/photo-8-1.jpg",
      "/images/photo-8-2.jpg",
      "/images/photo-8-3.jpg",
      "/images/photo-8-4.jpg",
    ],
  },
];

function GalleryItem({
  slide,
  isActive,
  onActivate,
}: {
  slide: Slide;
  isActive: boolean;
  onActivate: () => void;
}) {
  const [frame, setFrame] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isPlaying = isActive || isHovered;
  const visibleFrame = isPlaying ? frame : 0;

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setFrame((i) => (i + 1) % slide.frames.length);
    }, 200);

    return () => clearInterval(timer);
  }, [isPlaying, slide.frames.length]);

  function startHover() {
    if (window.innerWidth < 768) return;
    setFrame(0);
    setIsHovered(true);
  }

  function stopHover() {
    if (window.innerWidth < 768) return;
    setIsHovered(false);
    setFrame(0);
  }

  function handleClick() {
    if (window.innerWidth >= 768) return;
    setFrame(0);
    onActivate();
  }

  return (
    <div
      className={[
        "relative",
        "h-[380px] sm:h-[460px] lg:h-[400px]",
        "w-full",
        "overflow-visible",
      ].join(" ")}
      onMouseEnter={startHover}
      onMouseLeave={stopHover}
      onClick={handleClick}
    >
      {/* КАРТИНКА */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-light/10 backdrop-blur-[2px]">
        <Image
          src={slide.frames[visibleFrame]}
          alt={slide.alt}
          fill
          className="object-cover transition-opacity duration-200"
          sizes="(max-width: 1024px) 100vw, 25vw"
          draggable={false}
        />
      </div>

      {/* ПЛАШКА */}
      <div
        className={[
          "absolute",
          slide.labelPosition,
          "p-4 w-36",
          "rounded-xl",
          "bg-black",
          "text-xs text-beige",
          "z-20",
          "pointer-events-none",
        ].join(" ")}
      >
        {slide.label}
      </div>
    </div>
  );
}



export default function GallerySlider() {
  const [activeSlideId, setActiveSlideId] = useState<string | null>(null);

  return (
    <section id="gallery" className="relative w-full bg-black">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 px-4 py-4">
        {slides.map((slide) => (
          <GalleryItem
            key={slide.id}
            slide={slide}
            isActive={activeSlideId === slide.id}
            onActivate={() => setActiveSlideId(slide.id)}
          />
        ))}
      </div>
    </section>
  );
}
