'use client'

import { signInAction } from '@/src/actions/Actions'
import { Button } from '@/src/shadcn/components/ui/button'

const SignIn = () => {
	return (
		<form action={signInAction}>
			<Button>Sign in</Button>
		</form>
	)
}

export default SignIn
