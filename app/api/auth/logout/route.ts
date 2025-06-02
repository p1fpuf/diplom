// app/api/logout/route.ts
import { NextResponse } from 'next/server'

export async function POST() {
	// Никаких cookies удалять вручную не нужно, NextAuth сам управляет токенами
	return NextResponse.json(
		{ message: 'Выход инициирован. Используйте signOut() на клиенте.' },
		{ status: 200 }
	)
}