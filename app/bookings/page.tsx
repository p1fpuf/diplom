'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@/hooks/useUser'
import { format } from 'date-fns'

interface Booking {
	id: string
	date: string
	status: string
	service: {
		name: string
	}
}

export default function UserBookingsPage() {
	const { user } = useUser()
	const [bookings, setBookings] = useState<Booking[]>([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchBookings = async () => {
			const res = await fetch('/api/bookings')
			const data = await res.json()
			setBookings(data.bookings ?? []) // ✅ гарантируем массив, даже если data.bookings undefined
			setLoading(false)
		}
		fetchBookings()
	}, [])
	
	const getStatusStyle = (status: string) => {
		switch (status.toLowerCase()) {
			case 'confirmed':
				return 'bg-emerald-100 text-emerald-800'
			case 'pending':
				return 'bg-amber-100 text-amber-800'
			case 'canceled':
				return 'bg-rose-100 text-rose-800'
			default:
				return 'bg-gray-100 text-gray-800'
		}
	}

	if (!user)
		return (
			<div className='min-h-screen flex items-center justify-center bg-[#C8BFB5]'>
				<p className='text-lg text-gray-800 font-medium px-4 py-3 bg-white/90 rounded-xl backdrop-blur-sm'>
					🔒 Пожалуйста, войдите в систему
				</p>
			</div>
		)

	return (
		<div className='min-h-screen bg-[#C8BFB5] py-12 px-4 sm:px-6 lg:px-8'>
			<div className='max-w-3xl mx-auto'>
				<div className='mb-10 text-center'>
					<h1 className='text-4xl font-bold text-gray-800 mb-3 flex items-center justify-center gap-3'>
						<span className='bg-white/20 p-3 rounded-2xl backdrop-blur-sm border border-white/30'>
							📅
						</span>
						<span className='bg-white/90 px-6 py-3 rounded-xl backdrop-blur-sm shadow-sm'>
							Мои записи
						</span>
					</h1>
					<p className='text-gray-700 mt-2'>
						История ваших бронирований и запланированных услуг
					</p>
				</div>

				{loading ? (
					<div className='space-y-6 animate-pulse'>
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className='h-24 bg-white/50 rounded-xl shadow-sm border border-white/30 backdrop-blur-sm'
							/>
						))}
					</div>
				) : bookings.length === 0 ? (
					<div className='text-center py-16 bg-white/80 rounded-2xl shadow-sm border border-white/30 backdrop-blur-sm'>
						<div className='mb-6 text-6xl text-gray-600'>📭</div>
						<h3 className='text-2xl font-semibold text-gray-800 mb-2'>
							Нет активных записей
						</h3>
						<p className='text-gray-700'>
							Начните с выбора услуги в нашем каталоге
						</p>
					</div>
				) : (
					<ul className='space-y-6'>
						{bookings.map(booking => (
							<li
								key={booking.id}
								className='bg-white/80 rounded-xl shadow-sm hover:shadow-md transition-all 
                duration-300 border border-white/30 backdrop-blur-sm p-6'
							>
								<div className='flex flex-col sm:flex-row justify-between gap-6'>
									<div className='space-y-2'>
										<div className='flex items-center gap-4'>
											<span className='bg-white p-3 rounded-xl text-gray-700 shadow-sm'>
												⏰
											</span>
											<div>
												<h3 className='text-xl font-semibold text-gray-800'>
													{booking.service.name}
												</h3>
												<p className='text-gray-700 mt-1'>
													{format(
														new Date(booking.date),
														'dd MMMM yyyy в HH:mm'
													)}
												</p>
											</div>
										</div>
									</div>

									<div className='sm:text-right flex-shrink-0'>
										<span
											className={`${getStatusStyle(
												booking.status
											)} px-4 py-2 rounded-full 
                      text-sm font-medium inline-flex items-center gap-2 backdrop-blur-sm 
                      border border-white/30`}
										>
											{booking.status === 'confirmed' && '✅ Подтверждено'}
											{booking.status === 'pending' && '⏳ Ожидание'}
											{booking.status === 'canceled' && '❌ Отменено'}
										</span>
									</div>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	)
}