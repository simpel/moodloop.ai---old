import { experimental_AssistantResponse as assistantResponse } from 'ai'
import { type MessageContentText } from 'openai/resources/beta/threads/messages/messages'
import { openAiClient } from '@/src/clients/openai/openai'
import waitForRun from '@/src/assistant/waitForRun'

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(request: Request) {
	// Parse the request body
	const input: {
		threadId: string | null
		message: string
	} = await request.json()

	// Create a thread if needed
	const threadId = input.threadId!

	// Add a message to the thread
	const createdMessage = await openAiClient.beta.threads.messages.create(
		threadId,
		{
			role: 'user',
			content: input.message,
		},
	)

	return assistantResponse(
		{ threadId, messageId: createdMessage.id },
		async ({ threadId, sendMessage, sendDataMessage }) => {
			// Run the assistant on the thread
			const run = await openAiClient.beta.threads.runs.create(threadId, {
				assistant_id:
					process.env.OPENAI_ASSISTANT_ID ??
					(() => {
						throw new Error('ASSISTANT_ID is not set')
					})(),
			})

			await waitForRun(run, threadId, sendDataMessage, createdMessage)

			// Get new thread messages (after our message)
			const responseMessages = await openAiClient.beta.threads.messages.list(
				threadId,
				{
					after: createdMessage.id,
					order: 'asc',
				},
			)

			// Send the messages
			for (const message of responseMessages.data) {
				sendMessage({
					id: message.id,
					role: 'assistant',
					content: message.content.filter(
						(content) => content.type === 'text',
					) as MessageContentText[],
				})
			}
		},
	)
}
