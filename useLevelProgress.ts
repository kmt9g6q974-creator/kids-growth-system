'use client'

import { useMemo } from 'react'
import { useUserStore } from '@/store/useUserStore'
import { calculateLevelProgress, getLevelTitle } from '@/lib/utils'

export function useLevelProgress() {
  const { user } = useUserStore()

  const levelData = useMemo(() => {
    const level = user?.level || 1
    const experience = user?.experience || 0
    const progress = calculateLevelProgress(experience, level)
    const title = getLevelTitle(level)
    const experienceToNext = level * 100

    return {
      level,
      experience,
      progress,
      title,
      experienceToNext,
      remainingExperience: experienceToNext - experience,
    }
  }, [user])

  return levelData
}
