import process from 'process'
import { type WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

export const validateRequest = async (request: Request) => {
	const webhookSecret = process.env.CLERK_SECRET_WEBHOOK_KEY || ``
	const payloadString = await request.text()
	const headerPayload = headers()

	const svixHeaders = {
		'svix-id': headerPayload.get('svix-id')!,
		'svix-timestamp': headerPayload.get('svix-timestamp')!,
		'svix-signature': headerPayload.get('svix-signature')!,
	}
	const wh = new Webhook(webhookSecret)
	return wh.verify(payloadString, svixHeaders) as WebhookEvent
}
