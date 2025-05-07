// components/Hero.tsx
'use client';

export default function Hero() {
  return (
    <section className="bg-[url('/hero-image.png')] bg-cover bg-center text-white py-40">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight font-[Zing Script]">
          StudioCherkasovoy - это не только про массаж и расслабление тела.
        </h1>
        <p className="text-xl md:text-2xl mb-8 md:mb-12 max-w-3xl mx-auto font-[Angst]">
          Это диалог с вашим внутренним «я» через прикосновения.
        </p>
        <a
          href="#booking"
          className="bg-[#7D5A50] text-white py-3 px-8 rounded-lg text-lg md:text-xl hover:bg-[#6B4A3A] transition"
        >
          Записаться
        </a>
      </div>
    </section>
  );
}
