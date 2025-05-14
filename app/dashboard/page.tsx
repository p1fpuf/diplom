'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User, Booking } from '../types'

export default function DashboardPage() {
	// ✅ Указываем типы явно
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
	}, [])

	const handleLogout = async () => {
		await fetch('/api/logout', {
			method: 'POST',
			credentials: 'include',
		})
		router.push('/login')
	}

	if (!user) return <div>Загрузка...</div>

	return (
		<div className='p-6 max-w-3xl mx-auto'>
			<h1 className='text-2xl font-bold mb-4'>
				Добро пожаловать, {user.name}!
			</h1>

			<div className='mb-6'>
				<p>Email: {user.email}</p>
				{/* Добавь другие поля, если нужно */}
			</div>

			<h2 className='text-xl font-semibold mb-2'>История записей</h2>
			{bookings.length > 0 ? (
				<ul className='space-y-2'>
					{bookings.map((booking) => (
						<li key={booking.id} className='border p-2 rounded'>
							{booking.serviceName} – {new Date(booking.date).toLocaleString()}
						</li>
					))}
				</ul>
			) : (
				<p>Записей пока нет.</p>
			)}

			<button
				onClick={handleLogout}
				className='mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition'
			>
				Выйти
			</button>
		</div>
	)
}
