export default function CTA() {
  return (
    <section className="w-full bg-[#F0EAE3] py-16">
      <div className="flex flex-col items-center justify-center">
        {/* Заголовок (2 строки) */}
        <h2 className="text-center font-semibold" style={{ fontFamily: 'Unbounded, sans-serif' }}>
          <div className="text-black text-2xl md:text-3xl lg:text-4xl">
            хотите узнать
          </div>
          <div className="text-black text-2xl md:text-3xl lg:text-4xl">
            свободную дату?
          </div>
        </h2>

        {/* Подзаголовок */}
        <p className="text-center text-black/60 text-lg md:text-xl lg:text-2xl mt-4">
          Расскажите подробнее о вашем мероприятии
        </p>

        {/* Кнопка */}
        <button className="bg-black text-white px-8 py-4 rounded-full text-lg md:text-xl lg:text-2xl font-medium transition-all duration-200 hover:scale-105 hover:bg-black/90">
          Заполнить анкету
        </button>
      </div>
    </section>
  );
}
