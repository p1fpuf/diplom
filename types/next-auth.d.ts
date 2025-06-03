// types/next-auth.d.ts
import 'next-auth'

declare module 'next-auth' {
	interface User {
		id: string
		avatarUrl?: string | null
		isAdmin?: boolean
	}

	interface Session {
		user: {
			id: number
			name?: string | null
			email?: string | null
			image?: string | null
			avatarUrl?: string | null
			isAdmin?: boolean
		}
	}
}

declare module 'next-auth/jwt' {
	interface JWT {
		id: string
		avatarUrl?: string | null
		isAdmin?: boolean
	}
}
