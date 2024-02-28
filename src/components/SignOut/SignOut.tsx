import { signOutAction } from '@/src/actions/Actions'
import { Button } from '@/src/shadcn/components/ui/button'

const SignOut = () => {
	return (
		<form action={signOutAction}>
			<Button>Sign Out</Button>
		</form>
	)
}

export default SignOut
