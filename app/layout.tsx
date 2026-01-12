import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main className="page">{children}</main>
        <Footer />
      </body>
    </html>
  );
}