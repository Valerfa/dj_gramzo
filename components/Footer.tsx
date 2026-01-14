export default function Footer() {
  return (
    <footer className="w-full bg-black py-16">
      <div className="flex flex-col items-center text-center">
        {/* Заголовок */}
        <h3 className="text-white text-xl md:text-2xl lg:text-4xl font-bold mb-6" style={{ fontFamily: 'Unbounded, sans-serif' }}>
          Связаться со мной:
        </h3>

        {/* Контактная информация */}
        <div className="flex flex-col items-center space-y-1 mb-6">
          <a 
            href="tel:+79203669096" 
            className="text-white/90 hover:text-white transition-colors text-lg md:text-xl"
          >
            +7 (920) 366-90-96
          </a>
          <a 
            href="mailto:gramzo33rus@gmail.com" 
            className="text-white/90 hover:text-white transition-colors text-lg md:text-xl"
          >
            gramzo33rus@gmail.com
          </a>
        </div>

        {/* Социальные иконки */}
        <div className="flex items-center space-x-6">
          <a 
            href="https://www.instagram.com/dj.gramzo"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-all duration-200 hover:scale-110"
            title="Перейти в Instagram"
          >
            <img 
              src="/icons/instagram.svg" 
              alt="Instagram"
              className="w-10 h-10 md:w-7 md:h-7"
              
            />
          </a>

          <a 
            href="https://t.me/djgramzo"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-all duration-200 hover:scale-110"
            title="Перейти в Telegram"
          >
            <img 
              src="/icons/telegram.svg" 
              alt="Telegram"
              className="w-10 h-10 md:w-7 md:h-7"
              />
          </a>

          <a 
            href="https://vk.ru/djgramzo"
            target="_blank"
            rel="noopener noreferrer"
            className="transform transition-all duration-200 hover:scale-110"
            title="Перейти на страницу ВК"
          >
            <img 
              src="/icons/vk.svg" 
              alt="VK"
              className="w-10 h-10 md:w-7 md:h-7"
              />
          </a>
        </div>
      </div>
    </footer>
  );
}