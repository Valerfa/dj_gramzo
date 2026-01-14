import Image from "next/image";

type Review = {
  id: string;
  text: string;
  author?: string;
  side?: "left" | "right";
};

const reviews: Review[] = [
  {
    id: "r1",
    text: `Костя! Привет! Все довольны — это главное! Мне кажется, когда все из одной сферы, то мы любим отдыхать))) Мне все понравилось))) Были пару треков (из старого фонда), которые не все знали, но мы скучаем по неформальным мероприятиям и все равно танцуем)))) Поэтому, ты — молодец! Красавчик! Выдержал нас) Эти «вечера» 🤣🤣🤣 Мой поклон, обнимашки и благодарность ❤️`,
    author: "Светлана, новогодний корпоратив",
    side: "left",
  },
  {
    id: "r2",
    text: `Константин — не только замечательный диджей, чувствующий аудиторию (возраст, приоритеты, настроение) и соответственно умеющий вовлечь и зажечь ☝️, но и хороший надежный Человек, разруливший сложную ситуацию так что все остались довольны. Спасибо!`,
    author: "Алексей, день рождения",
    side: "left",
  },
  {
    id: "r3",
    text: `Константин, спасибо большое за качественную работу! Мы очень довольны музыкальным сопровождением нашей свадьбы, придраться не к чему! Учёл все пожелания, добавил своего профессионального взгляда. Супер 🤗`,
    author: "Мария",
    side: "left",
  },
];

function ReviewBubble({
  text,
  author,
  side = "left",
}: {
  text: string;
  author?: string;
  side?: "left" | "right";
}) {
  const isRight = side === "right";

  return (
    <div className={`flex w-1/2 ${isRight ? "justify-end" : "justify-start"}`}>
      <div
        className={[
          "relative",
          "max-w-[620px]",
          "rounded-2xl",
          "px-6 py-5",
          "bg-[#BF6651] text-white",
          "shadow-sm",
        ].join(" ")}
      >
        <p className="text-xs md:text-md leading-relaxed whitespace-pre-line">{text}</p>

        {author && (
          <div className="mt-3 text-[10px] opacity-70">{author}</div>
        )}

        {/* хвостик */}
        <span
          className={[
            "absolute bottom-4 h-3 w-3 rotate-45",
            "bg-[#BF6651]",
            isRight ? "-right-1" : "-left-1",
          ].join(" ")}
        />
      </div>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="w-full">

      {/* если ты убираешь глобальные боковые отступы — задаём их внутри блока */}
      <div className="w-full px-2 md:px-8 lg:px-12 py-4 lg:py-20 flex flex-col">
        <div className="flex flex-col">
          <h2 className="title-standart text-center">
            // Отзывы 
          </h2>
          <p className="text-sm md:text-xl opacity-50 uppercase text-center mb-6 lg:mb-12">Живые впечатления людей, с которыми мы уже сделали праздник</p>
        </div>

        <div className="flex flex-col gap-2">
          {reviews.map((r) => (
            <ReviewBubble
              key={r.id}
              text={r.text}
              author={r.author}
              side={r.side}
            />
          ))}
        </div>
      </div>
    </section>
  );
}