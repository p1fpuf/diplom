import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth' // путь к твоим authOptions
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
	const session = await getServerSession(authOptions)

	console.log('Session:', session)

	if (!session || !session.user?.isAdmin) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), {
			status: 401,
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}

	const bookings = await prisma.bookings.findMany({
		include: {
			services: true,
			users: { select: { name: true, email: true } }, // ✅ правильно
		},
		orderBy: { appointment_time: 'desc' },
	})	