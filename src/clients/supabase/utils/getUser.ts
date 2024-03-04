'use server'

import { unstable_noStore as noStore } from 'next/cache'
import { createSupabaseServerClient } from '../server'

export async function getUser() {
	noStore()
	const supabase = await createSupabaseServerClient()
	return supabase.auth
		.getUser()
		.then((user) => {
			return user.data.user
		})
		.catch((error) => {
			return null
		})
}
