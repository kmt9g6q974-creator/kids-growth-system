import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, date, bookTitle, pages, minutes, completed } = body

    const record = await prisma.readingRecord.create({
      data: {
        userId,
        date: new Date(date),
        bookTitle,
        pages,
        minutes,
        completed,
      },
    })

    if (completed) {
      await prisma.user.update({
        where: { id: userId },
        data: {
          coins: { increment: 15 },
          experience: { increment: 15 },
        },
      })
    }

    return NextResponse.json(record, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 })
    }

    const where: any = { userId }
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      }
    }

    const records = await prisma.readingRecord.findMany({
      where,
      orderBy: { date: 'desc' },
    })

    return NextResponse.json(records)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
