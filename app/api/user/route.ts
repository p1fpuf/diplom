// app/api/user/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET!

export async function GET() {
	try {
		const cookieStore = cookies()
		const token = (await (cookieStore)).get('studio_token')?.value

		if (!token) {
			return NextResponse.json({ error: 'Нет токена' }, { status: 401 })
		}

		const decoded = jwt.verify(token, JWT_SECRET) as { userId: number }

		const user = await prisma.users.findUnique({
			where: { id: decoded.userId },
			include: {
				bookings: {
					include: {
						services: true, // если у бронирования есть услуга
					},
				},
			},
		})

		if (!user) {
			return NextResponse.json(
				{ error: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		return NextResponse.json({ user, bookings: user.bookings })
	} catch (err) {
		console.error(err)
		return NextResponse.json({ error: 'Ошибка авторизации' }, { status: 500 })
	}
}