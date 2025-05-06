'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function Header() {
	return (
		<header className='bg-[#B0A89F] shadow-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
				{/* Логотип / название */}
				<Link href='/' className='flex items-center space-x-2'>
					<Image src='/logo.png' alt='Логотип' width={40} height={40} />
					<span className='text-3xl font-serif italic text-[#7D5A50] tracking-wide'>
						StudioCherkasovoy
					</span>
				</Link>

				{/* Навигация */}
				<nav className='hidden md:flex space-x-8 text-[#4A4A4A] text-lg font-medium'>
					<Link href='/'>Главная</Link>
					<Link href='/services'>Услуги</Link>
					<Link href='/gallery'>Галерея</Link>
					<Link href='/booking'>Запись</Link>
					<Link href='/reviews'>Отзывы</Link>
					<Link href='/contacts'>Контакты</Link>
				</nav>

				{/* Кнопка входа */}
				<Link
					href='/login'
					className='ml-4 px-4 py-2 rounded-full border border-[#4A4A4A] text-[#4A4A4A] hover:bg-[#4A4A4A] hover:text-white transition'
				>
					Войти
				</Link>
			</div>
		</header>
	)
}
