import { type Button } from '@/src/shadcn/components/ui/button'

export type TSignIn = {
	provider: string
} & React.ComponentPropsWithRef<typeof Button>
