import Image from "next/image";
import Link from "next/link";

const TELEGRAM_URL = "https://t.me/djgramzo";

export default function CTA() {
  return (
    <section className="w-full bg-[#F0EAE3] py-16">
      <div className="flex flex-col items-center justify-center px-4 text-center">
        <h2
          className="text-black text-2xl md:text-3xl lg:text-4xl font-semibold"
          style={{ fontFamily: "Unbounded, sans-serif" }}
        >
          Хотите обсудить дату?
        </h2>

        <p className="text-black/60 text-md md:text-lg lg:text-xl mt-2 mb-4">
          Обсудим нюансы и пришлем документы
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 mb-6">
          <Link href="/questionnaire" className="w-full md:w-auto">
            <button className="btn bg-accent text-light px-8 py-4 rounded-xl hover:bg-black w-full md:w-auto">
              Заполнить анкету
            </button>
          </Link>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Написать в Telegram"
            className="inline-flex items-center gap-2 text-black hover:text-[var(--color-accent)] transition-colors"
            title="Написать в Telegram"
          >
            <Image
              src="/icons/telegram.svg"
              alt="Telegram"
              width={40}
              height={40}
              className="block"
            />
            <span
              className="text-base md:text-lg font-medium"
              style={{ fontFamily: "Unbounded, sans-serif" }}
            >
              На связи 24/7
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
