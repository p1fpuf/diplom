// middleware.ts
import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { authOptions } from '@/lib/auth'

export async function middleware(req: NextRequest) {
	const path = req.nextUrl.pathname

	if (path.startsWith('/login') || path.startsWith('/api/auth')) {
		return NextResponse.next()
	}

	try {
		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET!,
			cookieName:
				authOptions.cookies?.sessionToken?.name ||
				'__Secure-next-auth.session-token',
		})

		if (!token) {
			const loginUrl = new URL('/login', req.url)
			loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
			return NextResponse.redirect(loginUrl)
		}

		return NextResponse.next()
	} catch (err) {
		console.error('Middleware auth error:', err)

		const loginUrl = new URL('/login', req.url)
		const response = NextResponse.redirect(loginUrl)
		response.cookies.delete('__Secure-next-auth.session-token')

		return response
	}
}

export const config = {
	matcher: ['/account/:path*', '/dashboard/:path*', '/api/bookings/:path*'],
}