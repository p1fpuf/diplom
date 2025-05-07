import './globals.css'
import { Inter } from 'next/font/google'
import Header from './components/Header'
import Hero from './components/Hero'

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
	children: React.ReactNode;
  }) {
	return (
	  <html lang="ru">
		<head>
		  <link
			href="https://fonts.googleapis.com/css2?family=Zing+Script&family=Angst&display=swap"
          rel="stylesheet"
		  />
		</head>
		<body className="font-[Angst]">
		  <Header />
		  <Hero />
		  {children}
		</body>
	  </html>
	);
  }