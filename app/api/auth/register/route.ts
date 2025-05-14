import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcrypt'

export async function POST(req: Request) {
	try {
		const { name, email, password } = await req.json()

		if (!name || !email || !password) {
			return NextResponse.json({ error: 'Заполните все поля' }, { status: 400 })
		}

		// Проверка на существующего пользователя
		const existingUser = await prisma.users.findUnique({ where: { email } })

		if (existingUser) {
			return NextResponse.json(
				{ error: 'Пользователь с таким email уже существует' },
				{ status: 409 }
			)
		}

		// Хэширование пароля
		const hashedPassword = await bcrypt.hash(password, 10)

		// Создание пользователя
		const user = await prisma.users.create({
			data: {
				name,
				email,
				password_hash: hashedPassword,
			},
		})

		return NextResponse.json({ message: 'Пользователь зарегистрирован', user })
	} catch (error) {
		console.error(error)
		return NextResponse.json(
			{ error: 'Ошибка при регистрации' },
			{ status: 500 }
		)
	}
}
