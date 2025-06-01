'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'

const services = [
	{ title: 'Массаж спины', image: '/images/service1.png' },
	{ title: 'Общий массаж всего тела', image: '/images/service2.png' },
	{ title: 'Шейно-воротниковая зона', image: '/images/service3.png' },
	{ title: 'Расслабляющий всего тела', image: '/images/service4.png' },
]

export default function Services() {
	const [sliderRef] = useKeenSlider({
		loop: true,
		slides: { perView: 1, spacing: 15 },
		breakpoints: {
			'(min-width: 768px)': {
				slides: { perView: 2, spacing: 20 },
			},
			'(min-width: 1024px)': {
				slides: { perView: 3, spacing: 25 },
			},
		},
	})

	return (
		<section className='py-20 bg-[#C8BFB5]'>
			<div className='max-w-6xl mx-auto px-6'>
				<h2 className='text-3xl md:text-4xl font-serif text-[#7D5A50] text-center mb-10'>
					Наши услуги
				</h2>
				<div ref={sliderRef} className='keen-slider'>
					{services.map((service, index) => (
						<div
							key={index}
							className='keen-slider__slide bg-white rounded-2xl shadow-md overflow-hidden flex flex-col'
						>
							<img
								src={service.image}
								alt={service.title}
								className='w-full h-64 object-cover'
							/>
							<div className='p-4 text-center text-[#4A4A4A] text-lg flex flex-col justify-between flex-1'>
								<div className='mb-4'>{service.title}</div>
								<Link href='/services' className='mt-auto'>
									<button className='w-full px-4 py-2 bg-[#7D5A50] text-white rounded hover:bg-[#5c4139] transition-all'>
										Записаться
									</button>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	)
}