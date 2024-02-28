import { getUser } from '@/src/auth/getUser/getUser'
import AssistantChat from '@/src/components/AssistantChat/AssistantChat'
import AssistantThread from '@/src/components/AssistantThread/AssistantThread'

const You = async () => {
	const user = await getUser()

	return (
		<>
			<AssistantThread />
			<div className="container fixed bottom-0 w-full mx-auto pt-4 pb-4 backdrop-blur-xxl bg-gradient-to-b from-transparent to-emerald-50 dark:to-emerald-950">
				<div className="max-w-2xl container mx-auto">
					<AssistantChat user={user} />
				</div>
			</div>
		</>
	)
}

export default You
