import './globals.css'
import { Inter } from 'next/font/google'
import ClientLayout from './ClientLayout'
import Header from './components/Header'
import Footer from './components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata = {
	title: 'StudioCherkasovoy',
	description: 'Салон массажа с бронированием, галереей и отзывами',
	icons: {
		icon: '/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='ru'>
			<head>
				<link
					href='https://fonts.googleapis.com/css2?family=Zing+Script&family=Angst&display=swap'
					rel='stylesheet'
				/>
			</head>
			<body className={`${inter.className} font-[Angst]`}>
				<ClientLayout>
					<Header />
					{children}
					<Footer />
				</ClientLayout>
			</body>
		</html>
	)
}