// app/api/admin/services/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
	const services = await prisma.services.findMany()
	return NextResponse.json(services)
}

export async function POST(req: Request) {
	const body = await req.json()
	const { title, description, price } = body

	const newService = await prisma.services.create({
		data: {
			title,
			description,
			price,
		},
	})
	return NextResponse.json(newService)
}