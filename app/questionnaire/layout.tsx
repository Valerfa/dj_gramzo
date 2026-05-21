import YandexMetrika from "@/components/YandexMetrika";
import "../globals.css";

export default function QuestionnaireLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <YandexMetrika />
        {children}
      </body>
    </html>
  );
}