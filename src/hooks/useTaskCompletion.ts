import { useEffect, useState } from 'react'
import { useTaskStore } from '@/store/useTaskStore'
import { useUserStore } from '@/store/useUserStore'

export function useTaskCompletion() {
  const { todaySchedule, updateTaskCompletion } = useTaskStore()
  const { updateCoins, updateExperience } = useUserStore()
  const [completedCount, setCompletedCount] = useState(0)

  useEffect(() => {
    const count = todaySchedule.filter(t => t.completed).length
    setCompletedCount(count)
  }, [todaySchedule])

  const handleCompleteTask = (taskType: string, points: number) => {
    updateTaskCompletion(taskType, true)
    updateCoins(points)
    updateExperience(points)
  }

  const handleUncompleteTask = (taskType: string, points: number) => {
    updateTaskCompletion(taskType, false)
    updateCoins(-points)
    updateExperience(-points)
  }

  const completionRate = todaySchedule.length > 0 
    ? (completedCount / todaySchedule.length) * 100 
    : 0

  return {
    completedCount,
    totalCount: todaySchedule.length,
    completionRate,
    handleCompleteTask,
    handleUncompleteTask,
  }
}
