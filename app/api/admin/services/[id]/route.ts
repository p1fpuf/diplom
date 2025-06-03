// app/api/admin/services/[id]/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const body = await req.json()
	const { title, description, price } = body

	const updated = await prisma.services.update({
		where: { id: Number(params.id) },
		data: {
			title,
			description,
			price,
		},
	})

	return NextResponse.json(updated)
}