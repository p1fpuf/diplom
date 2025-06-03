// /lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function getUserFromToken(req: Request) {
	const authHeader = req.headers.get('authorization') || ''
	const token = authHeader.replace('Bearer ', '')
	if (!token) return null

	try {
		const { payload } = await jwtVerify(token, secret)
		return {
			id: payload.id,
			email: payload.email,
			isAdmin: payload.isAdmin,
		}
	} catch (error) {
		console.error('Ошибка валидации токена:', error)
		return null
	}
}

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials) {
				const user = await prisma.users.findUnique({
					where: { email: credentials?.email },
				})

				console.log('USER FROM DB:', user)

				if (!user) return null

				const isValid = await bcrypt.compare(
					credentials!.password,
					user.password_hash
				)

				console.log('PASSWORD VALID:', isValid)

				if (!isValid) return null

				return {
					id: String(user.id),
					email: user.email,
					name: user.name,
					isAdmin: user.isAdmin,
				}
			},
		}),
	],
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/login',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				const dbUser = await prisma.users.findUnique({
					where: { id: Number(user.id) },
				})
				token.isAdmin = dbUser?.isAdmin as boolean | undefined
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = Number(token.id)
				session.user.isAdmin = token.isAdmin as boolean | undefined
			}
			return session
		},
	},
}