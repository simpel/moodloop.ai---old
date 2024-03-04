import { signOut } from '@/src/clients/supabase/actions/Actions'
import { Button } from '@/src/shadcn/components/ui/button'

const SignOut = () => {
	return (
		<form action={signOut}>
			<Button>Sign Out</Button>
		</form>
	)
}

export default SignOut
