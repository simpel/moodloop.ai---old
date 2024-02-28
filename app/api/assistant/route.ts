import process from 'process'
import { experimental_AssistantResponse } from 'ai'
import type OpenAI from 'openAI'
import { type MessageContentText } from 'openAI/resources/beta/threads/messages/messages'
import { type TAssistantRequest } from '@/src/types/api/assistant/TAssistant'
import { openAI } from '@/src/clients/openAI'
import { getUser } from '@/src/auth/getUser/getUser'

export async function POST(request: Request) {
	// Parse the request body
	const input = (await request.json()) as TAssistantRequest
	const user = await getUser()

	console.log('input', { user: user?.thread.threadId, input })

	// Add a message to the thread
	const createdMessage = await openAI.beta.threads.messages.create(
		user!.thread.threadId,
		{
			role: 'user',
			content: input.message,
		},
	)

	return experimental_AssistantResponse(
		{ threadId: user!.thread.threadId, messageId: createdMessage.id },
		async ({ threadId, sendMessage, sendDataMessage }) => {
			console.log({ threadId, sendMessage, sendDataMessage })

			// Run the assistant on the thread
			const run = await openAI.beta.threads.runs.create(threadId, {
				assistant_id: process.env.OPENAI_ASSISTANT_ID!,
			})

			async function waitForRun(run: OpenAI.Beta.Threads.Runs.Run) {
				// Poll for status change
				while (run.status === 'queued' || run.status === 'in_progress') {
					// Delay for 500ms:
					await new Promise((resolve) => setTimeout(resolve, 500))

					run = await openAI.beta.threads.runs.retrieve(threadId, run.id)
				}

				// Check the run status
				if (
					run.status === 'cancelled' ||
					run.status === 'cancelling' ||
					run.status === 'failed' ||
					run.status === 'expired'
				) {
					throw new Error(run.status)
				}

				if (
					run.status === 'requires_action' &&
					run.required_action?.type === 'submit_tool_outputs'
				) {
					const tool_outputs =
						run.required_action.submit_tool_outputs.tool_calls.map(
							(toolCall) => {
								const parameters = JSON.parse(toolCall.function.arguments)

								switch (toolCall.function.name) {
									case 'create_emotion': {
										sendDataMessage({
											role: 'data',
											data: {
												hey: 'ths was somehtign',
											},
										})

										return {
											tool_call_id: toolCall.id,
											output: `temperature set successfully`,
										}
									}

									default: {
										throw new Error(
											`Unknown tool call function: ${toolCall.function.name}`,
										)
									}
								}
							},
						)

					run = await openAI.beta.threads.runs.submitToolOutputs(
						threadId,
						run.id,
						{ tool_outputs },
					)

					await waitForRun(run)
				}
			}

			await waitForRun(run)

			// Get new thread messages (after our message)
			const responseMessages = await openAI.beta.threads.messages.list(
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
