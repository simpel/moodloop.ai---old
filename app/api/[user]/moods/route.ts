import { NextResponse } from 'next/server'
import { type TPostMood } from '@/src/types/api/moods/TMoods'
import { prisma } from '@/src/clients/supabase/server'

/**
 * Handles the GET request for retrieving user moods within a specified range.
 * @param request - The incoming request object.
 * @param context - The context object containing route parameters.
 * @returns A JSON response containing the route parameters, range, and user data.
 */

export async function GET(request: Request, context: { params: any }) {
	const { searchParams } = new URL(request.url)
	try {
		const range: number = isNaN(Number(searchParams.get('range')))
			? 30
			: Number(searchParams.get('range'))

		const moods = await prisma.user.findUnique({
			cacheStrategy: { ttl: 60 },
			where: {
				id: Number(context.params.user),
			},
			include: {
				moods: {
					orderBy: {
						createdAt: 'desc',
					},
					where: {
						createdAt: {
							gte: new Date(new Date().setDate(new Date().getDate() - range)),
						},
					},
					select: {
						id: true,
						value: true,
						createdAt: true,
						userId: false,
						category: {
							select: {
								name: true,
							},
						},
					},
				},
			},
		})

		return NextResponse.json({
			data: moods,
		})
	} catch (error) {
		return NextResponse.json({
			error,
		})
	}
}

/**
 * Handles the POST request for creating a new mood entry.
 *
 * @param request - The HTTP request object.
 * @param context - The context object containing the route parameters.
 * @returns A JSON response with the created mood entry and status.
 */
export async function POST(request: Request, context: { params: any }) {
	try {
		const json = (await request.json()) as TPostMood

		const data = await prisma.mood.create({
			data: {
				categoryId: json.categoryId,
				mood: json.mood,
				userId: String(context.params.user),
			},
		})

		return NextResponse.json({
			data,
		})
	} catch (error) {
		return NextResponse.json({
			error,
		})
	}
}
