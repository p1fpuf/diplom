'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)

	const searchParams = useSearchParams()
	const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault()
		setError('')
		setLoading(true)

		try {
			const res = await signIn('credentials', {
				email,
				password,
				redirect: true,
				callbackUrl: callbackUrl,
			})

			// ❗ Этот блок НЕ нужен, т.к. редирект произойдёт автоматически
		} catch (err) {
			setError('Ошибка входа. Попробуйте позже.')
			console.error('Login error:', err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#C8BFB5] p-4'>
			<form
				onSubmit={handleLogin}
				className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-md'
			>
				<h2 className='text-2xl font-semibold mb-4'>Вход</h2>

				{error && <p className='text-red-600 mb-4 text-sm'>{error}</p>}

				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					className='w-full mb-4 p-2 border rounded'
					disabled={loading}
				/>

				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					className='w-full mb-4 p-2 border rounded'
					disabled={loading}
				/>

				<button
					type='submit'
					className='w-full bg-[#4A4A4A] text-white py-2 rounded hover:bg-black transition disabled:opacity-50'
					disabled={loading}
				>
					{loading ? 'Вход...' : 'Войти'}
				</button>

				<p className='text-center text-sm mt-4'>
					Нет аккаунта?{' '}
					<Link href='/register' className='text-blue-600 underline'>
						Зарегистрироваться
					</Link>
				</p>
			</form>
		</div>
	)
}