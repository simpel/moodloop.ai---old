import { getUser } from '@/src/clients/supabase/utils/getUser'
import SignIn from '@/src/components/SignIn/SignIn'

const Start = async () => {
	const user = await getUser()

	console.log({ user })

	return (
		<main className="flex items-center justify-center h-screen ">
			<div className="container mx-auto text-center">
				<h1 className="text-8xl">
					Track your mood, understand your mental health.
				</h1>
				<p className="max-w-2xl mx-auto mt-8 font-serif text-3xl text-center">
					Moodloop.ai is your mood assistant, guiding you to understand and
					improve your mental health with personalized insights over time.
				</p>
				<div className="mt-12 text-center text-2xl">
					<SignIn>Sign in with google and start today</SignIn>
				</div>
			</div>
		</main>
	)
}

export default Start
