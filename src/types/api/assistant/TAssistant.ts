import { type User } from '@prisma/client'

export type TAssistantRequest = {
	threadId: string
	message: string
	user: User
}
