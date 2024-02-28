import { type User } from '@prisma/client'

export type TUser = {
	thread: {
		threadId: string
	}
} & User
