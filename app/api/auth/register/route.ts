import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { prisma } from '@/lib/prisma' // Подключение Prisma

export async function POST(req: NextRequest) {
	try {
		const { name, email, phone, password } = await req.json()

		// Проверка обязательных полей
		if (!name || !email || !password) {
			return NextResponse.json(
				{ error: 'Необходимо заполнить все обязательные поля' },
				{ status: 400 }
			)
		}

		// Проверка на существующий email
		const existingUser = await prisma.users.findUnique({ where: { email } })

		if (existingUser) {
			return NextResponse.json(
				{ error: 'Пользователь с таким email уже существует' },
				{ status: 400 }
			)
		}

		// Хеширование пароля
		const hashedPassword = await bcrypt.hash(password, 10)

		// Создание пользователя
		const user = await prisma.users.create({
			data: {
				name,
				email,
				phone,
				password_hash: hashedPassword,
			},
		})

		return NextResponse.json({
			message: 'Регистрация прошла успешно',
			user: { id: user.id, email: user.email },
		})
	} catch (error) {
		console.error(error)
		return NextResponse.json({ error: 'Ошибка сервера' }, { status: 500 })
	}
}