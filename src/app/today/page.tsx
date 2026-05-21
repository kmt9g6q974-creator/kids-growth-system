'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useTaskStore } from '@/store/useTaskStore'
import { useUserStore } from '@/store/useUserStore'
import { formatDate, getWeekDayName } from '@/lib/utils'

export default function TodayPage() {
  const { todaySchedule, selectedDate, setSelectedDate, generateTodaySchedule, updateTaskCompletion } = useTaskStore()
  const { updateCoins, updateExperience } = useUserStore()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    generateTodaySchedule()
  }, [generateTodaySchedule])

  if (!mounted) {
    return null
  }

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
    generateTodaySchedule()
  }

  const handleTaskToggle = (taskType: string, completed: boolean, points: number) => {
    updateTaskCompletion(taskType, completed)
    if (completed) {
      updateCoins(points)
      updateExperience(points)
    }
  }

  const completedCount = todaySchedule.filter(t => t.completed).length
  const completionRate = todaySchedule.length > 0 ? (completedCount / todaySchedule.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-orange-50 to-growth-50">
      <div className="max-w-4xl mx-auto px-4 pb-24 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-warm-600" />
                  <span>今日计划</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDateChange(-1)}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center min-w-[120px]">
                    <div className="text-sm text-gray-600">{getWeekDayName(selectedDate.getDay())}</div>
                    <div className="font-semibold text-gray-800">{formatDate(selectedDate)}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDateChange(1)}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-gray-600">
                  已完成 {completedCount} / {todaySchedule.length} 项任务
                </span>
                <span className="text-2xl font-bold text-growth-600">
                  {Math.round(completionRate)}%
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {todaySchedule.map((task, index) => (
              <motion.div
                key={task.taskType}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`border-2 transition-all ${
                    task.completed
                      ? 'bg-growth-50 border-growth-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-warm-100">
                          <span className="text-2xl">{task.icon}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{task.title}</h3>
                          <p className="text-sm text-gray-600">{task.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-warm-600">+{task.points}</span>
                        {task.completed ? (
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => handleTaskToggle(task.taskType, false, task.points)}
                            className="rounded-full h-10 w-10 border-growth-300 text-growth-600 hover:bg-growth-100"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            onClick={() => handleTaskToggle(task.taskType, true, task.points)}
                            className="rounded-full h-10 w-10 bg-growth-500 hover:bg-growth-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
