import { type TSignedIn } from './TSignedIn'
import { getUser } from '@/src/clients/supabase/utils/getUser'

const SignedIn = async ({ children }: TSignedIn) => {
	const user = await getUser()

	if (user) {
		return <>{children}</>
	}

	return null
}

export default SignedIn
