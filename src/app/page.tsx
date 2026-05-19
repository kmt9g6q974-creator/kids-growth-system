'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Home, 
  Calendar, 
  BarChart3, 
  Award, 
  Utensils, 
  Settings,
  Shield,
  Sprout,
  Star,
  Coins,
  Flame
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUserStore } from '@/store/useUserStore'
import { useTaskStore } from '@/store/useTaskStore'
import { cn, calculateLevelProgress, getLevelTitle } from '@/lib/utils'

export default function DashboardPage() {
  const { user, updateCoins } = useUserStore()
  const { todaySchedule, generateTodaySchedule } = useTaskStore()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    setMounted(true)
    generateTodaySchedule()
  }, [generateTodaySchedule])

  if (!mounted) {
    return null
  }

  const completedTasks = todaySchedule.filter(t => t.completed).length
  const totalTasks = todaySchedule.length
  const completionRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  const mockUser = user || {
    name: '小明',
    level: 5,
    experience: 350,
    coins: 150,
    totalStars: 28,
  }

  const levelProgress = calculateLevelProgress(mockUser.experience, mockUser.level)

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
            <div className="flex items-center space-x-4">
              <Avatar className="h-14 w-14 border-4 border-warm-300">
                <AvatarFallback className="bg-warm-400 text-white text-xl">
                  {mockUser.name[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  你好，{mockUser.name}！
                </h1>
                <p className="text-sm text-gray-600">
                  {getLevelTitle(mockUser.level)} · Lv.{mockUser.level}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-1.5 rounded-full">
                <Coins className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-semibold text-yellow-700">{mockUser.coins}</span>
              </div>
              <div className="flex items-center space-x-1 bg-orange-100 px-3 py-1.5 rounded-full">
                <Star className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">{mockUser.totalStars}</span>
              </div>
            </div>
          </div>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sprout className="h-5 w-5 text-growth-600" />
                <span>成长进度</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">经验值</span>
                  <span className="font-semibold text-gray-800">
                    {mockUser.experience} / {mockUser.level * 100}
                  </span>
                </div>
                <Progress value={levelProgress} className="h-3" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-orange-500" />
                  <span className="text-gray-600">连续打卡</span>
                </div>
                <span className="font-semibold text-orange-600">7 天</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-warm-600" />
                <span>今日进度</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-600">
                  已完成 {completedTasks} / {totalTasks} 项任务
                </span>
                <span className="text-2xl font-bold text-growth-600">
                  {Math.round(completionRate)}%
                </span>
              </div>
              <Progress value={completionRate} className="h-4" />
              <div className="mt-4 grid grid-cols-2 gap-3">
                {todaySchedule.slice(0, 4).map((task, index) => (
                  <motion.div
                    key={task.taskType}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all",
                      task.completed
                        ? "bg-growth-50 border-growth-300"
                        : "bg-white border-gray-200"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            task.completed ? "bg-growth-500" : "bg-gray-300"
                          )}
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {task.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">{task.time}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-gradient-to-br from-warm-100 to-orange-100">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">🌳</div>
                <h3 className="text-lg font-semibold text-gray-800">你的成长树</h3>
                <p className="text-sm text-gray-600">
                  完成更多任务，让小树茁壮成长！
                </p>
                <Button className="mt-4 bg-warm-500 hover:bg-warm-600">
                  查看详情
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 px-4 py-2 safe-area-bottom"
      >
        <div className="max-w-4xl mx-auto flex justify-around">
          {[
            { id: 'dashboard', icon: Home, label: '首页' },
            { id: 'today', icon: Calendar, label: '今日' },
            { id: 'stats', icon: BarChart3, label: '统计' },
            { id: 'badges', icon: Award, label: '成长' },
            { id: 'breakfast', icon: Utensils, label: '早餐' },
            { id: 'settings', icon: Settings, label: '设置' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all",
                activeTab === item.id
                  ? "bg-warm-100 text-warm-700"
                  : "text-gray-500 hover:text-gray-700"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.nav>
    </div>
  )
}
