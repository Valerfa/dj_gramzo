import Image from "next/image";
import Link from "next/link";

const ORGANIZER_DOCS = [
  { href: "/djgramzo_портфолио.pdf", title: "Портфолио" },
  { href: "/djgramzo_технический_райдер.pdf", title: "Технический райдер" },
  { href: "/djgramzo_оборудование.pdf", title: "Комплекты оборудования" },
  { href: "/djgramzo_dj_setup.pdf", title: "DJ Setup" },
];

const footerVideoDesktop = "/videos/video-desktop.mp4";
const footerVideoMobile = "/videos/video-mobile.mp4";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-black">
      {/* Фоновое видео — desktop */}
      <video
        src={footerVideoDesktop}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none hidden md:block"
      />

      {/* Фоновое видео — mobile */}
      <video
        src={footerVideoMobile}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none block md:hidden"
      />

      {/* Лёгкое затемнение поверх видео для читаемости текста */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/30 via-black/40 to-black/80"
      />

      {/* Основной контент футера */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="mx-4 md:mx-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-4">
            {/* Контакты и соцсети — левая колонка */}
            <div className="lg:col-span-3 flex flex-col items-start text-left">
              <h3
                className="text-light text-xl md:text-2xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Связаться со мной:
              </h3>

              <div className="flex flex-col items-start space-y-1 mb-6">
                <a
                  href="tel:+79203669096"
                  className="text-light/90 hover:text-light transition-colors text-lg md:text-xl"
                >
                  +7 (920) 366-90-96
                </a>
                <a
                  href="mailto:gramzo33rus@gmail.com"
                  className="text-light/90 hover:text-light transition-colors text-lg md:text-xl"
                >
                  gramzo33rus@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-6">
                <a
                  href="https://www.instagram.com/dj.gramzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-200 hover:scale-110"
                  title="Перейти в Instagram"
                >
                  <img
                    src="/icons/instagram.svg"
                    alt="Instagram"
                    className="w-10 h-10 md:w-7 md:h-7"
                  />
                </a>

                <a
                  href="https://t.me/djgramzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-200 hover:scale-110"
                  title="Перейти в Telegram"
                >
                  <img
                    src="/icons/telegram.svg"
                    alt="Telegram"
                    className="w-10 h-10 md:w-7 md:h-7"
                  />
                </a>

                <a
                  href="https://vk.ru/djgramzo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-200 hover:scale-110"
                  title="Перейти на страницу ВК"
                >
                  <img
                    src="/icons/vk.svg"
                    alt="VK"
                    className="w-10 h-10 md:w-7 md:h-7"
                  />
                </a>

                <a
                  href="https://max.ru/u/f9LHodD0cOI50J_6W7Qn3gk0z1t8bR3Bh6tWeAuVO5xLz52vbgrjTOkKzvU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform transition-all duration-200 hover:scale-110"
                  title="Написать в MAX"
                  aria-label="Открыть чат в MAX"
                >
                  <img
                    src="/icons/max.svg"
                    alt="MAX"
                    className="w-10 h-10 md:w-7 md:h-7"
                  />
                </a>
              </div>
            </div>

            {/* Для организаторов — правая колонка */}
            <nav
              aria-label="Для организаторов"
              className="lg:col-span-3 min-w-0 flex flex-col items-start text-left"
            >
              <h3
                className="text-light text-xl md:text-2xl lg:text-4xl font-bold mb-6"
                style={{ fontFamily: "Unbounded, sans-serif" }}
              >
                Для организаторов
              </h3>

              <ul className="flex flex-col space-y-2">
                {ORGANIZER_DOCS.map((doc) => (
                  <li key={doc.href}>
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      title={`Скачать «${doc.title}» в PDF`}
                      aria-label={`Скачать «${doc.title}» в PDF`}
                      className="inline-flex items-center gap-3 text-light/90 hover:text-light transition-colors"
                    >
                      <Image
                        src="/icons/pdf.svg"
                        alt=""
                        width={22}
                        height={22}
                        className="block shrink-0"
                      />
                      <span className="flex flex-col leading-tight">
                        <span className="font-medium text-lg md:text-xl">
                          {doc.title}
                        </span>
                        <span className="text-xs opacity-60">PDF</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Нижняя затемнённая полоса с юридической информацией */}
      <div className="relative z-10 bg-black/70 backdrop-blur-sm border-t border-light/40">
        <div className="min-h-24 flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-4 py-4">
          <div className="flex flex-col gap-2">
            <p className="text-light/60 text-xs">
              © 2026 Индивидуальный предприниматель Алексеев Константин Юрьевич
            </p>
            <p className="text-light/60 text-xs">ИНН: 332710259344</p>
            <p className="text-light/60 text-xs">ОГРНИП: 325330000063900</p>
          </div>

          <Link
            className="text-light/60 text-xs hover:text-light/90 underline underline-offset-2 cursor-pointer"
            href="/privacy"
          >
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
