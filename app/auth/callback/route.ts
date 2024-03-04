import { NextResponse } from 'next/server'
import { createSupabaseServerClient } from '@/src/clients/supabase/server'

export async function GET(request: Request) {
	console.log('request', request)
	const { searchParams, origin } = new URL(request.url)
	const code = searchParams.get('code')
	// If "next" is in param, use it as the redirect URL
	const next = searchParams.get('next') ?? '/'

	console.log('code', code)

	if (code) {
		const supabase = await createSupabaseServerClient()
		const { error } = await supabase.auth.exchangeCodeForSession(code)
		if (!error) {
			return NextResponse.redirect(`${origin}${next}`)
		}
	}

	// Return the user to an error page with instructions
	return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
