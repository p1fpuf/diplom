"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    name: "Анастасия",
    text: "Потрясающий массаж! Ощущения непередаваемые, как будто заново родилась.",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    name: "Олег",
    text: "Очень профессионально. Теперь хожу регулярно и чувствую себя прекрасно.",
    avatar: "/avatars/avatar2.jpg",
  },
  {
    name: "Мария",
    text: "Атмосфера, мастерство и забота. Всё на высшем уровне.",
    avatar: "/avatars/avatar3.jpg",
  },
];

export default function Reviews() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const nextReview = () => {
    setDirection("right");
    setCurrent((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setDirection("left");
    setCurrent((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextReview, 5000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: string) => ({
      x: direction === "right" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: string) => ({
      x: direction === "right" ? -100 : 100,
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-20 bg-[#FDF7F3]">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-[#7D5A50] mb-10">
          Отзывы наших клиентов
        </h2>

        <div className="relative h-64">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center backdrop-blur-md"
            >
              <img
                src={reviews[current].avatar}
                alt={reviews[current].name}
                className="w-16 h-16 rounded-full mb-4"
              />
              <p className="text-[#4A4A4A] italic mb-2">
                "{reviews[current].text}"
              </p>
              <p className="text-[#7D5A50] font-semibold">
                — {reviews[current].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-4">
          <button
            onClick={prevReview}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Предыдущий отзыв"
          >
            <svg
              className="w-6 h-6 text-[#7D5A50]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  idx === current ? "bg-[#7D5A50]" : "bg-gray-300"
                }`}
                aria-label={`Перейти к отзыву ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextReview}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Следующий отзыв"
          >
            <svg
              className="w-6 h-6 text-[#7D5A50]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}