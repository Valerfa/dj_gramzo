"use client";
import { useState } from "react";
import Image from "next/image";
import VideoPopup from "./VideoPopup";
import playIcon from "@/public/icons/play.svg";
import ContactPopup from "./ContactPopup";
export default function Hero() {
  const [contactOpen, setContactOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
    <section className="hero">
      {/* desktop */}
      <Image
        className="hero-bg hero-bg-desktop"
        src="/Images/hero-desktop.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      {/* mobile */}
      <Image
        className="hero-bg hero-bg-mobile"
        src="/Images/hero-mobile.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      <div className="hero-content mx-4 lg:mx-12">
        <p className="hero-subtitle">Больше, чем Event-DJ</p>
        <p className="title-first-name">Константин </p>
        <h1 className="title-second-name">
          ГРАМЗО
        </h1>

        <div className="hero-actions">
          <button 
          className="btn btn-outline"
          onClick={() => setContactOpen(true)}
          type="button">Заказать звонок</button>
          <button
  className="btn btn-filled"
  type="button"
  onClick={() => setVideoOpen(true)}
>
  <img src="/icons/play.svg" alt="" className="icon" />
  Смотреть промо-видео
</button>
</div>
      </div>

      <div className="marquee">
        <div className="marquee-content">
          <span>Озвучка частных и корпоративных мероприятий</span>
          <span>Озвучка частных и корпоративных мероприятий</span>
          <span>Озвучка частных и корпоративных мероприятий</span>
          <span>Озвучка частных и корпоративных мероприятий</span>
          <span>Озвучка частных и корпоративных мероприятий</span>
          <span>Озвучка частных и корпоративных мероприятий</span>
          <span>Озвучка частных и корпоративных мероприятий</span>
        </div>
      </div>
      
    </section>
<ContactPopup open={contactOpen} onClose={() => setContactOpen(false)} />
    <VideoPopup
  open={videoOpen}
  onClose={() => setVideoOpen(false)}
  url="https://vk.com/clip_ext.php?oid=133332239&id=456239465&autoplay=1"
/>
</>
  );
}