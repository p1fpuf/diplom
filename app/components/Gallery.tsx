'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const images = [
  '/gallery/1.png',
  '/gallery/2.png',
  '/gallery/3.png',
  '/gallery/4.png',
  '/gallery/5.png',
  '/gallery/6.png',
  '/gallery/7.png',
  '/gallery/8.png',
  '/gallery/9.png',
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="py-20 bg-[#FFF9F6]">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-serif text-[#7D5A50] text-center mb-10">
          Галерея
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="cursor-pointer hover:scale-105 transition-transform duration-300"
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={`Галерея ${idx + 1}`}
                width={300}
                height={200}
                className="rounded-xl object-cover w-full h-full"
              />
            </div>
          ))}
        </div>

        {/* Модальное окно */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-3xl w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 bg-white text-[#4A4A4A] rounded-full p-2 shadow-md hover:scale-110 transition"
              >
                <X size={24} />
              </button>
              <Image
                src={selectedImage}
                alt="Просмотр изображения"
                width={1200}
                height={800}
                className="rounded-xl w-full h-auto object-contain shadow-lg transition-transform duration-300"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
