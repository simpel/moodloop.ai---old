'use client'

import { Loader2 } from 'lucide-react'
import { useFormStatus } from 'react-dom'
import { SiGoogle, SiGithub } from '@icons-pack/react-simple-icons'
import { type TSignIn } from './TSignIn'
import { Button } from '@/src/shadcn/components/ui/button'

const SignIn = ({ children, provider = 'google', ...properties }: TSignIn) => {
	const { pending } = useFormStatus()

	const renderIcon = () => {
		if (provider === 'google') {
			return <SiGoogle className="mr-2 h-4 w-4" />
		}

		if (provider === 'github') {
			return <SiGithub className="mr-2 h-4 w-4" />
		}
	}

	return (
		<>
			<input type="hidden" value={provider} name="provider" />

			<Button type="submit" {...properties}>
				{pending ? (
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
				) : (
					renderIcon()
				)}
				{children}
			</Button>
		</>
	)
}

export default SignIn
