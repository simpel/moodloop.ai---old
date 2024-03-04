'use client'

import {
	type Message,
	experimental_useAssistant as useAssistant,
} from 'ai/react'
import { useEffect, useRef } from 'react'
import { type TAssistantChat } from './TAssistantChat'
import { Input } from '@/src/shadcn/components/ui/input'

const roleToColorMap: Record<Message['role'], string> = {
	system: 'red',
	user: 'black',
	function: 'blue',
	tool: 'purple',
	assistant: 'green',
	data: 'orange',
}

const AssistantChat = ({ user }: TAssistantChat) => {
	const { status, messages, input, submitMessage, handleInputChange, error } =
		useAssistant({
			api: '/api/assistant',
			threadId: user?.thread.threadId,
		})

	const inputReference = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (status === 'awaiting_message') {
			inputReference.current?.focus()
		}
	}, [status])

	const renderError = () => {
		if (error) {
			console.error('AssistantChat', error)
			return (
				<div className="relative bg-red-500 text-white px-6 py-4 rounded-md">
					<span className="block sm:inline">Error</span>
				</div>
			)
		}
	}

	const renderLoading = () => {
		if (status === 'in_progress') {
			return (
				<div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
			)
		}
	}

	const renderMessages = () => {
		return messages.map((m: Message) => {
			return (
				<div
					key={m.id}
					className="whitespace-pre-wrap"
					style={{ color: roleToColorMap[m.role] }}
				>
					<strong>{`${m.role}: `}</strong>
					{m.role !== 'data' && m.content}
					{m.role === 'data' && (
						<>
							{(m.data as any).description}
							<br />
							<pre className="bg-gray-200">
								{JSON.stringify(m.data, null, 2)}
							</pre>
						</>
					)}
					<br />
					<br />
				</div>
			)
		})
	}

	return (
		<div>
			<div className="min-h-screen py-20 flex">
				<div className=" self-end container max-w-2xl mx-auto">
					{renderError()}
					{renderMessages()}
					{renderLoading()}
				</div>

				<div className="fixed bottom-0 flex w-full h-20 items-center backdrop-blur-xxl bg-gradient-to-b from-transparent to-emerald-50 dark:to-emerald-950">
					<div className="container max-w-2xl mx-auto">
						<form onSubmit={submitMessage}>
							<Input
								ref={inputReference}
								disabled={status !== 'awaiting_message'}
								value={input}
								placeholder="What is the temperature in the living room?"
								onChange={handleInputChange}
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default AssistantChat
