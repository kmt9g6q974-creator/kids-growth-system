import { TaskType, RewardType, BadgeCategory, PetType } from '@prisma/client'

export interface User {
  id: string
  name: string
  avatar?: string
  age: number
  level: number
  experience: number
  coins: number
  totalStars: number
  parentMode: boolean
  parentPin?: string
  createdAt: Date
  updatedAt: Date
}

export interface DailyTask {
  id: string
  userId: string
  date: Date
  taskType: TaskType
  title: string
  description?: string
  scheduledTime?: string
  completed: boolean
  completedAt?: Date
  points: number
  createdAt: Date
  updatedAt: Date
}

export interface CheckIn {
  id: string
  userId: string
  date: Date
  streakDay: number
  bonusCoins: number
  createdAt: Date
}

export interface Reward {
  id: string
  userId: string
  type: RewardType
  title: string
  description?: string
  points: number
  unlocked: boolean
  unlockedAt?: Date
  createdAt: Date
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: BadgeCategory
  requirement: string
  points: number
  createdAt: Date
}

export interface UserBadge {
  id: string
  userId: string
  badgeId: string
  earnedAt: Date
}

export interface BreakfastPlan {
  id: string
  userId: string
  weekDay: number
  mainDish: string
  sideDish: string
  drink: string
  fruit: string
  isFavorite: boolean
  completed: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface ReadingRecord {
  id: string
  userId: string
  date: Date
  bookTitle: string
  pages: number
  minutes: number
  completed: boolean
  createdAt: Date
}

export interface Streak {
  id: string
  userId: string
  taskType: TaskType
  currentStreak: number
  bestStreak: number
  lastCompletedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface GrowthTree {
  id: string
  userId: string
  level: number
  experience: number
  health: number
  unlockedFeatures: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Pet {
  id: string
  userId: string
  name: string
  type: PetType
  level: number
  experience: number
  happiness: number
  unlocked: boolean
  unlockedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TimelineItem {
  time: string
  title: string
  description?: string
  taskType: TaskType
  completed: boolean
  points: number
  icon?: string
}

export interface DailySchedule {
  date: Date
  timeline: TimelineItem[]
  completionRate: number
  totalPoints: number
  earnedPoints: number
}

export interface StatisticsData {
  weeklyCompletionRate: number
  monthlyCompletionRate: number
  totalReadingMinutes: number
  englishCheckInCount: number
  mathCompletionRate: number
  sleepRegularity: number
  weeklyData: {
    date: string
    completionRate: number
    points: number
  }[]
  monthlyData: {
    date: string
    completionRate: number
    points: number
  }[]
  heatmapData: {
    date: string
    value: number
  }[]
}

export interface LevelProgress {
  currentLevel: number
  currentExperience: number
  experienceToNext: number
  progress: number
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedAt?: Date
  progress: number
  target: number
}
