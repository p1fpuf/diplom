'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function RegisterPage() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [name, setName] = useState('')
	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault()
	
		try {
			const res = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					email,
					password,
				}),
			})
	
			const data = await res.json()
	
			if (!res.ok) {
				alert(data.error || 'Произошла ошибка при регистрации')
				return
			}
	
			alert('Регистрация прошла успешно')
			window.location.href = '/login'
		} catch (error) {
			console.error(error)
			alert('Произошла ошибка при подключении к серверу')
		}
	}
	

	return (
		<div className='min-h-screen flex items-center justify-center bg-[#C8BFB5] p-4'>
			<form
				onSubmit={handleRegister}
				className='bg-white p-6 rounded-2xl shadow-lg w-full max-w-md'
			>
				<h2 className='text-2xl font-semibold mb-4'>Регистрация</h2>

				<input
					type='text'
					placeholder='Имя'
					value={name}
					onChange={e => setName(e.target.value)}
					required
					className='w-full mb-4 p-2 border rounded'
				/>

				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
					className='w-full mb-4 p-2 border rounded'
				/>

				<input
					type='password'
					placeholder='Пароль'
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
					className='w-full mb-4 p-2 border rounded'
				/>

				<button
					type='submit'
					className='w-full bg-[#4A4A4A] text-white py-2 rounded hover:bg-black transition'
				>
					Зарегистрироваться
				</button>

				<p className='text-center text-sm mt-4'>
					Уже есть аккаунт?{' '}
					<Link href='/login' className='text-blue-600 underline'>
						Войти
					</Link>
				</p>
			</form>
		</div>
	)
}