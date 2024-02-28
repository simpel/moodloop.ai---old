import process from 'process'
import OpenAI from 'openai'

const globalForOpenAi = global as unknown as { openAI: OpenAI }

export const openAI =
	globalForOpenAi.openAI ||
	new OpenAI({
		apiKey: process.env.OPENAI_API_KEY,
	})

if (process.env.NODE_ENV !== 'production') globalForOpenAi.openAI = openAI
