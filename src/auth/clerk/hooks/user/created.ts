import { type UserJSON } from '@clerk/nextjs/server'
import { openAI } from '@/src/clients/openai'
import { prisma } from '@/src/clients/prisma'

export const userCreated = async (userData: UserJSON) => {
	const thread = await openAI.beta.threads.create({})

	return prisma.user.upsert({
		create: {
			clerk_id: userData.id,
			email: userData.primary_email_address_id,
			first_name: userData.first_name,
			last_name: userData.last_name,
			thread: {
				create: {
					threadId: thread.id,
				},
			},
		},
		update: {
			updated_at: new Date(),
			clerk_id: userData.id,
			email: userData.primary_email_address_id,
			first_name: userData.first_name,
			last_name: userData.last_name,
		},
		where: {
			clerk_id: userData.id,
		},
	})
}
