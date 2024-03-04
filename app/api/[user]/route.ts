import { NextResponse } from 'next/server'
import { prisma } from '@/src/clients/supabase/server'

export async function GET(request: Request, context: { params: any }) {
	const user = await prisma.user.findUnique({
		cacheStrategy: { ttl: 60 },
		where: {
			id: Number(context.params.user),
		},
	})

	return NextResponse.json({
		data: user,
	})
}
