// app/api/me/route.ts
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
	try {
		const session = await getServerSession(authOptions)

		if (!session || !session.user) {
			return NextResponse.json({ user: null }, { status: 200 })
		}

		return NextResponse.json({ user: session.user }, { status: 200 })
	} catch (error) {
		console.error('Ошибка получения сессии:', error)
		return NextResponse.json({ user: null }, { status: 500 })
	}
}