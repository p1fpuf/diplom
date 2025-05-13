import { prisma } from '@/lib/prisma'
import Link from 'next/link'

export default async function ServicesPage() {
	const services = await prisma.services.findMany({
		orderBy: { created_at: 'desc' },
	})

	const grouped = services.reduce<Record<string, typeof services>>(
		(acc, service) => {
			const key = service.category ?? 'Другое'
			if (!acc[key]) acc[key] = []
			acc[key].push(service)
			return acc
		},
		{}
	)

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

								<Link
									href={`/booking?service=${service.id}`}
									className='inline-block bg-[#7D5A50] text-white px-4 py-2 rounded-lg hover:bg-[#63453d] transition'
								>
									Записаться
								</Link>
							</div>
						))}
					</div>
				</section>
			))}
		</main>
	)
}