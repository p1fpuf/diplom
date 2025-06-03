import { ReactNode } from "react"

export interface User {
	id: string
	name: string
	email: string
	isAdmin?: boolean
}

export type BookingStatus =
	| 'ожидает'
	| 'подтверждено'
	| 'отклонено'
	| 'завершено'

export type Booking = {
	id: number
	appointment_time: string
	status: BookingStatus // <-- Лучше явно
	date: string | number | Date
	serviceName?: ReactNode

	services: {
		id: number
		title: string
		description?: string
		price?: number
	} | null

	user?: {
		id: number
		name: string
		email: string
	} // <-- Для админа — видеть кто записался
}

export interface Service {
	id: number
	title: string
	description: string
	price: number
	category: string
}