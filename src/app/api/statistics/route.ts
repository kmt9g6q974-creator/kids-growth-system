import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const now = new Date()
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

    const weeklyTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: { gte: weekAgo },
      },
    })

    const monthlyTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        date: { gte: monthAgo },
      },
    })

    const weeklyCompletionRate =
      weeklyTasks.length > 0
        ? (weeklyTasks.filter((t) => t.completed).length / weeklyTasks.length) * 100
        : 0

    const monthlyCompletionRate =
      monthlyTasks.length > 0
        ? (monthlyTasks.filter((t) => t.completed).length / monthlyTasks.length) * 100
        : 0

    const readingRecords = await prisma.readingRecord.findMany({
      where: {
        userId,
        date: { gte: monthAgo },
      },
    })

    const totalReadingMinutes = readingRecords.reduce((sum, r) => sum + r.minutes, 0)

    const englishTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        taskType: 'ENGLISH',
        date: { gte: monthAgo },
      },
    })

    const englishCheckInCount = englishTasks.filter((t) => t.completed).length

    const mathTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        taskType: 'MATH',
        date: { gte: monthAgo },
      },
    })

    const mathCompletionRate =
      mathTasks.length > 0
        ? (mathTasks.filter((t) => t.completed).length / mathTasks.length) * 100
        : 0

    const sleepTasks = await prisma.dailyTask.findMany({
      where: {
        userId,
        taskType: 'SLEEP',
        date: { gte: monthAgo },
      },
    })

    const sleepRegularity =
      sleepTasks.length > 0
        ? (sleepTasks.filter((t) => t.completed).length / sleepTasks.length) * 100
        : 0

    const weeklyData = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayTasks = await prisma.dailyTask.findMany({
        where: {
          userId,
          date,
        },
      })
      const completionRate =
        dayTasks.length > 0
          ? (dayTasks.filter((t) => t.completed).length / dayTasks.length) * 100
          : 0
      const points = dayTasks.filter((t) => t.completed).reduce((sum, t) => sum + t.points, 0)
      weeklyData.push({
        date: date.toISOString().split('T')[0],
        completionRate,
        points,
      })
    }

    const monthlyData = []
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayTasks = await prisma.dailyTask.findMany({
        where: {
          userId,
          date,
        },
      })
      const completionRate =
        dayTasks.length > 0
          ? (dayTasks.filter((t) => t.completed).length / dayTasks.length) * 100
          : 0
      const points = dayTasks.filter((t) => t.completed).reduce((sum, t) => sum + t.points, 0)
      monthlyData.push({
        date: date.toISOString().split('T')[0],
        completionRate,
        points,
      })
    }

    const heatmapData = []
    for (let i = 89; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayTasks = await prisma.dailyTask.findMany({
        where: {
          userId,
          date,
        },
      })
      const value = dayTasks.filter((t) => t.completed).length
      heatmapData.push({
        date: date.toISOString().split('T')[0],
        value,
      })
    }

    const statistics = {
      weeklyCompletionRate,
      monthlyCompletionRate,
      totalReadingMinutes,
      englishCheckInCount,
      mathCompletionRate,
      sleepRegularity,
      weeklyData,
      monthlyData,
      heatmapData,
    }

    return NextResponse.json(statistics)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
