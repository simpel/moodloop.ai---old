'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/src/shadcn/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/src/shadcn/components/ui/form'
import { Input } from '@/src/shadcn/components/ui/input'

const loginSchema = z.object({
	email: z
		.string()
		.min(2, {
			message: 'Your e-mail must be at least 2 characters.',
		})
		.max(50),
	password: z.string(),
})

const SignInForm = () => {
	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const onSubmit = (values: z.infer<typeof loginSchema>) => {
		console.log({ values })
	}

	return (
		<Form {...form}>
			<form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Your e-mail</FormLabel>
							<FormControl>
								<Input placeholder="sigmund@moodloop.ai" {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									type="password"
									placeholder="Your darkest secret"
									{...field}
								/>
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit">Sign in</Button>
			</form>
		</Form>
	)
}

export default SignInForm
