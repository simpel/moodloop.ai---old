import { type RequiredActionFunctionToolCall } from 'openai/resources/beta/threads/runs/runs'
import { type DataMessage } from 'ai'
import type OpenAI from 'openai'
import { type ThreadMessage } from 'openai/resources/beta/threads/messages/messages'
import { openAiClient } from '../clients/openai/openai'
import createEmotion from './functions/createEmotion'

const waitForRun = async (
	run: OpenAI.Beta.Threads.Runs.Run,
	threadId: string,
	sendDataMessage: (message: DataMessage) => void,
	message: ThreadMessage,
) => {
	// Poll for statusasync async  change
	while (run.status === 'queued' || run.status === 'in_progress') {
		console.log('waiting', run.status)

		await new Promise((resolve) => setTimeout(resolve, 500))
		run = await openAiClient.beta.threads.runs.retrieve(threadId, run.id)
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
		const tool_outputs = run.required_action.submit_tool_outputs.tool_calls.map(
			async (toolCall: RequiredActionFunctionToolCall) => {
				const parameters = JSON.parse(toolCall.function.arguments)

				switch (toolCall.function.name) {
					case 'create_emotion': {
						const data = await createEmotion(toolCall.id, parameters, message)
						sendDataMessage({
							role: 'data',
							data: JSON.stringify(data),
						})

						return {
							tool_call_id: toolCall.id,
							output: 'success',
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

		run = await openAiClient.beta.threads.runs.submitToolOutputs(
			threadId,
			run.id,
			{
				tool_outputs,
			},
		)

		await waitForRun(run, threadId, sendDataMessage, message)
	}
}

export default waitForRun
