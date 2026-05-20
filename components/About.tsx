import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="mx-2 md:mx-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="lg:col-span-3">
            <h2 className="title-standart text-left">// Обо мне </h2>

            <a
              href="/presentation.pdf"
              download
              className="
                mt-4 md:mt-6 inline-flex items-center gap-3
                rounded-2xl border border-black/10
                bg-white/60 hover:bg-white
                px-4 py-3
                text-sm md:text-base
                text-[#1B1D22]
                transition-colors
              "
              title="Скачать презентацию"
              aria-label="Скачать презентацию в PDF"
            >
              <Image
                src="/icons/pdf.svg"
                alt=""
                width={36}
                height={36}
                className="block"
              />
              <span className="flex flex-col leading-tight">
                <span className="font-medium">Скачать презентацию</span>
                <span className="text-xs opacity-60">PDF</span>
              </span>
            </a>
          </div>

          <div className="lg:col-span-3 min-w-0">
            <div className="w-full min-w-0">
              <p className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8">
                Работаю на событиях разного формата, озвучиваю частные и корпоративные ивенты, бизнес-мероприятия для ведущих компаний и брендов России, фестивали, конференции и дни города. Собственный парк светового и музыкального оборудования
              </p>

              <div className="w-full">
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <p className="text-sm md:text-md lg:text-lg opacity-50">
                      Работаю сольно, а также в паре с ведущим. Органично моменту шучу музыкой, добавляю лирики или драйва. Всегда на 100% включаюсь в программу вечера.
                    </p>
                    <p className="text-sm md:text-md lg:text-lg opacity-50">
                      Слежу за мыслью ведущего и гостей, подхватываю подходящей музыкой: красиво оформляю интерактивы и поздравления.
                    </p>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-2">
                    <div className="stat-item">
                      <div className="stat-number">более 5 лет</div>
                      <div className="text-sm md:text-lg">работаю в Event-сфере</div>
                    </div>

                    <div className="stat-item">
                      <div className="stat-number">350+</div>
                      <div className="text-sm md:text-lg">мероприятий озвучено</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-stats"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
