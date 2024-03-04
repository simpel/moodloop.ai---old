'use server'
import { redirect } from 'next/navigation'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { createSupabaseServerClient } from '../server'

export const signIn = async (formData: FormData) => {
	const supabase = await createSupabaseServerClient()
	const provider = formData.get('provider')?.toString() ?? 'google'

	const { data, error } = await supabase.auth.signInWithOAuth({
		provider,
		options: {
			redirectTo: `http://localhost:3000/auth/callback`,
		},
	})

	if (error) {
		console.log(error)
		redirect('/error')
	}

	revalidatePath('/', 'layout')

	redirect(data?.url)
}

export async function signOut() {
	const supabase = await createSupabaseServerClient()

	const response = await supabase.auth.signOut()

	console.log(response)

	if (response.error) {
		redirect('/error')
	}

	revalidatePath('/', 'layout')
	// Redirect('/')
}

export async function readUserSession() {
	noStore()
	const supabsae = await createSupabaseServerClient()
	return supabsae.auth.getSession()
}
