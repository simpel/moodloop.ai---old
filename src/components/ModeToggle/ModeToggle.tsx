'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'
import { Toggle } from '@/src/shadcn/components/ui/toggle'

const ModeToggle = () => {
	const { setTheme, theme } = useTheme()

	return (
		<Toggle
			onPressedChange={() => {
				console.log('theme', theme)
				setTheme(theme === 'dark' ? 'light' : 'dark')
			}}
		>
			{theme === 'dark' ? <Sun /> : <Moon />}
		</Toggle>
	)
}

export default ModeToggle
