'use client'

import { useMemo } from 'react'
import { useTaskStore } from '@/store/useTaskStore'

export function useStreak() {
  const { todaySchedule } = useTaskStore()

  const streakData = useMemo(() => {
    const completedTasks = todaySchedule.filter(t => t.completed)
    const currentStreak = completedTasks.length
    
    const streakBonus = currentStreak >= 7 
      ? Math.floor(currentStreak / 7) * 10 
      : 0

    return {
      currentStreak,
      streakBonus,
      isStreakActive: currentStreak > 0,
      nextBonusAt: currentStreak >= 7 
        ? ((Math.floor(currentStreak / 7) + 1) * 7) 
        : 7,
    }
  }, [todaySchedule])

  return streakData
}
