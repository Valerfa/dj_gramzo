"use client";

export default function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="navLinks">
          <li><a href="#about">Обо мне</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#contacts">Контакты</a></li>
        </ul>

        <a className="phone" href="tel:+79203669096">
          +7 (920) 366-90-96
        </a>
      </nav>
    </header>
  );
}