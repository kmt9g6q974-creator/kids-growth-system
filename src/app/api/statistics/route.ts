export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
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

    const weeklyCompletionRate = weeklyTasks.length > 0
      ? (weeklyTasks.filter(t => t.completed).length / weeklyTasks.length) * 100
      : 0

    const monthlyCompletionRate = monthlyTasks.length > 0
      ? (monthlyTasks.filter(t => t.completed).length / monthlyTasks.length) * 100
      : 0

    const readingRecords = await prisma.readingRecord.findMany({
      where: { userId },
    })

    const totalReadingMinutes = readingRecords.reduce((sum, r) => sum + r.minutes, 0)

    const englishTasks = monthlyTasks.filter(t => t.taskType === 'ENGLISH')
    const englishCheckInCount = englishTasks.filter(t => t.completed).length

    const mathTasks = monthlyTasks.filter(t => t.taskType === 'MATH')
    const mathCompletionRate = mathTasks.length > 0
      ? (mathTasks.filter(t => t.completed).length / mathTasks.length) * 100
      : 0

    const sleepRegularity = 95

    const weeklyData = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(weekAgo.getTime() + i * 24 * 60 * 60 * 1000)
      const dayTasks = weeklyTasks.filter(t => 
        t.date.toDateString() === date.toDateString()
      )
      const completionRate = dayTasks.length > 0
        ? (dayTasks.filter(t => t.completed).length / dayTasks.length) * 100
        : 0
      const points = dayTasks.filter(t => t.completed).reduce((sum, t) => sum + t.points, 0)
      
      return {
        date: date.toISOString().split('T')[0],
        completionRate,
        points,
      }
    })

    const monthlyData = Array.from({ length: 4 }, (_, i) => {
      const date = new Date(monthAgo.getTime() + i * 7 * 24 * 60 * 60 * 1000)
      const weekTasks = monthlyTasks.filter(t => {
        const taskDate = t.date
        const weekStart = new Date(date.getTime())
        const weekEnd = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000)
        return taskDate >= weekStart && taskDate < weekEnd
      })
      const completionRate = weekTasks.length > 0
        ? (weekTasks.filter(t => t.completed).length / weekTasks.length) * 100
        : 0
      
      return {
        date: date.toISOString().split('T')[0],
        completionRate,
      }
    })

    const heatmapData = Array.from({ length: 90 }, (_, i) => {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000)
      const dayTasks = monthlyTasks.filter(t =>
        t.date.toDateString() === date.toDateString()
      )
      const value = dayTasks.filter(t => t.completed).length
      
      return {
        date: date.toISOString().split('T')[0],
        value,
      }
    })

    return NextResponse.json({
      weeklyCompletionRate,
      monthlyCompletionRate,
      totalReadingMinutes,
      englishCheckInCount,
      mathCompletionRate,
      sleepRegularity,
      weeklyData,
      monthlyData,
      heatmapData,
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
