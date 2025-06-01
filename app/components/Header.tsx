'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useUser'

export default function Header() {
	const { user, loading } = useUser()
	const router = useRouter()

	const navLinks = [
		{ path: '/', label: 'Главная' },
		{ path: '/services', label: 'Услуги' },
		{ path: '/gallery', label: 'Галерея' },
		{ path: '/bookings', label: 'Запись' },
		{ path: '#reviews', label: 'Отзывы' },
		{ path: '#contacts', label: 'Контакты' },
	]

	return (
		<header className='bg-[#B0A89F] shadow-md sticky top-0 z-50'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between'>
				<Link
					href='/'
					className='text-2xl md:text-3xl font-[Zing Script] italic text-[#7D5A50] tracking-wide hover:opacity-80 transition-opacity'
				>
					StudioCherkasovoy
				</Link>

				<nav className='hidden md:flex space-x-6 lg:space-x-8 text-[#4A4A4A] text-base lg:text-lg font-[Angst] font-medium'>
					{navLinks.map(link =>
						link.path.startsWith('#') ? (
							<a
								key={link.path}
								href={link.path}
								className='hover:text-[#7D5A50] transition-colors px-2 py-1 rounded-md'
							>
								{link.label}
							</a>
						) : (
							<Link
								key={link.path}
								href={link.path}
								className='hover:text-[#7D5A50] transition-colors px-2 py-1 rounded-md'
							>
								{link.label}
							</Link>
						)
					)}
				</nav>

				<div className='flex items-center gap-4'>
					{!loading && user ? (
						<img
							src={user.avatarUrl || '/avatar.png'}
							alt='Профиль'
							onClick={() => router.push('/dashboard')}
							className='w-10 h-10 rounded-full cursor-pointer border border-gray-300'
						/>
					) : (
						<Link
							href='/login'
							className='hidden md:inline-flex px-4 py-2 rounded-full border border-[#4A4A4A] text-[#4A4A4A] hover:bg-[#7D5A50] hover:text-white transition-colors'
						>
							Войти
						</Link>
					)}
				</div>
			</div>
		</header>
	)
}