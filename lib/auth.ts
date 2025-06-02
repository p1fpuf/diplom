// /lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

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
			}
			return token
		},
		async session({ session, token }) {
			if (token) {
				session.user.id = Number(token.id)
			}
			return session
		},
	},
}