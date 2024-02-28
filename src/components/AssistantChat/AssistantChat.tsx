'use client'

import { experimental_useAssistant as useAssistant } from 'ai/react'
import { useEffect, useRef } from 'react'
import { Input } from '@/src/shadcn/components/ui/input'

const AssistantChat = () => {
	const { status, input, submitMessage, handleInputChange } = useAssistant({
		api: '/api/assistant',
	})

	const inputReference = useRef<HTMLInputElement>(null)
	useEffect(() => {
		if (status === 'awaiting_message') {
			inputReference.current?.focus()
		}
	}, [status])

	return (
		<form onSubmit={submitMessage}>
			<Input
				ref={inputReference}
				disabled={status !== 'awaiting_message'}
				value={input}
				placeholder="What is the temperature in the living room?"
				onChange={handleInputChange}
			/>
		</form>
	)
}

export default AssistantChat
