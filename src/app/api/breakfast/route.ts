import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BREAKFAST_MENU } from '@/types/breakfast'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    let plans = await prisma.breakfastPlan.findMany({
      where: { userId },
      orderBy: { weekDay: 'asc' },
    })

    if (plans.length === 0) {
      plans = await Promise.all(
        Object.entries(BREAKFAST_MENU).map(([weekDay, menu]) =>
          prisma.breakfastPlan.create({
            data: {
              userId,
              weekDay: parseInt(weekDay),
              mainDish: menu.mainDish,
              sideDish: menu.sideDish,
              drink: menu.drink,
              fruit: menu.fruit,
              isFavorite: false,
              completed: false,
            },
          })
        )
      )
    }

    return NextResponse.json(plans)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, completed, isFavorite, mainDish, sideDish, drink, fruit } = body

    const plan = await prisma.breakfastPlan.update({
      where: { id: planId },
      data: {
        ...(completed !== undefined && { completed, completedAt: completed ? new Date() : null }),
        ...(isFavorite !== undefined && { isFavorite }),
        ...(mainDish && { mainDish }),
        ...(sideDish && { sideDish }),
        ...(drink && { drink }),
        ...(fruit && { fruit }),
      },
    })

    return NextResponse.json(plan)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
