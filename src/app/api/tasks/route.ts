import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getScheduleForDate } from '@/types/schedule'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const date = searchParams.get('date')

    if (!userId || !date) {
      return NextResponse.json({ error: 'User ID and date required' }, { status: 400 })
    }

    const targetDate = new Date(date)
    const schedule = getScheduleForDate(targetDate)

    let tasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: targetDate,
      },
    })

    if (tasks.length === 0) {
      tasks = await Promise.all(
        schedule.map((item) =>
          prisma.dailyTask.create({
            data: {
              userId,
              date: targetDate,
              taskType: item.taskType,
              title: item.title,
              description: item.description,
              scheduledTime: item.time,
              points: item.points,
              completed: false,
            },
          })
        )
      )
    }

    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { taskId, completed } = body

    const task = await prisma.dailyTask.update({
      where: { id: taskId },
      data: {
        completed,
        completedAt: completed ? new Date() : null,
      },
    })

    if (completed) {
      await prisma.user.update({
        where: { id: task.userId },
        data: {
          coins: { increment: task.points },
          experience: { increment: task.points },
        },
      })

      await prisma.streak.upsert({
        where: {
          userId_taskType: {
            userId: task.userId,
            taskType: task.taskType,
          },
        },
        create: {
          userId: task.userId,
          taskType: task.taskType,
          currentStreak: 1,
          bestStreak: 1,
          lastCompletedAt: new Date(),
        },
        update: {
          currentStreak: { increment: 1 },
          bestStreak: {
            increment: 1,
          },
          lastCompletedAt: new Date(),
        },
      })
    }

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
