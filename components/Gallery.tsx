"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";


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

function GalleryItem({ slide }: { slide: Slide }) {
  const [frame, setFrame] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  

  function startHover() {
    // на мобиле hover не нужен
    if (window.innerWidth < 768) return;
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setFrame((i) => (i + 1) % slide.frames.length);
    }, 200);
  }

  function stopHover() {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setFrame(0);
  }

  return (
  <div
  className={[
    "relative shrink-0",
    "h-[400px]",
    slide.kind === "v" ? "w-[320px]" : "w-[520px]",
    "overflow-visible",
  ].join(" ")}
  onMouseEnter={startHover}
  onMouseLeave={stopHover}
>
    {/* КАРТИНКА */}
   <div className="relative w-full h-full rounded-xl overflow-hidden bg-light/10 backdrop-blur-[2px]">
  <Image
    src={slide.frames[frame]}
    alt={slide.alt}
    fill
    className="object-cover transition-opacity duration-200"
    sizes="(max-width: 768px) 85vw, 520px"
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
    "bg-black ",
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
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [isDown, setIsDown] = useState(false);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const directionRef = useRef<1 | -1>(1);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
const [showCursor, setShowCursor] = useState(false);
  
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

  // определяем направление для автоскролла
  directionRef.current = dx > 0 ? -1 : 1;
}

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
  const el = scrollerRef.current;
  if (!el) return;

  setIsDown(false);

  try {
    el.releasePointerCapture(e.pointerId);
  } catch {}
}

function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
  setCursorPos({
    x: e.clientX,
    y: e.clientY,
  });
}

  useEffect(() => {
  const el = scrollerRef.current;
  if (!el) return;

  let rafId: number;
  const speed = 0.9;

  const autoScroll = () => {
    if (!isDown) {
      const maxScroll = el.scrollWidth - el.clientWidth;

      el.scrollLeft += speed * directionRef.current;

      if (el.scrollLeft >= maxScroll) {
        directionRef.current = -1;
      }

      if (el.scrollLeft <= 0) {
        directionRef.current = 1;
      }
    }

    rafId = requestAnimationFrame(autoScroll);
  };

  rafId = requestAnimationFrame(autoScroll);
  return () => cancelAnimationFrame(rafId);
}, [isDown]);



  return (
    <section id="gallery" className="relative w-full bg-black">
  

      {/* Высота блока */}
      <div className="w-full">
       
   

        {/* Лента */}
        <div className="w-full">
          <div
  ref={scrollerRef}
  className="
    no-scrollbar
    flex items-center gap-4
    overflow-x-auto overflow-y-visible
    cursor-none
    select-none
    py-4
  "
  onPointerDown={onPointerDown}
  onPointerUp={onPointerUp}
  onPointerCancel={onPointerUp}

  onPointerEnter={(e) => {
  if (e.pointerType === "mouse") {
    setShowCursor(true);
  }
}}
onPointerLeave={() => {
  setShowCursor(false);
}}
onPointerMove={(e) => {
  if (e.pointerType === "mouse") {
    setCursorPos({
      x: e.clientX,
      y: e.clientY,
    });
  }
}}
>
            {/* отступ слева 50px для первой фотографии */}
            <div className="shrink-0" />

{slides.map((slide) => (
  <GalleryItem key={slide.id} slide={slide} />

))}

          </div>
        </div>
      </div>

      {showCursor && (
  <div
    className="
    font-unbounded
      fixed
      top-0 left-0
      w-24 h-24
      rounded-full
      text-beige
      flex items-center justify-center
      font-unbounded
      text-lg
      pointer-events-none
      z-50
      transition-transform duration-75
    "
    style={{
      transform: `translate(${cursorPos.x - 48}px, ${cursorPos.y - 48}px)`,
    }}
  >
    &lt; Тяни &gt;
  </div>
)}
    </section>
  );
}
