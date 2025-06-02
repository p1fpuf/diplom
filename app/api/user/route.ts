// app/api/user/route.ts
import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { prisma } from '@/lib/prisma'
import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

		if (!token || !token.id) {
			return NextResponse.json({ error: 'Нет токена' }, { status: 401 })
		}

		const user = await prisma.users.findUnique({
			where: { id: Number(token.id) },
			include: {
				bookings: {
					include: { services: true },
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