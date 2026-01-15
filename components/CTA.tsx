import Link from "next/link";

export default function CTA() {
  return (
    <section className="w-full bg-[#F0EAE3] py-16">
      <div className="flex flex-col items-center justify-center">
        {/* Заголовок (2 строки) */}
        <h2 className="text-center font-semibold" style={{ fontFamily: 'Unbounded, sans-serif' }}>
          <div className="text-black text-2xl md:text-3xl lg:text-4xl">
            Хотите узнать
          </div>
          <div className="text-black text-2xl md:text-3xl lg:text-4xl">
            свободную дату?
          </div>
        </h2>

        {/* Подзаголовок */}
        <p className="text-center text-black/60 text-md md:text-lg lg:text-xl mt-2 mb-4">
          Расскажите подробнее о вашем мероприятии
        </p>

        {/* Кнопка */}
        <Link href="/questionnaire">
          <button className="btn bg-accent text-light px-8 py-4 rounded-xl hover:bg-black">
            Заполнить анкету
          </button>
        </Link>
      </div>
    </section>
  );
}
