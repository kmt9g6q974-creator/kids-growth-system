export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const date = searchParams.get('date')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const tasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: date ? new Date(date) : undefined,
      },
    })

    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, completed, userId } = body

    const task = await prisma.dailyTask.update({
      where: { id: taskId },
      data: { completed },
    })

    if (completed) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      })

      if (user) {
        await prisma.user.update({
          where: { id: userId },
          data: {
            coins: { increment: task.points },
            experience: { increment: task.points },
            totalStars: { increment: 1 },
          },
        })

        const existingStreak = await prisma.streak.findFirst({
          where: { userId },
        })

        if (existingStreak) {
          await prisma.streak.update({
            where: { id: existingStreak.id },
            data: { currentStreak: { increment: 1 } },
          })
        }
      }
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error('Error updating task:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
