// app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST() {
	const cookieStore = await cookies()
	cookieStore.delete('studio_token') // Удаляем токен

	return NextResponse.json({ message: 'Вы вышли из аккаунта' }, { status: 200 })
}
