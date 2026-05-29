export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, date } = body

    const existingCheckIn = await prisma.checkIn.findFirst({
      where: {
        userId,
        date: new Date(date),
      },
    })

    if (existingCheckIn) {
      return NextResponse.json({ error: 'Already checked in today' }, { status: 400 })
    }

    const streak = await prisma.streak.findFirst({
      where: { userId },
    })

    const checkIn = await prisma.checkIn.create({
      data: {
        userId,
        date: new Date(date),
        streakDay: streak ? streak.currentStreak + 1 : 1,
      },
    })

    const bonusCoins = checkIn.streakDay >= 7 ? 10 : 0

    await prisma.user.update({
      where: { id: userId },
      data: {
        coins: { increment: 5 + bonusCoins },
      },
    })

    if (streak) {
      await prisma.streak.update({
        where: { id: streak.id },
        data: {
          currentStreak: { increment: 1 },
          bestStreak: { increment: 1 },
        },
      })
    }

    return NextResponse.json({ checkIn, bonusCoins })
  } catch (error) {
    console.error('Error checking in:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const checkIns = await prisma.checkIn.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
    })

    return NextResponse.json(checkIns)
  } catch (error) {
    console.error('Error fetching check-ins:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
