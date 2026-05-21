import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { BREAKFAST_MENU } from '@/types/breakfast'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const date = searchParams.get('date')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const breakfastPlans = await prisma.breakfastPlan.findMany({
      where: {
        userId,
      },
    })

    if (breakfastPlans.length === 0) {
      return NextResponse.json(BREAKFAST_MENU)
    }

    return NextResponse.json(breakfastPlans)
  } catch (error) {
    console.error('Error fetching breakfast plans:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, weekDay, completed, isFavorite, mainDish, sideDish, drink, fruit } = body

    const existingPlan = await prisma.breakfastPlan.findFirst({
      where: {
        userId,
        weekDay,
      },
    })

    let plan
    if (existingPlan) {
      plan = await prisma.breakfastPlan.update({
        where: { id: existingPlan.id },
        data: {
          completed: completed !== undefined ? completed : existingPlan.completed,
          isFavorite: isFavorite !== undefined ? isFavorite : existingPlan.isFavorite,
          mainDish: mainDish || existingPlan.mainDish,
          sideDish: sideDish || existingPlan.sideDish,
          drink: drink || existingPlan.drink,
          fruit: fruit || existingPlan.fruit,
        },
      })
    } else {
      plan = await prisma.breakfastPlan.create({
        data: {
          userId,
          weekDay,
          completed: completed || false,
          isFavorite: isFavorite || false,
          mainDish: mainDish || '',
          sideDish: sideDish || '',
          drink: drink || '',
          fruit: fruit || '',
        },
      })
    }

    return NextResponse.json(plan)
  } catch (error) {
    console.error('Error updating breakfast plan:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
