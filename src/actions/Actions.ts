'use server'

import { signIn, signOut } from '../auth/Auth'
import { prisma } from '../clients/prisma'

export const saveMoodAction = async (formData: FormData) => {
	const userId = formData.get('userId') as string
	const categoryId = Number(formData.get('categoryId')) as unknown as number
	const mood = Number(formData.get('mood')) as unknown as number

	await prisma.mood.create({
		data: {
			userId,
			categoryId,
			mood,
		},
	})
}

export const signOutAction = async () => {
	await signOut({
		redirectTo: '/',
	})
}

export const signInAction = async () => {
	await signIn('google', {
		redirectTo: '/home',
	})
}
