import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getUserFromToken } from '@/lib/auth'

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	const user = await getUserFromToken(req)
	if (!user || !user.isAdmin) {
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	const { status } = await req.json()

	if (!['pending', 'confirmed', 'completed'].includes(status)) {
		return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
	}

	const booking = await prisma.bookings.update({
		where: { id: Number(params.id) },
		data: { status },
	})

	return NextResponse.json(booking)
}