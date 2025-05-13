import { PrismaClient } from '@prisma/client'

// Avoid creating multiple Prisma Client instances in development
const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClient | undefined
}

export const prisma =
	globalForPrisma.prisma ??
	new PrismaClient({
		log: ['query'], // Показывает SQL-запросы в консоли (удобно в dev)
	})

if (process.env.NODE_ENV !== 'production') {
	globalForPrisma.prisma = prisma
}