import { type UserJSON } from '@clerk/nextjs/server'
import { prisma } from '@/src/clients/prisma'

export const userDeleted = async (userData: UserJSON) => {
	const user = await prisma.user.findUnique({
		where: {
			clerk_id: userData.id,
		},
	})

	if (user) {
		return prisma.user.delete({
			where: {
				clerk_id: userData.id,
			},
		})
	}
}
