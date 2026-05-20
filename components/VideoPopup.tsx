"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  url: string;
};

function getEmbedUrl(url: string) {
  if (url === "https://www.yandex.ru/video/preview/10096687132335653077") {
    return "https://vk.com/video_ext.php?autoplay=1&hash=320d157dfea60aa6&id=456239465&loop=0&oid=133332239";
  }

  return url;
}

export default function VideoPopup({ open, onClose, url }: Props) {
  const embedUrl = getEmbedUrl(url);

  // Закрытие по Esc + блокируем скролл фона
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

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Overlay */}
      <button
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-black/70"
      />

      {/* Modal */}
      <div className="relative z-[1001]
    w-full h-full
    md:w-[min(980px,92vw)] md:h-auto
    flex items-center justify-center">

{/* Close button */}
<button
  onClick={onClose}
  aria-label="Закрыть видео"
  className="
    absolute top-4 right-4 z-[1100]
    flex items-center justify-center
    w-10 h-10
    rounded-lg
    bg-light/50
    
text-[var(--color-dark)]
    hover:bg-[var(--color-accent)]
    hover:text-white
    transition
  "
>
  ✕
</button>
        <div
  className="
    relative
    w-full h-full
    md:aspect-video md:h-auto
    bg-black
    md:rounded-2xl
    overflow-hidden
    shadow-2xl">
    <iframe
            src={embedUrl}
            title="Промо-видео"
            className="absolute inset-0 h-full w-full"
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            frameBorder="0"
          />
        </div>

       
      </div>
    </div>
  );
}