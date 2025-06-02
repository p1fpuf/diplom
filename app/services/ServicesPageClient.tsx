'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'

export default function ServicesPage({ services }: { services: any[] }) {
	const [selectedService, setSelectedService] = useState<any | null>(null)
	const [appointmentTime, setAppointmentTime] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [successMessage, setSuccessMessage] = useState('')

	const grouped = services.reduce<Record<string, typeof services>>(
		(acc, service) => {
			const key = service.category ?? 'Другое'
			if (!acc[key]) acc[key] = []
			acc[key].push(service)
			return acc
		},
		{}
	)

	const handleBooking = async () => {
		if (!selectedService || !appointmentTime) return
		setIsSubmitting(true)

		const [datePart, timePart] = appointmentTime.split('T')

		try {
			const res = await fetch('/api/bookings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					serviceId: selectedService.id,
					appointmentDate: datePart,
					appointmentTime: timePart,
				}),
			})

			if (!res.ok) throw new Error('Ошибка при записи')

			setSuccessMessage('✅ Запись успешно оформлена!')
			setSelectedService(null)
			setAppointmentTime('')
		} catch (err) {
			console.error('Ошибка:', err)
			alert('Ошибка при оформлении записи. Пожалуйста, авторизуйтесь.')
		} finally {
			setIsSubmitting(false)
		}
	}	

	return (
		<main className='max-w-6xl mx-auto px-4 py-12 space-y-12'>
			<h1 className='text-4xl font-bold text-center text-[#7D5A50] mb-6'>
				Наши услуги
			</h1>

			{Object.entries(grouped).map(([category, group]) => (
				<section key={category}>
					<h2 className='text-2xl font-semibold text-[#4A4A4A] mb-4'>
						{category}
					</h2>
					<div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
						{group.map(service => (
							<div
								key={service.id}
								className='bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition'
							>
								{service.image_url && (
									<img
										src={service.image_url}
										alt={service.title}
										className='w-full h-40 object-cover rounded-lg mb-4'
									/>
								)}
								<h3 className='text-lg font-bold text-[#4A4A4A]'>
									{service.title}
								</h3>
								<p className='text-sm text-gray-700 mb-2'>
									{service.description}
								</p>
								<p className='text-[#7D5A50] font-bold mb-4'>
									{service.price?.toString()} ₽
								</p>
								{service.duration_minutes && (
									<p className='text-[#7D5A50] font-bold mb-4'>
										Длительность: {service.duration_minutes} минут
									</p>
								)}

								<button
									onClick={() => setSelectedService(service)}
									className='inline-block bg-[#7D5A50] text-white px-4 py-2 rounded-lg hover:bg-[#63453d] transition'
								>
									Записаться
								</button>
							</div>
						))}
					</div>
				</section>
			))}

			{/* Модалка формы */}
			{selectedService && (
				<div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
					<div className='bg-white p-6 rounded-2xl max-w-md w-full shadow-lg relative'>
						<h2 className='text-xl font-bold mb-4'>
							Запись на: {selectedService.title}
						</h2>

						<label className='block mb-4'>
							<span className='text-gray-700'>Дата и время</span>
							<input
								type='datetime-local'
								value={appointmentTime}
								onChange={e => setAppointmentTime(e.target.value)}
								className='mt-1 block w-full border-gray-300 rounded-xl shadow-sm'
							/>
						</label>

						<div className='flex justify-end gap-3'>
							<button
								className='px-4 py-2 bg-gray-300 rounded-xl'
								onClick={() => {
									setSelectedService(null)
									setAppointmentTime('')
								}}
							>
								Отмена
							</button>
							<button
								className='px-4 py-2 bg-[#7D5A50] text-white rounded-xl'
								onClick={handleBooking}
								disabled={isSubmitting}
							>
								{isSubmitting ? 'Запись...' : 'Оформить запись'}
							</button>
						</div>
					</div>
				</div>
			)}

			{successMessage && (
				<div className='fixed bottom-6 right-6 bg-emerald-500 text-white px-4 py-2 rounded-xl shadow-lg'>
					{successMessage}
				</div>
			)}
		</main>
	)
}