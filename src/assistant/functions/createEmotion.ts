import { type ThreadMessage } from 'openai/resources/beta/threads/messages/messages'
import { getUser } from '@/src/auth/getUser/getUser'
import { prisma } from '@/src/clients/supabase/server'

const createEmotion = async (
	id: string,
	parameters: any,
	message: ThreadMessage,
) => {
	const user = await getUser()

	const mood = await prisma.mood.create({
		data: {
			mood: (parameters.mood as string) ?? '',
			userId: user!.id,
		},
	})

	console.log('SUCCESS OR?', mood)

	return mood
}

export default createEmotion
