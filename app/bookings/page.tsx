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
			<h1 className='text-3xl font-bold mb-6 text-[#5a3921]'>Мои записи</h1>

			{bookings.length === 0 ? (
				<div className='bg-[#f8f5f0] rounded-xl p-8 text-center border border-[#e0d5c4]'>
					<p className='text-[#8c6d46]'>У вас пока нет записей</p>
				</div>
			) : (
				<div className='space-y-4'>
					{bookings.map(booking => (
						<div
							key={booking.id}
							className='border border-[#e0d5c4] rounded-xl p-5 bg-[#f8f5f0] hover:shadow-md transition-all'
						>
							<h2 className='text-xl font-semibold text-[#5a3921] mb-2'>
								{booking.services?.title}
							</h2>

							<p className='text-[#8c6d46] mb-1'>
								Дата:{' '}
								{new Date(booking.appointment_time).toLocaleString('ru-RU')}
							</p>

							<p className='text-[#8c6d46]'>
								Статус:{' '}
								{booking.status === 'confirmed'
									? 'подтверждена'
									: booking.status === 'pending'
									? 'ожидает'
									: 'отменена'}
							</p>
						</div>
					))}
				</div>
			)}
		</div>
	)
}