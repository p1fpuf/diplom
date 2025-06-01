// /app/api/login/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET!

export async function POST(req: Request) {
	try {
		const { email, password } = await req.json()

		if (!email || !password) {
			return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
		}

		const user = await prisma.users.findUnique({ where: { email } })

		if (!user) {
			return NextResponse.json(
				{ error: 'Пользователь не найден' },
				{ status: 404 }
			)
		}

		const isPasswordValid = await bcrypt.compare(password, user.password_hash)

		if (!isPasswordValid) {
			return NextResponse.json(
				{ error: 'Неверный email или пароль' },
				{ status: 401 }
			)			
		}

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: '7d',
		})

		const response = NextResponse.json({ message: 'Успешный вход' })
		response.cookies.set('studio_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			path: '/',
			maxAge: 60 * 60 * 24 * 7, // 7 дней
		})	
		return response
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Ошибка при входе' }, { status: 500 })
	}
}
