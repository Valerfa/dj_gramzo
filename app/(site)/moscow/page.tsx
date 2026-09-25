import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import styles from "./page.module.css";

const IMAGE_ROOT = "/extra_page";

const eventTypes = [
  "Свадьбы",
  "Корпоративы",
  "Юбилеи",
  "Дни рождения",
  "Выпускные",
  "Презентации",
  "Выставки",
  "Бизнес-мероприятия",
  "Частные вечеринки",
];

const advantages = [
  ["опыт", "Большой опыт работы на мероприятиях различного масштаба"],
  [
    "музыка",
    "Современный музыкальный материал — от мировых хитов до актуальных новинок",
  ],
  ["публика", "Профессиональная работа с залом и танцполом"],
  ["формат", "Возможность выступления совместно с ведущим"],
  ["надёжность", "Пунктуальность и ответственность"],
  ["сценарий", "Гибкий подход к музыкальной программе мероприятия"],
];

const priceFactors = [
  "Продолжительность мероприятия",
  "Дата проведения",
  "Количество гостей",
  "Удалённость площадки",
  "Дополнительное оборудование",
  "Особенности программы",
];

export const metadata: Metadata = {
  title: "GRAMZO — диджей на мероприятие в Москве",
  description:
    "Профессиональный event DJ GRAMZO в Москве: свадьбы, корпоративы, дни рождения, презентации и вечеринки. Индивидуальный подбор музыки и расчёт стоимости.",
  keywords: [
    "диджей на мероприятие в Москве",
    "заказать диджея на мероприятие в Москве",
    "event DJ в Москве",
    "стоимость диджея на мероприятие",
  ],
  alternates: {
    canonical: "/moscow",
  },
};

function SectionHeading({
  eyebrow,
  children,
  light = false,
}: {
  eyebrow: string;
  children: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div className={styles.sectionHeading}>
      <span className={styles.eyebrow}>{eyebrow}</span>
      <h2 className={light ? styles.lightHeading : undefined}>{children}</h2>
    </div>
  );
}

