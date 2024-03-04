import { getUser } from '@/src/clients/supabase/utils/getUser'
import AssistantChat from '@/src/components/AssistantChat/AssistantChat'

const You = async () => {
	const user = await getUser()

	console.log('user', user)

	return <AssistantChat user={user} />
}

export default You
