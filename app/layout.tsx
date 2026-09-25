import type { Metadata } from "next";
import { Open_Sans, Roboto_Condensed, Unbounded } from "next/font/google";
import CookieBanner from "@/components/CookieBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import YandexMetrika from "@/components/YandexMetrika";
import "./globals.css";

export const metadata: Metadata = {
  verification: {
    yandex: "6c8c71943059e47b",
  },
};

const unbounded = Unbounded({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-unbounded",
});

const robotoCondensed = Roboto_Condensed({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-condensed",
});

const openSans = Open_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body
        className={`${unbounded.variable} ${robotoCondensed.variable} ${openSans.variable}`}
      >
        <YandexMetrika />
        <Header />
        {children}
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