export default function MoscowPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.heroSpine}>GRAMZO / EVENT DJ / MOSCOW</span>
          <div className={styles.heroText}>
            <p className={styles.heroKicker}>Константин Алексеев</p>
            <h1>Диджей на мероприятие в Москве</h1>
            <p className={styles.heroLead}>
              Музыка задаёт настроение любого события и превращает обычный
              вечер в праздник, который гости будут долго вспоминать. Свадьба,
              корпоратив, день рождения, презентация или деловое событие —
              GRAMZO создаёт атмосферу драйва.
            </p>
            <Link href="/questionnaire" className="btn btn-filled">
              Рассчитать стоимость
            </Link>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={`${IMAGE_ROOT}/hero-mobile.jpeg`}
            alt="Диджей GRAMZO с диджейским пультом"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>
      </section>

      <section className={styles.section} id="about">
        <div className={styles.container}>
          <SectionHeading eyebrow="О диджее">
            Тот, кто чувствует публику
          </SectionHeading>
          <div className={styles.editorial}>
            <p className={styles.leadParagraph}>
              Константин Алексеев (GRAMZO) — опытный event DJ в Москве. Он
              работает на частных вечеринках, корпоративных событиях,
              презентациях, свадьбах и клубных площадках.
            </p>
            <div>
              <p>
                Умение чувствовать публику, быстро менять музыкальный сценарий
                и поддерживать высокий уровень энергии делает каждое
                мероприятие особенным.
              </p>
              <blockquote className={styles.quote}>
                Опытный диджей не просто включает популярные треки — он
                управляет настроением гостей и создаёт нужную динамику вечера.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.darkSection}`} id="mood">
        <div className={styles.container}>
          <div className={styles.moodGrid}>
            <div className={styles.moodCopy}>
              <SectionHeading eyebrow="Атмосфера" light>
                Музыка, которая работает на настроение
              </SectionHeading>
              <p>
                GRAMZO подбирает музыкальное сопровождение индивидуально под
                каждое мероприятие. До начала события с клиентом обсуждаются:
              </p>
              <ul className={styles.factorList}>
                <li>формат и концепция</li>
                <li>возраст гостей</li>
                <li>музыкальные предпочтения</li>
                <li>желаемая атмосфера</li>
                <li>особенности площадки</li>
              </ul>
              <p className={styles.mutedLight}>
                В результате плейлист становится не случайным набором песен, а
                частью общей режиссуры мероприятия.
              </p>
            </div>
            <div className={styles.portraitPhoto}>
              <Image
                src={`${IMAGE_ROOT}/photo-7.jpeg`}
                alt="GRAMZO играет на мероприятии"
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.advantagesGrid}>
            <div className={styles.advantagesPhoto}>
              <Image
                src={`${IMAGE_ROOT}/6TFL2GaPpFlghRYsczN08tSy2MIG2Gl4_5kGfVTGcgtddREpDr0ShQAl1pJ3dw9c0YyKA3XZ4fBaP9VCBTEBQpbk.jpg`}
                alt="GRAMZO за диджейским пультом"
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
            <div className={styles.advantagesCopy}>
              <SectionHeading eyebrow="Почему GRAMZO">
                Музыкальное сопровождение, которому доверяют
              </SectionHeading>
              <ul className={styles.advantagesList}>
                {advantages.map(([label, text]) => (
                  <li key={label}>
                    <span>{label}</span>
                    <p>{text}</p>
                  </li>
                ))}
              </ul>
              <p className={styles.sectionTail}>
                Во время работы GRAMZO постоянно следит за реакцией гостей и
                мгновенно адаптирует музыкальную программу — вечер проходит
                естественно, без затянутых пауз.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.section} ${styles.eventsSection}`}>
        <div className={styles.container}>
          <div className={styles.eventsGrid}>
            <div className={styles.sectionIntro}>
              <SectionHeading eyebrow="Форматы">
                На какие мероприятия стоит пригласить DJ
              </SectionHeading>
              <p className={styles.sectionTail}>
                Для каждого события подбирается концепция звучания — от лёгкого
                lounge во время welcome-зоны до энергичного танцевального сета
                в финале вечера.
              </p>
            </div>
            <div className={styles.eventTypes}>
              {eventTypes.map((event, index) => (
                <div className={styles.eventType} key={event}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {event}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.equipmentSection}>
        <Image
          src={`${IMAGE_ROOT}/lnawbwSPFpNEbMi0DLuEzVnt4evRn9_0WioAnkTGv9rD3S-EaOeIacDDNzcUUjdhB3KeRiwuYFLOC3ypP4Qvzhd-.jpg`}
          alt="GRAMZO за работой на мероприятии"
          fill
          sizes="100vw"
        />
        <div className={styles.equipmentOverlay} />
        <div className={styles.equipmentCopy}>
          <span className={styles.eyebrow}>Звук и техника</span>
          <h2>Современное оборудование и качественный звук</h2>
          <p>
            Профессиональное оборудование обеспечивает чистый звук,
            стабильную работу техники и комфортную громкость — от уютного
            ресторана до большого банкетного зала.
          </p>
        </div>
      </section>

      <section className={styles.section} id="pricing">
        <div className={styles.container}>
          <div className={styles.pricingGrid}>
            <div className={styles.pricingCopy}>
              <SectionHeading eyebrow="Стоимость">
                Сколько стоит выступление
              </SectionHeading>
              <ol className={styles.priceFactors}>
                {priceFactors.map((factor, index) => (
                  <li key={factor}>
                    <span>{factor}</span>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className={styles.pricePanel}>
              <span className={styles.eyebrow}>Индивидуальный расчёт</span>
              <h3>Цена рассчитывается после обсуждения деталей</h3>
              <p>
                Заполните анкету, чтобы узнать точную стоимость диджея на
                мероприятие в Москве — без переплаты за ненужные услуги.
              </p>
              <Link href="/questionnaire" className="btn bg-accent text-light hover:bg-light hover:text-black">
                Заполнить анкету
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.bookingSection}>
        <div className={styles.bookingInner}>
          <h2>Бронируйте заранее</h2>
          <p>
            Популярные даты — свадьбы летом, новогодние корпоративы, выпускные
            и праздничные выходные — бронируются за несколько месяцев вперёд.
            Так можно спокойно обсудить программу и гарантированно закрепить
            нужную дату.
          </p>
        </div>
      </section>

      <CTA />
    </main>
  );
}
