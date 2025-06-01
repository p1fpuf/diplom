// lib/auth.ts
import { NextAuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
	redis: Redis.fromEnv(),
	limiter: Ratelimit.slidingWindow(5, '1 m'),
})

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				try {
					if (!credentials?.email || !credentials?.password) return null

					// Безопасное получение IP с проверкой req и headers
					let ip = '127.0.0.1'
					if (req && req.headers) {
						const forwardedFor = req.headers.get('x-forwarded-for')
						if (forwardedFor) {
							ip = forwardedFor.split(',')[0].trim()
						}
					}

					const { success } = await ratelimit.limit(ip)
					if (!success) throw new Error('Too many requests')

					const user = await prisma.users.findUnique({
						where: { email: credentials.email },
					})

					if (!user) return null

					const isValid =
						credentials.password === user.password_hash
							? false
							: await bcrypt.compare(credentials.password, user.password_hash)

					if (!isValid) return null

					return {
						id: String(user.id),
						email: user.email,
						name: user.name,
						avatarUrl: user.avatarUrl || null,
					} as User
				} catch (error) {
					console.error('Authorization error:', error)
					return null
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.avatarUrl = (user as any).avatarUrl
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = token.id as string
				session.user.avatarUrl = token.avatarUrl as string | null
			}
			return session
		},
	},
	pages: {
		signIn: '/login',
	},
	cookies: {
		sessionToken: {
			name: '__Secure-next-auth.session-token',
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				secure: process.env.NODE_ENV === 'production',
			},
		},
	},
}