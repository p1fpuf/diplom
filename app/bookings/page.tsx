import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'

export default async function BookingsPage() {
	const session = await getServerSession(authOptions)

	if (!session) return redirect('/login')

	const bookings = await prisma.bookings.findMany({
		where: { user_id: Number(session.user.id) },
		include: { services: true },
		orderBy: { appointment_time: 'desc' },
	})

	return (
		<div className='max-w-4xl mx-auto py-8 px-4'>
			<h1 className='text-3xl font-bold mb-6'>Мои записи</h1>
			{bookings.length === 0 ? (
				<p>У вас пока нет записей.</p>
			) : (
				<ul className='space-y-4'>
					{bookings.map(booking => (
						<li
							key={booking.id}
							className='border rounded-lg p-4 shadow-sm bg-white'
						>
							<h2 className='text-xl font-semibold'>
								{booking.services?.title}
							</h2>
							<p>
								Дата:{' '}
								{new Date(booking.appointment_time).toLocaleString('ru-RU')}
							</p>
							<p>Статус: {booking.status}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	)
}