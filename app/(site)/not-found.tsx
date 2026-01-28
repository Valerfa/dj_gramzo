"use client";

import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-2">
      <h1 className="text-4xl font-medium mb-2">404</h1>

      <p className="mb-4 text-base opacity-80">
        Упс! Страница не найдена
      </p>

      <button
        onClick={() => router.back()}
        className="
          w-full max-w-md
          h-[54px]
          text-sm lg:text-lg font-medium
          rounded-xl
          bg-accent text-light
          hover:bg-black
          transition
          mx-[10px]
          lg:w-auto lg:px-12
        "
      >
        Вернуться назад
      </button>
    </main>
  );
}