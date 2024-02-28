import { type UserJSON } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { validateRequest } from '@/src/auth/clerk/validateRequest'
import { userCreated } from '@/src/auth/clerk/hooks/user/created'
import { userDeleted } from '@/src/auth/clerk/hooks/user/deleted'

export async function POST(request: Request) {
	const payload = await validateRequest(request)

	switch (payload.type) {
		case 'user.created':
		case 'user.updated': {
			await userCreated(payload.data as unknown as UserJSON)
			return new NextResponse('Created user and thread.')
		}

		case 'user.deleted': {
			await userDeleted(payload.data as unknown as UserJSON)
			return new NextResponse('User deleted')
		}

		default: {
			return new NextResponse(`No handler for ${payload.type}`)
		}
	}
}
