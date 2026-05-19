import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, date } = body

    const checkDate = new Date(date)
    checkDate.setHours(0, 0, 0, 0)

    const existingCheckIn = await prisma.checkIn.findUnique({
      where: {
        userId_date: {
          userId,
          date: checkDate,
        },
      },
    })

    if (existingCheckIn) {
      return NextResponse.json(existingCheckIn)
    }

    const yesterday = new Date(checkDate)
    yesterday.setDate(yesterday.getDate() - 1)

    const yesterdayCheckIn = await prisma.checkIn.findUnique({
      where: {
        userId_date: {
          userId,
          date: yesterday,
        },
      },
    })

    const streakDay = yesterdayCheckIn ? yesterdayCheckIn.streakDay + 1 : 1
    const bonusCoins = streakDay >= 7 ? Math.floor(streakDay / 7) * 10 : 0

    const checkIn = await prisma.checkIn.create({
      data: {
        userId,
        date: checkDate,
        streakDay,
        bonusCoins,
      },
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        coins: { increment: 10 + bonusCoins },
        totalStars: { increment: 1 },
      },
    })

    return NextResponse.json(checkIn, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const checkIns = await prisma.checkIn.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 30,
    })

    return NextResponse.json(checkIns)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
