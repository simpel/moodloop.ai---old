import { Inter, EB_Garamond } from 'next/font/google'
import { ThemeProvider } from '@/src/theme/ThemeProvider'
import '@/app/globals.css'
import HeaderLogin from '@/src/components/HeaderLogin/HeaderLogin'
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
	return (
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
					<div className="flex flex-col justify-end min-h-screen">
						<div className="flex-grow overflow-auto">
							<header className="fixed flex items-center justify-between w-full px-12 py-4 backdrop-blur-lg bg-emerald-50/30 dark:bg-emerald-950/30">
								<div className="font-serif text-2xl">Moodloop.ai</div>
								<div>
									<HeaderLogin />
								</div>
							</header>

							{children}
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}

export default RootLayout
