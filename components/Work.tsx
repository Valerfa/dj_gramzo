export default function Benefits() {
  const items = [
    {
      n: "1",
      title: "Хороший звук",
      text:
        "Рекомендую и подбираю необходимый комплект оборудования конкретно под вашу локацию. У меня в наличии есть все для технического оснащения.",
    },
    {
      n: "2",
      title: "Плей-лист",
      text:
        "Я составлю плей-лист на основе ваших пожеланий и в соответствии с контекстом мероприятия. Отдельно обсудим композиции для “стоп-листа”.",
    },
    {
      n: "3",
      title: "Пунктуальность",
      text:
        "Я всегда приезжаю во время и за 30 минут до сбора гостей, у нас будет играть музыка и работать все оборудование.",
    },
    {
      n: "4",
      title: "Оборудование",
      text:
        "У меня есть всё необходимое оборудование для озвучивания вашего праздника. Качественный звук, свет и отличное настроение гарантированы!",
    },
  ];

  return (
    <section className="w-full bg-beige py-16">
      <div className="mx-2 md:mx-12">
        <h2 className="title-standart text-center">// Как я работаю </h2>
        <p className="text-sm md:text-xl opacity-50 text-center uppercase mb-6 lg:mb-12">Что вы получаете, выбирая меня диджеем на мероприятие</p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {items.map((it) => (
            <div
              key={it.n}
              className="rounded-[28px] bg-[#E9E2D9] p-4 md:p-8 min-h-[200px] lg:min-h-[260px] flex flex-col"
            >
              {/* top row */}
              <div className="flex items-center gap-4">
                <div className="h-6 w-6 lg:h-10 lg:w-10 rounded-full bg-[#1B1D22] text-[#F3EDE6] flex items-center justify-center text-xs md:text-sm lg:text-lg">
                  {it.n}
                </div>
                <div className="text-xl md:text-2xl lg:text-3xl leading-none text-[#1B1D22]">
                  {it.title}
                </div>
              </div>

              {/* text */}
              <p className="mt-auto pt-4 md:pt-10 text-sm md:text-md lg:text-lg opacity-70 leading-[1.45] text-[#6F6A64] max-w-[320px]">
                {it.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}