import type { Metadata } from "next";
import { Unbounded, Roboto_Condensed, Open_Sans } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "../globals.css";


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

const OpenSans = Open_Sans({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-open-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${unbounded.variable} ${robotoCondensed.variable} ${OpenSans.variable}`}>
        <Header/>
  {children}
</body>
    </html>
  );
}