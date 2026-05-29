export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, bookTitle, minutes, pages } = body

    const readingRecord = await prisma.readingRecord.create({
      data: {
        userId,
        bookTitle,
        minutes,
        pages,
        date: new Date(),
      },
    })

    await prisma.user.update({
      where: { id: userId },
      data: {
        coins: { increment: Math.floor(minutes / 10) },
        experience: { increment: Math.floor(minutes / 10) },
      },
    })

    return NextResponse.json(readingRecord, { status: 201 })
  } catch (error) {
    console.error('Error creating reading record:', error)
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

    const readingRecords = await prisma.readingRecord.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 50,
    })

    return NextResponse.json(readingRecords)
  } catch (error) {
    console.error('Error fetching reading records:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
