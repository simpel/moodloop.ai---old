'use client'

import { type TLoggedInStartPage } from './TLoggedInStartPage'
import { saveMoodAction } from '@/src/actions/Actions'
import { Button } from '@/src/shadcn/components/ui/button'

const LoggedInStartPage = ({ user }: TLoggedInStartPage) => {
	return (
		<main className="flex items-center justify-center md:h-screen">
			<div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
				<h1>
					Hi, {user?.name} {user?.id}
				</h1>

				<p>Create Mood!</p>
				<form action={saveMoodAction}>
					<input type="hidden" name="userId" value={user.id} />
					<input type="hidden" name="categoryId" value={1} />
					<input type="hidden" name="mood" value={21} />
					<Button type="submit"> Create Mood in category 1</Button>
				</form>
			</div>
		</main>
	)
}

export default LoggedInStartPage
