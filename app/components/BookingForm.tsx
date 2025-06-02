'use client'

import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Props = {
	serviceId: number
}

export default function BookingForm({ serviceId }: Props) {
	const { data: session, status } = useSession()
	const router = useRouter()
	const [datetime, setDatetime] = useState('')

	if (status === 'loading') return null

	if (!session) {
		return (
			<p className='text-red-500'>
				Для записи необходимо{' '}
				<a href='/login' className='underline'>
					войти в аккаунт
				</a>
				.
			</p>
		)
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		const res = await fetch('/api/bookings', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				serviceId,
				datetime,
			}),
		})

		if (res.ok) {
			router.push('/bookings')
		} else {
			alert('Произошла ошибка при записи.')
		}
	}

	return (
		<form onSubmit={handleSubmit} className='space-y-4'>
			<label className='block'>
				Выберите дату и время:
				<input
					type='datetime-local'
					required
					value={datetime}
					onChange={e => setDatetime(e.target.value)}
					className='mt-1 block w-full border p-2 rounded'
				/>
			</label>
			<button
				type='submit'
				className='bg-[#7D5A50] text-white px-4 py-2 rounded hover:bg-[#65453C]'
			>
				Записаться
			</button>
		</form>
	)
}