'use client'

import { useEffect, useState } from 'react'

type Service = {
	id: number
	title: string
	description?: string
	price?: number
}

export default function ServiceList() {
	const [services, setServices] = useState<Service[]>([])
	const [editing, setEditing] = useState<Service | null>(null)
	const [form, setForm] = useState({ title: '', description: '', price: '' })

	useEffect(() => {
		fetch('/api/admin/services')
			.then(res => res.json())
			.then(data => setServices(data))
	}, [])

	const handleSave = async () => {
		const method = editing ? 'PATCH' : 'POST'
		const url = editing
			? `/api/admin/services/${editing.id}`
			: '/api/admin/services'
		await fetch(url, {
			method,
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: form.title,
				description: form.description,
				price: parseFloat(form.price),
			}),
		})
		setEditing(null)
		setForm({ title: '', description: '', price: '' })
		const updated = await fetch('/api/admin/services').then(res => res.json())
		setServices(updated)
	}

	return (
		<div className='bg-white rounded-xl p-6 max-w-4xl mx-auto'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-2xl font-bold text-[#5a3921]'>
					Управление услугами
				</h2>
				<div className='text-sm text-[#8c6d46]'>
					{services.length}{' '}
					{services.length === 1
						? 'услуга'
						: services.length < 5
						? 'услуги'
						: 'услуг'}
				</div>
			</div>

			{/* Список услуг */}
			<div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-8'>
				{services.map(s => (
					<div
						key={s.id}
						className='border border-[#e0d5c4] bg-[#f8f5f0] rounded-xl p-4 hover:shadow-md transition-all'
					>
						<div className='flex justify-between items-start gap-4'>
							<div className='flex-1 min-w-0'>
								<h3 className='font-bold text-lg text-[#5a3921]'>{s.title}</h3>
								{s.description && (
									<p className='text-[#8c6d46] mt-2 text-sm'>{s.description}</p>
								)}
							</div>
							<div className='font-bold text-[#b89b7a] text-lg whitespace-nowrap'>
								{s.price ? `${s.price} ₽` : 'Бесплатно'}
							</div>
						</div>

						<div className='mt-4 flex justify-end'>
							<button
								onClick={() => {
									setEditing(s)
									setForm({
										title: s.title,
										description: s.description || '',
										price: s.price?.toString() || '',
									})
								}}
								className='px-3 py-1 bg-[#e8d9c5] text-[#5a3921] rounded-lg hover:bg-[#d4c4ad] transition-colors'
							>
								Редактировать
							</button>
						</div>
					</div>
				))}
			</div>

			{/* Форма добавления/редактирования */}
			<div className='bg-[#f8f5f0] rounded-xl p-6 border border-[#e0d5c4]'>
				<h3 className='text-lg font-semibold text-[#5a3921] mb-4'>
					{editing ? 'Редактирование услуги' : 'Добавление новой услуги'}
				</h3>

				<div className='space-y-4'>
					<div>
						<label className='block text-sm font-medium text-[#5a3921] mb-1'>
							Название услуги
						</label>
						<input
							type='text'
							placeholder='Введите название услуги'
							value={form.title}
							onChange={e => setForm({ ...form, title: e.target.value })}
							className='w-full px-4 py-2 border border-[#e0d5c4] bg-white rounded-lg focus:ring-2 focus:ring-[#b89b7a] focus:border-transparent'
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-[#5a3921] mb-1'>
							Описание услуги
						</label>
						<textarea
							placeholder='Добавьте описание услуги'
							value={form.description}
							onChange={e => setForm({ ...form, description: e.target.value })}
							className='w-full px-4 py-2 border border-[#e0d5c4] bg-white rounded-lg focus:ring-2 focus:ring-[#b89b7a] focus:border-transparent'
							rows={3}
						/>
					</div>

					<div>
						<label className='block text-sm font-medium text-[#5a3921] mb-1'>
							Стоимость (₽)
						</label>
						<input
							type='number'
							placeholder='Укажите стоимость'
							value={form.price}
							onChange={e => setForm({ ...form, price: e.target.value })}
							className='w-full px-4 py-2 border border-[#e0d5c4] bg-white rounded-lg focus:ring-2 focus:ring-[#b89b7a] focus:border-transparent'
						/>
					</div>

					<div className='flex gap-3 pt-2'>
						{editing && (
							<button
								onClick={() => {
									setEditing(null)
									setForm({ title: '', description: '', price: '' })
								}}
								className='px-4 py-2 border border-[#e0d5c4] text-[#5a3921] rounded-lg hover:bg-[#e8d9c5]'
							>
								Отменить
							</button>
						)}
						<button
							onClick={handleSave}
							className={`px-4 py-2 rounded-lg transition-colors ${
								editing
									? 'bg-[#b89b7a] hover:bg-[#a58a6a] text-white'
									: 'bg-[#8c6d46] hover:bg-[#7a5d38] text-white'
							}`}
						>
							{editing ? 'Обновить услугу' : 'Добавить услугу'}
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}