// app/components/About.tsx

export default function About() {
	return (
		<section className="py-20 bg-white">
			<div className="max-w-6xl mx-auto px-6">
				<h2 className="text-3xl md:text-4xl font-serif text-[#7D5A50] text-center mb-10">
					Почему выбирают нас
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center text-[#4A4A4A]">
					<div>
						<img src="/icons/massage.svg" alt="Профессионализм" className="mx-auto h-16 mb-4" />
						<h3 className="text-xl font-semibold mb-2">Профессионализм</h3>
						<p>Опытные мастера с медицинским образованием и сертификацией.</p>
					</div>
					<div>
						<img src="/icons/spa.svg" alt="Атмосфера" className="mx-auto h-16 mb-4" />
						<h3 className="text-xl font-semibold mb-2">Атмосфера</h3>
						<p>Теплая, расслабляющая обстановка и забота о вашем комфорте.</p>
					</div>
					<div>
						<img src="/icons/tapki.svg" alt="Индивидуальный подход" className="mx-auto h-16 mb-4" />
						<h3 className="text-xl font-semibold mb-2">Индивидуальный подход</h3>
						<p>Каждая процедура подбирается индивидуально для ваших нужд.</p>
					</div>
					<div>
						<img src="/icons/chill.svg" alt="Качество" className="mx-auto h-16 mb-4" />
						<h3 className="text-xl font-semibold mb-2">Высокое качество</h3>
						<p>Мы используем только лучшие масла и проверенные техники массажа.</p>
					</div>
				</div>
			</div>
		</section>
	)
}
