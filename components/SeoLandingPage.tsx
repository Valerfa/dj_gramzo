import Image from "next/image";
import Link from "next/link";
import CTA from "@/components/CTA";
import type {
  SeoContentBlock,
  SeoLanding,
  SeoLandingSection,
} from "@/lib/seoLandingData";
import styles from "./SeoLandingPage.module.css";

const IMAGE_ROOT = "/extra_page";
const SECTION_IMAGES = [
  `${IMAGE_ROOT}/photo-7.jpeg`,
  `${IMAGE_ROOT}/6TFL2GaPpFlghRYsczN08tSy2MIG2Gl4_5kGfVTGcgtddREpDr0ShQAl1pJ3dw9c0YyKA3XZ4fBaP9VCBTEBQpbk.jpg`,
  `${IMAGE_ROOT}/lnawbwSPFpNEbMi0DLuEzVnt4evRn9_0WioAnkTGv9rD3S-EaOeIacDDNzcUUjdhB3KeRiwuYFLOC3ypP4Qvzhd-.jpg`,
];

function ContentBlocks({ blocks }: { blocks: SeoContentBlock[] }) {
  return (
    <div className={styles.blocks}>
      {blocks.map((block, index) =>
        block.type === "list" ? (
          <ul className={styles.list} key={`list-${index}`}>
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p key={`paragraph-${index}`}>{block.text}</p>
        ),
      )}
    </div>
  );
}

function EditorialSection({
  section,
  index,
}: {
  section: SeoLandingSection;
  index: number;
}) {
  const variant = index % 3;
  const number = String(index + 1).padStart(2, "0");

  if (variant === 0) {
    return (
      <section className={`${styles.section} ${styles.editorialSection}`}>
        <div className={`${styles.container} ${styles.editorialGrid}`}>
          <div className={styles.sectionTitle}>
            <span className={styles.eyebrow}>{number} / GRAMZO</span>
            <h2>{section.heading}</h2>
          </div>
          <ContentBlocks blocks={section.blocks} />
        </div>
      </section>
    );
  }

  const dark = variant === 1;
  const image = SECTION_IMAGES[index % SECTION_IMAGES.length];

  return (
    <section className={`${styles.section} ${dark ? styles.darkSection : styles.lightSection}`}>
      <div className={`${styles.container} ${styles.mediaGrid} ${dark ? "" : styles.mediaReverse}`}>
        <div className={styles.mediaCopy}>
          <span className={styles.eyebrow}>{number} / GRAMZO</span>
          <h2>{section.heading}</h2>
          <ContentBlocks blocks={section.blocks} />
        </div>
        <div className={styles.sectionPhoto}>
          <Image
            src={image}
            alt={`GRAMZO: ${section.heading}`}
            fill
            sizes="(max-width: 900px) 100vw, 42vw"
          />
        </div>
      </div>
    </section>
  );
}

export default function SeoLandingPage({ landing }: { landing: SeoLanding }) {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.heroSpine}>GRAMZO / EVENT DJ / MOSCOW</span>
          <div className={styles.heroText}>
            <p className={styles.heroKicker}>Константин Алексеев</p>
            <h1 className={landing.title.length > 28 ? styles.longTitle : undefined}>
              {landing.title}
            </h1>
            <p className={styles.heroLead}>{landing.description}</p>
            <Link href="/questionnaire" className="btn btn-filled">
              Рассчитать стоимость
            </Link>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src={`${IMAGE_ROOT}/hero-mobile.jpeg`}
            alt={`Диджей GRAMZO: ${landing.title}`}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
          />
        </div>
      </section>

      <section className={`${styles.section} ${styles.introSection}`}>
        <div className={styles.container}>
          <div className={styles.introHeading}>
            <span className={styles.eyebrow}>Музыка для вашего события</span>
            <p>Профессиональная подготовка, живое чувство аудитории и точная работа с программой.</p>
          </div>
          <div className={styles.introCopy}>
            <ContentBlocks blocks={landing.intro} />
          </div>
        </div>
      </section>

      {landing.sections.map((section, index) => (
        <EditorialSection key={section.heading} section={section} index={index} />
      ))}

      <section className={styles.bookingSection}>
        <div className={`${styles.container} ${styles.bookingInner}`}>
          <span className={styles.eyebrow}>Следующий шаг</span>
          <h2>Обсудим формат и закрепим дату</h2>
          <p>
            Заполните короткую анкету: по ответам я подготовлю предложение,
            подберу оборудование и рассчитаю стоимость под вашу площадку.
          </p>
          <Link href="/questionnaire" className="btn bg-light text-black hover:bg-black hover:text-light">
            Заполнить анкету
          </Link>
        </div>
      </section>

      <CTA />
    </main>
  );
}
