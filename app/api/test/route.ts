// app/api/test/route.ts
import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
	const users = await prisma.users.findMany()
	return NextResponse.json(users)
}
