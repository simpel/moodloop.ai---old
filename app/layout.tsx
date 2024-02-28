import {
	ClerkProvider,
	SignInButton,
	SignOutButton,
	SignUpButton,
	SignedIn,
	SignedOut,
} from '@clerk/nextjs'
import { Inter, EB_Garamond } from 'next/font/google'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import '@/app/globals.css'
import { getUser } from '@/src/auth/getUser/getUser'
// eslint-disable-next-line new-cap
const inter = Inter({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-inter',
})
// eslint-disable-next-line new-cap
const garamond = EB_Garamond({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-garamond',
})

export const metadata = {
	title: '👋 Moodloop.ai',
	description: 'Your personal mood assistant',
}

const RootLayout = async ({
	children,
}: {
	readonly children: React.ReactNode
}) => {
	const user = await getUser()

	return (
		<ClerkProvider>
			<html suppressHydrationWarning lang="en">
				<head />
				<body
					className={`bg-emerald-50 dark:bg-emerald-950 ${inter.variable} ${garamond.variable}`}
				>
					<ThemeProvider
						enableSystem
						disableTransitionOnChange
						attribute="class"
						defaultTheme="system"
					>
						<div className="min-h-screen flex flex-col justify-end">
							<div className="flex-grow overflow-auto">
								<header className="fixed w-full backdrop-blur-lg py-4 px-12 bg-emerald-50/30 dark:bg-emerald-950/30 flex justify-between items-center">
									<div className="font-serif text-2xl">Moodloop.ai</div>
									<div>
										<SignedIn>
											<div className="flex gap-4 items-center">
												<div>
													Hi,
													{user?.first_name}. Welcome back!
												</div>
												<SignOutButton>
													<button
														type="button"
														className="block px-4 py-2 rounded bg-emerald-200 dark:bg-emerald-700 border-2 border-transparent hover:border-emerald-800 dark:hover:border-emerald-100"
													>
														Sign out
													</button>
												</SignOutButton>
											</div>
										</SignedIn>
										<SignedOut>
											<div className="flex gap-4 items-center">
												<SignInButton>
													<button
														type="button"
														className="block px-4 py-2 rounded border-emerald-200 dark:bg-emerald-700 border-2 bg-transparent hover:border-emerald-800 dark:hover:border-emerald-100"
													>
														Sign in
													</button>
												</SignInButton>

												<SignUpButton>
													<button
														type="button"
														className="block px-4 py-2 rounded bg-emerald-200 dark:bg-emerald-700 border-2 border-transparent hover:border-emerald-800 dark:hover:border-emerald-100"
													>
														Sign up
													</button>
												</SignUpButton>
											</div>
										</SignedOut>
									</div>
								</header>

								{children}
							</div>
						</div>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	)
}

export default RootLayout
