'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'react-feather'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinks = [
    { path: '/', label: 'Главная' },
    { path: '/services', label: 'Услуги' },
    { path: '/gallery', label: 'Галерея' },
    { path: '/booking', label: 'Запись' },
    { path: '/reviews', label: 'Отзывы' },
    { path: '/contacts', label: 'Контакты' },
  ]

  return (
    <header className="bg-[#B0A89F] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Логотип */}
        <Link 
          href="/" 
          className="text-2xl md:text-3xl font-[Zing Script] italic text-[#7D5A50] tracking-wide hover:opacity-80 transition-opacity"
          aria-label="На главную"
        >
          StudioCherkasovoy
        </Link>

        {/* Десктоп навигация */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8 text-[#4A4A4A] text-base lg:text-lg font-[Angst] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="hover:text-[#7D5A50] transition-colors px-2 py-1 rounded-md"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Мобильное меню */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-[#4A4A4A] hover:bg-[#ffffff33] rounded-full transition-colors"
            aria-label="Открыть меню"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Кнопка входа */}
        <Link
          href="/login"
          className="hidden md:inline-flex ml-4 px-4 py-2 rounded-full border border-[#4A4A4A] text-[#4A4A4A] hover:bg-[#4A4A4A] hover:text-white transition-colors duration-200"
          aria-label="Войти в аккаунт"
        >
          Войти
        </Link>

        {/* Мобильное меню (оверлей) */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 right-0 bg-[#B0A89F] shadow-lg"
            >
              <div className="px-6 py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    href={link.path}
                    className="block py-3 text-[#4A4A4A] hover:text-[#7D5A50] border-b border-[#ffffff33] last:border-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="mt-4 inline-block px-4 py-2 rounded-full border border-[#4A4A4A] text-[#4A4A4A] hover:bg-[#4A4A4A] hover:text-white transition-colors"
                >
                  Войти
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}