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

const passWordField = z
	.string()
	.min(8, {
		message: 'Password must be at least 8 characters.',
	})
	.refine(
		(password) => {
			return (
				/[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)
			)
		},
		{
			message: 'Password must contain lowercase, uppercase letters and numbers',
		},
	)

const passwordSchema = z
	.object({
		password: passWordField,
		confirmPassword: passWordField,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	})

const signUpSchema = z.object({
	email: z.string().email({ message: 'Invalid email address.' }),
	password: passWordField,
	comfirmPassword: passWordField,
})

const SignUpForm = () => {
	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			email: '',
			password: '',
			comfirmPassword: '',
		},
	})

	const onSubmit = (values: z.infer<typeof signUpSchema>) => {
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
							<FormLabel>E-mail</FormLabel>
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
				<FormField
					control={form.control}
					name="comfirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm Password</FormLabel>
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
				<Button type="submit">Sign up</Button>
			</form>
		</Form>
	)
}

export default SignUpForm
