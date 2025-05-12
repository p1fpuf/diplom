'use client'

import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Instagram,
  Send, // Telegram
  PhoneCall, // WhatsApp (иконка-замена)
} from 'lucide-react'

export default function ContactSection() {
  return (
		<section className='bg-[#FDF7F3] py-16'>
			<div className='max-w-6xl mx-auto px-6'>
				<h2 className='text-3xl md:text-4xl font-serif text-[#7D5A50] text-center mb-10'>
					Контактная информация
				</h2>

				<div className='grid md:grid-cols-2 gap-10 items-center'>
					{/* Карта слева */}
					<div className='rounded-xl overflow-hidden shadow-md'>
						<iframe
							src='https://yandex.ru/map-widget/v1/?ll=60.541905%2C56.837785&z=16&pt=60.541905,56.837785~ul'
							width='100%'
							height='100%'
							style={{ minHeight: '400px', border: 0 }}
							allowFullScreen
							loading='lazy'
							referrerPolicy='no-referrer-when-downgrade'
						/>
					</div>

					{/* Информация справа */}
					<div className='space-y-6 text-[#4A4A4A] text-lg'>
						<div className='flex items-start space-x-4'>
							<MapPin className='text-[#7D5A50]' />
							<div>
								<p className='font-semibold'>Адрес</p>
								<p>г. Екатеринбург, ул. Татищева, 100А</p>
							</div>
						</div>

						<div className='flex items-start space-x-4'>
							<Clock className='text-[#7D5A50]' />
							<div>
								<p className='font-semibold'>Время работы</p>
								<p>Пн–Вс: 09:00 – 21:00</p>
							</div>
						</div>

						<div className='flex items-start space-x-4'>
							<Phone className='text-[#7D5A50]' />
							<div>
								<p className='font-semibold'>Телефон</p>
								<p>+7 903 086 3599</p>
							</div>
						</div>

						<div className='flex items-start space-x-4'>
							<Mail className='text-[#7D5A50]' />
							<div>
								<p className='font-semibold'>Email</p>
								<p>Dod-1977@yandex.ru</p>
							</div>
						</div>

						<div className='flex space-x-6 pt-4'>
							<a
								href='https://www.instagram.com/studiocherkasovoy?igsh=aGw4YWpweWV1ZWo2'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Instagram className='w-6 h-6 text-[#7D5A50] hover:text-[#B0A89F] transition' />
							</a>
							<a
								href='https://t.me/Tanya_che81'
								target='_blank'
								rel='noopener noreferrer'
							>
								<Send className='w-6 h-6 text-[#7D5A50] hover:text-[#B0A89F] transition' />
							</a>
							<a
								href='https://wa.me/79089043053'
								target='_blank'
								rel='noopener noreferrer'
							>
								<PhoneCall className='w-6 h-6 text-[#7D5A50] hover:text-[#B0A89F] transition' />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}