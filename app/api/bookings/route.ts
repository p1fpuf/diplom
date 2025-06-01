// app/api/bookings/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user?.id) {
			return NextResponse.json(
				{ message: 'Требуется авторизация' },
				{ status: 401 }
			)
		}

		const userId = parseInt(session.user.id, 10)
		if (isNaN(userId)) {
			return NextResponse.json(
				{ message: 'Неверный ID пользователя' },
				{ status: 400 }
			)
		}

		const bookings = await prisma.bookings.findMany({
			where: { user_id: userId },
			include: { services: true },
			orderBy: { appointment_time: 'desc' },
		})

		return NextResponse.json(bookings)
	} catch (error) {
		console.error('Ошибка при получении бронирований:', error)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}

export async function POST(req: Request) {
	try {
		const session = await getServerSession(authOptions)

		if (!session?.user?.id) {
			return NextResponse.json(
				{ message: 'Требуется авторизация' },
				{ status: 401 }
			)
		}

		const body = await req.json()
		const { serviceId, appointmentTime } = body

		if (!serviceId || !appointmentTime) {
			return NextResponse.json(
				{ message: 'Не указаны обязательные поля' },
				{ status: 400 }
			)
		}

		const appointmentDate = new Date(appointmentTime)
		if (isNaN(appointmentDate.getTime())) {
			return NextResponse.json(
				{ message: 'Неверный формат даты' },
				{ status: 400 }
			)
		}

		const serviceExists = await prisma.services.findUnique({
			where: { id: Number(serviceId) },
		})

		if (!serviceExists) {
			return NextResponse.json(
				{ message: 'Услуга не найдена' },
				{ status: 404 }
			)
		}

		const userId = parseInt(session.user.id, 10)
		if (isNaN(userId)) {
			return NextResponse.json(
				{ message: 'Неверный ID пользователя' },
				{ status: 400 }
			)
		}

		const booking = await prisma.bookings.create({
			data: {
				user_id: userId,
				service_id: Number(serviceId),
				appointment_time: appointmentDate,
				status: 'ожидает',
			},
		})

		return NextResponse.json(booking, { status: 201 })
	} catch (error) {
		console.error('Ошибка при создании бронирования:', error)
		return NextResponse.json(
			{ message: 'Внутренняя ошибка сервера' },
			{ status: 500 }
		)
	}
}