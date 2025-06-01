import { ReactNode } from "react"

export interface User {
	id: string
	name: string
	email: string
}

export type Booking = {
	date: string | number | Date
	serviceName: ReactNode
	id: number
	appointment_time: string
	status: string
	services: {
		title: string
	} | null
}
