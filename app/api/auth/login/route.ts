// /app/api/login/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key' // лучше хранить в .env

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
			return NextResponse.json({ error: 'Неверный пароль' }, { status: 401 })
		}

		const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
			expiresIn: '7d',
		})

		const response = NextResponse.json({ message: 'Успешный вход' })
		response.cookies.set('token', token, { httpOnly: true, path: '/' })

		return response
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Ошибка при входе' }, { status: 500 })
	}
}
