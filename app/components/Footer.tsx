'use client'

import { Instagram, Send, Phone, Mail } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import Link from 'next/link'

export default function Footer() {
  return (
		<footer className='bg-[#B0A89F] text-[#4A4A4A] border-t border-[#ffffff33]'>
			<div className='max-w-6xl mx-auto px-6 py-12'>
				<div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
					{/* Логотип и адрес */}
					<div className='space-y-4'>
						<h3 className='text-xl font-serif text-[#7D5A50] mb-2'>
							StudioCherkasovoy
						</h3>
						<div className='flex items-start gap-3'>
							<div>
								<p className='font-medium'>Адрес студии</p>
								<p className='text-sm'>
									Улица Татищева, 100А
									<br />
									Екатеринбург
								</p>
							</div>
						</div>
					</div>

					{/* Навигация */}
					<div className='space-y-4'>
						<h4 className='text-lg font-medium text-[#7D5A50]'>Навигация</h4>
						<nav>
							<ul className='space-y-2'>
								{[
									['Услуги', '#services'],
									['Галерея', '#gallery'],
									['Отзывы', '#reviews'],
									['Контакты', '#contacts'],
								].map(([title, url]) => (
									<li key={title}>
										<Link
											href={url}
											className='text-sm hover:text-[#7D5A50] transition-colors flex items-center gap-2'
										>
											<span className='w-1 h-1 bg-[#7D5A50] rounded-full opacity-0 group-hover:opacity-100 transition-opacity' />
											{title}
										</Link>
									</li>
								))}
							</ul>
						</nav>
					</div>

					{/* Контакты */}
					<div className='space-y-4'>
						<h4 className='text-lg font-medium text-[#7D5A50]'>Контакты</h4>
						<div className='space-y-3'>
							<div className='flex items-center gap-3'>
								<Phone className='w-5 h-5' />
								<a
									href='tel:+79991234567'
									className='text-sm hover:text-[#7D5A50] transition-colors'
								>
									+7 903 086 3599
								</a>
							</div>
							<div className='flex items-center gap-3'>
								<Mail className='w-5 h-5' />
								<a
									href='mailto:Dod-1977@yandex.ru'
									className='text-sm hover:text-[#7D5A50] transition-colors'
								>
									Dod-1977@yandex.ru
								</a>
							</div>
						</div>
					</div>

					{/* Соцсети */}
					<div className='space-y-4'>
						<h4 className='text-lg font-medium text-[#7D5A50]'>
							Мы в соцсетях
						</h4>
						<div className='flex gap-4'>
							{[
								{
									icon: Instagram,
									url: 'https://www.instagram.com/studiocherkasovoy?igsh=aGw4YWpweWV1ZWo2',
								},
								{ icon: Send, url: 'https://t.me' },
								{ icon: FaWhatsapp, url: 'https://wa.me' },
							].map(({ icon: Icon, url }) => (
								<a
									key={url}
									href={url}
									target='_blank'
									rel='noopener noreferrer'
									className='p-2 bg-[#ffffff33] rounded-full hover:bg-[#ffffff4d] transition-colors'
									aria-label='Социальная сеть'
								>
									<Icon className='w-5 h-5' />
								</a>
							))}
						</div>
					</div>
				</div>

				{/* Копирайт */}
				<div className='pt-6 border-t border-[#ffffff33] text-center text-sm text-[#7D5A50]'>
					© 2025 StudioCherkasovoy. Все права защищены
				</div>
			</div>
		</footer>
	)
}