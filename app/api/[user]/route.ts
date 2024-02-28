import { NextResponse } from 'next/server'
import { prisma } from '@/src/clients/prisma'

export async function GET(request: Request, context: { params: any }) {
	const user = await prisma.user.findUnique({
		where: {
			id: Number(context.params.user),
		},
	})

	return NextResponse.json({
		data: user,
	})
}
