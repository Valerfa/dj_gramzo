import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="about">
        <h2>Обо мне</h2>
      </section>

      <section id="reviews">
        <h2>Отзывы</h2>
      </section>

      <section id="contacts">
        <h2>Контакты</h2>
      </section>
    </>
  );
}