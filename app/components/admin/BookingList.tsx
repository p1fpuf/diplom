// components/admin/BookingList.tsx
'use client'

import { useState, useEffect } from 'react'
import type { Booking, BookingStatus } from '@/app/types' // путь замени на актуальный

export default function BookingList() {
	const [bookings, setBookings] = useState<Booking[]>([])

	useEffect(() => {
		const fetchBookings = async () => {
			try {
				const res = await fetch('/api/admin/bookings', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`, // временное решение
					},
				})
				const data = await res.json()

				if (Array.isArray(data)) {
					setBookings(data)
				} else {
					console.error('Ошибка: ожидался массив, а пришло:', data)
					setBookings([])
				}
			} catch (err) {
				console.error('Ошибка при загрузке данных:', err)
				setBookings([])
			}
		}

		fetchBookings()
	}, [])
  
  const updateStatus = async (id: number, status: BookingStatus) => {
		await fetch(`/api/admin/bookings/${id}`, {
			method: 'PATCH',
			body: JSON.stringify({ status }),
			headers: { 'Content-Type': 'application/json' },
		})
		setBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)))
	}  

	return (
		<div>
			{bookings.map(booking => (
				<div key={booking.id} className='border p-2 rounded my-2'>
					<div>Клиент: {booking.user?.name}</div>
					<div>Услуга: {booking.services?.title}</div>
					<div>Дата: {new Date(booking.appointment_time).toLocaleString()}</div>
					<div>
						Статус: {booking.status}
						<select
							value={booking.status}
							onChange={e =>
								updateStatus(booking.id, e.target.value as BookingStatus)
							} // 👈 явно указать тип
							className='ml-2 border px-2'
						>
							<option value='ожидает'>В ожидании</option>
							<option value='подтверждено'>Подтверждено</option>
							<option value='отклонено'>Отклонено</option>
							<option value='завершено'>Завершено</option>
						</select>
					</div>
				</div>
			))}
		</div>
	)
}