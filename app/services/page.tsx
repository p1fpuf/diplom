import { prisma } from '@/lib/prisma'
import ServicesPage from './ServicesPageClient'

export default async function Page() {
	const servicesRaw = await prisma.services.findMany({
		orderBy: { created_at: 'desc' },
	})

	// Преобразуем Decimal в обычные числа
	const services = servicesRaw.map(service => ({
		...service,
		price: service.price?.toNumber() ?? null,
	}))

	return <ServicesPage services={services} />
}