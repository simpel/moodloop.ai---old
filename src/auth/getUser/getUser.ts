import { currentUser } from '@clerk/nextjs'
import { prisma } from '../../clients/prisma'
import { type TUser } from './TUser'

export const getUser = async (): Promise<TUser | null> => {
	const user = await currentUser()

	if (!user) return null

	return prisma.user.findUnique({
		where: {
			clerk_id: user.id,
		},
		include: {
			thread: {
				select: {
					threadId: true,
				},
			},
		},
	})
}
