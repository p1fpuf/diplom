import { prisma } from '@/lib/prisma'
import BookingForm from '@/app/bookings/bookingForm'
import { notFound } from 'next/navigation'

type Props = {
	params: {
		id: string
	}
}

export default async function ServicePage({ params }: Props) {
	const serviceId = Number(params.id)

	if (isNaN(serviceId)) return notFound()

	const service = await prisma.services.findUnique({
		where: { id: serviceId },
	})

	if (!service) return notFound()

	return (
		<div className='max-w-3xl mx-auto px-4 py-8'>
			<h1 className='text-3xl font-bold mb-4'>{service.title}</h1>

			{service.image_url && (
				<img
					src={service.image_url}
					alt={service.title}
					className='w-full h-64 object-cover rounded-lg mb-4'
				/>
			)}

			{service.description && (
				<p className='mb-4 text-gray-700'>{service.description}</p>
			)}

			<div className='mb-6'>
				<p className='text-lg font-semibold'>
					Цена: {service.price?.toString()} ₽
				</p>
				<p className='text-sm text-gray-600'>
					Продолжительность: {service.duration_minutes} мин.
				</p>
			</div>

			<hr className='my-6' />

			<h2 className='text-2xl font-semibold mb-4'>Записаться на услугу</h2>

			<BookingForm serviceId={service.id} />
		</div>
	)
}