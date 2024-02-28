'use client'

import {
	type Message,
	experimental_useAssistant as useAssistant,
} from 'ai/react'
import { useEffect, useRef } from 'react'

const roleToColorMap: Record<Message['role'], string> = {
	system: 'red',
	user: 'black',
	function: 'blue',
	tool: 'purple',
	assistant: 'green',
	data: 'orange',
}

const AssistantThread = () => {
	const { status, messages } = useAssistant({
		api: '/api/assistant',
	})

	const inputReference = useRef<HTMLInputElement>(null)
	useEffect(() => {
		console.log('status', messages)

		if (status === 'awaiting_message') {
			inputReference.current?.focus()
		}
	}, [status])

	return (
		<div>
			{messages.map((message: Message) => (
				<div
					key={message.id}
					className="whitespace-pre-wrap"
					style={{ color: roleToColorMap[message.role] }}
				>
					<strong>{`${message.role}: `}</strong>
					{message.role !== 'data' && message.content}
					{message.role === 'data' && (
						<>
							{(message.data as any).description}
							<br />
							<pre className="bg-gray-200">
								{JSON.stringify(message.data, null, 2)}
							</pre>
						</>
					)}
					<br />
					<br />
				</div>
			))}
			{status === 'in_progress' && (
				<div className="h-8 w-full max-w-md p-2 mb-8 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse" />
			)}
		</div>
	)
}

export default AssistantThread
