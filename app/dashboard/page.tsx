'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { User, Booking } from '../types'

export default function DashboardPage() {
	const [user, setUser] = useState<User | null>(null)
	const [bookings, setBookings] = useState<Booking[]>([])
	const router = useRouter()

	useEffect(() => {
		const fetchData = async () => {
			const res = await fetch('/api/user', {
				method: 'GET',
				credentials: 'include',
			})

			if (res.ok) {
				const data = await res.json()
				setUser(data.user)
				setBookings(data.bookings)
			} else {
				router.push('/login')
			}
		}

		fetchData()
	}, [router])

	const handleLogout = () => {
		signOut({ callbackUrl: '/login' })
	}

	if (!user)
		return (
			<div className='flex justify-center items-center min-h-screen'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		)

	return (
		<div className='min-h-screen bg-[#C8BFB5] py-8 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8'>
				<header className='mb-8'>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6'>
						<h1 className='text-3xl font-bold text-gray-900 mb-4 sm:mb-0'>
							👋 Добро пожаловать, {user.name}!
						</h1>
						<div className='bg-blue-100 text-blue-800 px-4 py-2 rounded-full inline-flex items-center'>
							✉️ {user.email}
						</div>
					</div>
				</header>

				<section className='mb-8'>
					<h2 className='text-xl font-semibold text-gray-800 mb-4 flex items-center'>
						📖 История записей
					</h2>

					{bookings.length > 0 ? (
						<ul className='space-y-3'>
							{bookings.map(booking => (
								<li
									key={booking.id}
									className='bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors'
								>
									<div className='flex justify-between items-center'>
										<span className='font-medium text-gray-700'>
											{booking.serviceName}
										</span>
										<span className='text-sm text-gray-500'>
											{new Date(booking.date).toLocaleDateString('ru-RU', {
												day: 'numeric',
												month: 'long',
												year: 'numeric',
												hour: '2-digit',
												minute: '2-digit',
											})}
										</span>
									</div>
								</li>
							))}
						</ul>
					) : (
						<div className='text-center py-12 bg-gray-50 rounded-xl'>
							<div className='mb-4 text-gray-400'>📅</div>
							<p className='text-gray-500'>Пока здесь ничего нет</p>
						</div>
					)}
				</section>

				<button
					onClick={handleLogout}
					className='w-full sm:w-auto flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-red-50 hover:bg-red-100 transition-colors duration-200'
				>
					← Выйти из аккаунта
				</button>
			</div>
		</div>
	)
}