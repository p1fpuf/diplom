// /app/api/bookings/route.ts
import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getToken } from 'next-auth/jwt'

export async function POST(req: NextRequest) {
	try {
		const token = await getToken({ req })

		if (!token || !token.id) {
			return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
		}

		const body = await req.json()
		const { serviceId, appointmentDate, appointmentTime } = body

		const fullDateTimeStr = `${appointmentDate}T${appointmentTime}`
		const appointment_time = new Date(fullDateTimeStr)

		if (isNaN(appointment_time.getTime())) {
			return NextResponse.json(
				{ error: 'Неверная дата и время' },
				{ status: 400 }
			)
		}

		const booking = await prisma.bookings.create({
			data: {
				user_id: Number(token.id),
				service_id: serviceId,
				appointment_time,
			},
		})

		return NextResponse.json(booking)
	} catch (error) {
		console.error('Ошибка при создании записи:', error)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}