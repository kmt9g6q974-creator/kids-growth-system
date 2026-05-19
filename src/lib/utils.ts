import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export function getWeekDay(date: Date): number {
  return date.getDay()
}

export function getWeekDayName(day: number): string {
  const days = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  return days[day]
}

export function calculateLevelProgress(experience: number, level: number): number {
  const experienceToNext = level * 100
  return (experience / experienceToNext) * 100
}

export function getLevelTitle(level: number): string {
  if (level < 5) return '成长幼苗'
  if (level < 10) return '茁壮小树'
  if (level < 20) return '活力树苗'
  if (level < 30) return '成长之树'
  if (level < 50) return '智慧之树'
  if (level < 70) return '卓越之树'
  if (level < 90) return '传奇之树'
  return '成长大师'
}
