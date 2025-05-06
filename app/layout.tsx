import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'

const inter = Inter({ subsets: ['latin'] })

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
			<body className={inter.className}>
				<Header />
				{children}
			</body>
		</html>
	)
}
