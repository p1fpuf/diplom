import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const category = searchParams.get('category')
	const minPrice = searchParams.get('minPrice')
	const maxPrice = searchParams.get('maxPrice')
	const maxDuration = searchParams.get('maxDuration')

	const filters: any = {}

	if (category) {
		filters.category = category
	}

	if (minPrice || maxPrice) {
		filters.price = {}
		if (minPrice) filters.price.gte = parseFloat(minPrice)
		if (maxPrice) filters.price.lte = parseFloat(maxPrice)
	}

	if (maxDuration) {
		filters.duration_minutes = {
			lte: parseInt(maxDuration),
		}
	}

	const services = await prisma.services.findMany({
		where: filters,
		orderBy: {
			category: 'asc',
		},
	})

	return NextResponse.json(services)
}