export default function About() {
  return (
    <section id="about" className="about">
      <div className="mx-2 md:mx-12">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
          <div className="lg:col-span-3">
            <h2 className="title-standart text-left">// Обо мне </h2>
          </div>
          
          <div className="lg:col-span-3 min-w-0">
            <div className="w-full min-w-0">
              <p className="text-xl md:text-2xl lg:text-3xl mb-4 md:mb-8">
                Работаю на событиях разного формата, озвучиваю частные и корпоративные ивенты, бизнес-мероприятия, фестивали и дни города
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
                <div className="stat-number">4 года</div>
                <div className="text-sm md:text-lg">работаю в Event-сфере</div>
              </div>

                <div className="stat-item">
                <div className="stat-number">300+</div>
                <div className="text-sm md:text-lg">мероприятий озвучено</div>
              </div>
              </div>
              </div>

              </div>
            </div>
            
            <div className="about-stats">
              
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}