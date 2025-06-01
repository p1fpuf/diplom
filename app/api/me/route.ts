// /app/api/me/route.ts
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function GET() {
	// ✂️ Никакого await — cookies() возвращает объект синхронно
	const cookieStore = await cookies()
	const token = cookieStore.get('studio_token')?.value

	if (!token) {
		// Если куки нет, возвращаем null, но 200 OK
		return NextResponse.json({ user: null }, { status: 200 })
	}

	try {
		// Проверяем подпись JWT
		const user = jwt.verify(token, process.env.JWT_SECRET!)
		return NextResponse.json({ user })
	} catch {
		// Если подпись не совпала, возвращаем 401
		return NextResponse.json({ user: null }, { status: 401 })
	}
}
