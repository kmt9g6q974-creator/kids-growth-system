'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Clock, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useTaskStore } from '@/store/useTaskStore'
import { useUserStore } from '@/store/useUserStore'
import { cn, formatDate, getWeekDayName } from '@/lib/utils'
import { TaskType } from '@prisma/client'

const iconMap: Record<string, any> = {
  sun: Clock,
  sparkles: Sparkles,
  utensils: Clock,
  'book-open': Clock,
  home: Clock,
  apple: Clock,
  pencil: Clock,
  'utensils-crossed': Clock,
  languages: Clock,
  calculator: Clock,
  'gamepad-2': Clock,
  book: Clock,
  moon: Clock,
}

export default function TodayPage() {
  const { todaySchedule, generateTodaySchedule, updateTaskCompletion } = useTaskStore()
  const { updateCoins, user } = useUserStore()
  const [selectedDate, setSelectedDate] = useState(new Date())
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
  }

  const handleTaskToggle = (taskType: TaskType, completed: boolean, points: number) => {
    updateTaskCompletion(taskType, completed)
    if (completed) {
      updateCoins(points)
    }
  }

  const completedCount = todaySchedule.filter(t => t.completed).length
  const totalCount = todaySchedule.length
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-orange-50 to-growth-50">
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDateChange(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">
                {formatDate(selectedDate)}
              </h1>
              <p className="text-sm text-gray-600">{getWeekDayName(selectedDate.getDay())}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDateChange(1)}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">今日完成度</h2>
                  <p className="text-sm text-gray-600">
                    已完成 {completedCount} / {totalCount} 项任务
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-growth-600">
                    {Math.round(progress)}%
                  </div>
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-growth-400 to-growth-600 rounded-full"
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {todaySchedule.map((task, index) => {
                const Icon = iconMap[task.icon || 'clock'] || Clock
                return (
                  <motion.div
                    key={task.taskType}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card
                      className={cn(
                        "border-2 transition-all cursor-pointer hover:shadow-lg",
                        task.completed
                          ? "bg-growth-50 border-growth-300"
                          : "bg-white border-gray-200"
                      )}
                      onClick={() => handleTaskToggle(task.taskType, !task.completed, task.points)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div
                              className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center transition-all",
                                task.completed
                                  ? "bg-growth-500 text-white"
                                  : "bg-warm-100 text-warm-600"
                              )}
                            >
                              {task.completed ? (
                                <Check className="h-6 w-6" />
                              ) : (
                                <Icon className="h-6 w-6" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-800">{task.title}</h3>
                              {task.description && (
                                <p className="text-sm text-gray-600">{task.description}</p>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-800">
                              {task.time}
                            </div>
                            {task.points > 0 && (
                              <div className="text-xs text-warm-600 font-semibold">
                                +{task.points} 金币
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {completedCount === totalCount && totalCount > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                太棒了！
              </h3>
              <p className="text-gray-600">
                你完成了今天的所有任务！继续保持！
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
