import Image from "next/image";

export default function Hero() {
  return (
    <section className="hero">
      {/* desktop */}
      <Image
        className="hero-bg hero-bg-desktop"
        src="/images/hero-desktop.jpg"
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
        src="/images/hero-mobile.jpg"
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />

      <div className="hero-content">
        <p className="hero-subtitle">Больше, чем Event-DJ</p>
        <p className="title-first-name">Константин </p>
        <h1 className="title-second-name">
          ГРАМЗО
        </h1>

        <div className="hero-actions">
          <button className="btn btn-outline">Связаться</button>
          <button className="btn btn-filled">Смотреть промо-видео</button>
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
  );
}