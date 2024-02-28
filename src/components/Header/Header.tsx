import {
	SignInButton,
	SignOutButton,
	UserButton,
	currentUser,
} from '@clerk/nextjs'

const Header = async () => {
	const user = await currentUser()

	return (
		<header className="container mx-auto flex items-center justify-between py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl sticky top-0">
			<h1 className="font-bold text-black dark:text-white m-0 p-0">
				Moodloop.ai
			</h1>
			<div className="flex items-center">
				{user ? <SignOutButton /> : <SignInButton />}
				<UserButton />
			</div>
		</header>
	)
}

export default Header
