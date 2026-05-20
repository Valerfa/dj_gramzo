import Image from "next/image";

const LOGOS = [
  { src: "/icons/danone.svg",          alt: "Danone" },
  { src: "/icons/adm-vlad-obl.svg",    alt: "Администрация Владимирской области" },
  { src: "/icons/adm-suzd-rn.svg",     alt: "Администрация Суздальского района" },
  { src: "/icons/veresk.svg",          alt: "Вереск" },
  { src: "/icons/vtb.svg",             alt: "ВТБ" },
  { src: "/icons/globus.svg",          alt: "Глобус" },
  { src: "/icons/amax.svg",            alt: "AMAKS Hotels & Resorts" },
  { src: "/icons/divanru.svg",         alt: "divan.ru" },
  { src: "/icons/tartuforestoran.svg", alt: "Tartu Foresto Ran" },
  { src: "/icons/barvikha.svg",        alt: "Барвиха Luxury Village" },
];

export default function Clients() {
  return (
    <section className="w-full bg-beige py-12 md:py-16">
      <div className="mx-2 md:mx-12">
        <h2 className="title-standart text-center mb-18 md:mb-10">
          // Работаю с
        </h2>
      </div>

      {/* Бегущая строка из логотипов в стилистике hero-маркизы */}
      <div className="clients-marquee" aria-label="Партнёры и клиенты">
        <div className="clients-marquee__track clients-marquee__track--logos">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={`${logo.src}-${i}`}
              className="clients-marquee__logo"
              title={logo.alt}
              aria-hidden={i >= LOGOS.length || undefined}
            >
              <Image
                src={logo.src}
                alt={i < LOGOS.length ? logo.alt : ""}
                width={240}
                height={96}
                className="h-10 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-2 md:mx-12 mt-8 md:mt-12">
        <p className="max-w-4xl mx-auto text-center text-xl md:text-2xl lg:text-3xl text-[#1B1D22]">
          Работаю на событиях, где присутствуют первые лица и бизнес-элита страны. Организовываю DJ-озвучку на встречах в закрытом формате, про которые не говорят. Знаю формулу, как сделать музыку на Вашем мероприятии, чтобы она понравилась всем.
        </p>
      </div>
    </section>
  );
}
