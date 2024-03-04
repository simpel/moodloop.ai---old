import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import SignedIn from '../SignedIn/SignedIn'
import SignedOut from '../SignedOut/SignedOut'
import { signIn } from '@/src/clients/supabase/actions/Actions'

const HeaderLogin = () => {
	return (
		<>
			<SignedIn>
				<div className="flex items-center gap-4">
					<div>Hi, Welcome back!</div>
					<SignOut />
				</div>
			</SignedIn>
			<SignedOut>
				<div className="flex items-center gap-4">
					<form action={signIn}>
						<SignIn>Sign in with Google</SignIn>
					</form>

					<form action={signIn}>
						<SignIn provider="github">Sign in with GitHub</SignIn>
					</form>
				</div>
			</SignedOut>
		</>
	)
}

export default HeaderLogin
