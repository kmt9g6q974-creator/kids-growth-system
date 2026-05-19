import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        dailyTasks: true,
        checkIns: true,
        rewards: true,
        badges: {
          include: {
            badge: true,
          },
        },
        breakfastPlans: true,
        readingRecords: true,
        streaks: true,
        growthTree: true,
        pets: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, age, avatar, parentPin } = body

    const user = await prisma.user.create({
      data: {
        name,
        age,
        avatar,
        parentPin,
        level: 1,
        experience: 0,
        coins: 0,
        totalStars: 0,
        parentMode: false,
        growthTree: {
          create: {
            level: 1,
            experience: 0,
            health: 100,
            unlockedFeatures: [],
          },
        },
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, ...updateData } = body

    const user = await prisma.user.update({
      where: { id: userId },
      data: updateData,
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
