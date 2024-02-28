import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { getUser } from '@/src/auth/getUser/getUser'

const Start = async () => {
	const user = await getUser()

	if (user) redirect('/you')

	return (
		<main className="h-screen flex items-center justify-center ">
			<div className="container mx-auto text-center">
				<h1 className="text-8xl">
					Track your mood, understand your mental health.
				</h1>
				<p className="max-w-2xl font-serif text-3xl mt-8 text-center mx-auto">
					Moodloop.ai is your mood assistant, guiding you to understand and
					improve your mental health with personalized insights over time.
				</p>
				<div className="mt-12 text-center">
					<SignUpButton>
						<button
							type="button"
							className="inline px-10 py-2 rounded-full bg-emerald-200 dark:bg-emerald-700 border-2 border-transparent hover:border-emerald-800 dark:hover:border-emerald-100"
						>
							Create account
						</button>
					</SignUpButton>
				</div>
				<div className="mt-4 text-center">
					<SignInButton>
						<button type="button" className="hover:underline">
							Sign in
						</button>
					</SignInButton>
				</div>
			</div>
		</main>
	)
}

export default Start
