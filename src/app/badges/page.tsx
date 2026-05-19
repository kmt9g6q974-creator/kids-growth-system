'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Lock, Star, Trophy, Target, Zap, Heart, Book, Flame } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

interface Badge {
  id: string
  name: string
  description: string
  icon: any
  unlocked: boolean
  progress: number
  target: number
  category: string
}

export default function BadgesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const badges: Badge[] = [
    {
      id: 'first-checkin',
      name: '初次打卡',
      description: '完成第一次任务打卡',
      icon: Star,
      unlocked: true,
      progress: 1,
      target: 1,
      category: 'achievement',
    },
    {
      id: 'week-streak',
      name: '一周坚持',
      description: '连续7天完成任务',
      icon: Flame,
      unlocked: true,
      progress: 7,
      target: 7,
      category: 'habit',
    },
    {
      id: 'month-streak',
      name: '一月坚持',
      description: '连续30天完成任务',
      icon: Trophy,
      unlocked: false,
      progress: 15,
      target: 30,
      category: 'habit',
    },
    {
      id: 'reading-master',
      name: '阅读达人',
      description: '累计阅读1000分钟',
      icon: Book,
      unlocked: false,
      progress: 420,
      target: 1000,
      category: 'learning',
    },
    {
      id: 'english-expert',
      name: '英语专家',
      description: '完成50次英语打卡',
      icon: Target,
      unlocked: false,
      progress: 28,
      target: 50,
      category: 'learning',
    },
    {
      id: 'math-genius',
      name: '数学天才',
      description: '完成100次数学练习',
      icon: Zap,
      unlocked: false,
      progress: 45,
      target: 100,
      category: 'learning',
    },
    {
      id: 'early-bird',
      name: '早起鸟',
      description: '连续7天按时起床',
      icon: Star,
      unlocked: true,
      progress: 7,
      target: 7,
      category: 'habit',
    },
    {
      id: 'sleep-master',
      name: '睡眠大师',
      description: '连续7天按时睡觉',
      icon: Heart,
      unlocked: false,
      progress: 5,
      target: 7,
      category: 'habit',
    },
    {
      id: 'breakfast-lover',
      name: '早餐爱好者',
      description: '完成30次早餐打卡',
      icon: Heart,
      unlocked: false,
      progress: 18,
      target: 30,
      category: 'habit',
    },
  ]

  const unlockedBadges = badges.filter(b => b.unlocked)
  const lockedBadges = badges.filter(b => !b.unlocked)

  const categoryBadges = {
    achievement: badges.filter(b => b.category === 'achievement'),
    habit: badges.filter(b => b.category === 'habit'),
    learning: badges.filter(b => b.category === 'learning'),
  }

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
            <h1 className="text-2xl font-bold text-gray-800">成长勋章</h1>
            <div className="flex items-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
              <Award className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-700">{unlockedBadges.length} / {badges.length}</span>
            </div>
          </div>

          <Card className="border-warm-200 bg-gradient-to-br from-yellow-100 to-orange-100">
            <CardContent className="pt-6">
              <div className="text-center space-y-2">
                <div className="text-5xl mb-2">🏆</div>
                <h3 className="text-xl font-bold text-gray-800">继续努力！</h3>
                <p className="text-gray-600">
                  已解锁 {unlockedBadges.length} 个勋章，还有 {lockedBadges.length} 个等待解锁
                </p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">全部</TabsTrigger>
              <TabsTrigger value="achievement">成就</TabsTrigger>
              <TabsTrigger value="habit">习惯</TabsTrigger>
              <TabsTrigger value="learning">学习</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {badges.map((badge, index) => (
                  <BadgeCard key={badge.id} badge={badge} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievement" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {categoryBadges.achievement.map((badge, index) => (
                  <BadgeCard key={badge.id} badge={badge} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="habit" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {categoryBadges.habit.map((badge, index) => (
                  <BadgeCard key={badge.id} badge={badge} index={index} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {categoryBadges.learning.map((badge, index) => (
                  <BadgeCard key={badge.id} badge={badge} index={index} />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}

function BadgeCard({ badge, index }: { badge: Badge, index: number }) {
  const Icon = badge.unlocked ? badge.icon : Lock

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={`border-2 transition-all hover:shadow-lg ${
          badge.unlocked
            ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300'
            : 'bg-white/50 border-gray-200'
        }`}
      >
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-3">
            <div
              className={`p-4 rounded-2xl ${
                badge.unlocked
                  ? 'bg-yellow-400 text-white'
                  : 'bg-gray-200 text-gray-400'
              }`}
            >
              <Icon className="h-8 w-8" />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-gray-800 text-sm">{badge.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{badge.description}</p>
            </div>
            {!badge.unlocked && (
              <div className="w-full space-y-1">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>进度</span>
                  <span>{badge.progress}/{badge.target}</span>
                </div>
                <Progress value={(badge.progress / badge.target) * 100} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
