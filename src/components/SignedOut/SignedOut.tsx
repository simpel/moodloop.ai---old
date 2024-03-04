import { type TSignedOut } from './TSignedOut'
import { getUser } from '@/src/clients/supabase/utils/getUser'

const SignedOut = async ({ children }: TSignedOut) => {
	const user = await getUser()

	if (!user) {
		return <>{children}</>
	}

	return null
}

export default SignedOut
