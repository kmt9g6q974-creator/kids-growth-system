'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, TrendingUp, BookOpen, Target, Clock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/store/useUserStore'
import { useRouter } from 'next/navigation'

export default function ParentPage() {
  const { user, parentMode, toggleParentMode } = useUserStore()
  const [mounted, setMounted] = useState(false)
  const [pin, setPin] = useState('')
  const [verified, setVerified] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
    if (parentMode) {
      setVerified(true)
    }
  }, [parentMode])

  if (!mounted) {
    return null
  }

  const handleVerify = () => {
    if (pin === '1234') {
      setVerified(true)
      toggleParentMode()
    } else {
      alert('PIN码错误')
      setPin('')
    }
  }

  const handleExit = () => {
    setVerified(false)
    setPin('')
    toggleParentMode()
    router.push('/')
  }

  if (!verified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-50 via-orange-50 to-growth-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-md px-4"
        >
          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center justify-center space-x-2">
                <Shield className="h-5 w-5 text-warm-600" />
                <span>家长模式验证</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center text-sm text-gray-600">
                请输入PIN码进入家长模式
              </div>
              <Input
                type="password"
                placeholder="输入PIN码"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={4}
                className="text-center text-2xl tracking-widest"
              />
              <Button onClick={handleVerify} className="w-full bg-warm-500 hover:bg-warm-600">
                验证
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                返回
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-orange-50 to-growth-50">
      <div className="max-w-4xl mx-auto px-4 pb-24 pt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <Card className="border-warm-200 bg-white/80 backdrop-blur flex-1">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-warm-600" />
                  <span>家长模式</span>
                </CardTitle>
              </CardHeader>
            </Card>
            <Button
              onClick={handleExit}
              variant="outline"
              className="ml-4 rounded-full"
            >
              <Lock className="h-4 w-4 mr-2" />
              退出
            </Button>
          </div>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">学习进度概览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Target className="h-5 w-5 text-growth-600" />
                  <span className="text-sm text-gray-700">本周完成率</span>
                </div>
                <span className="text-2xl font-bold text-growth-600">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="h-5 w-5 text-warm-600" />
                  <span className="text-sm text-gray-700">阅读时长</span>
                </div>
                <span className="text-2xl font-bold text-warm-600">420分钟</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-star-600" />
                  <span className="text-sm text-gray-700">连续打卡</span>
                </div>
                <span className="text-2xl font-bold text-star-600">7天</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">活动统计</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-700">英语打卡</span>
                <span className="font-semibold text-gray-800">28次</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-700">数学练习</span>
                <span className="font-semibold text-gray-800">92%完成率</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm text-gray-700">睡眠规律</span>
                <span className="font-semibold text-gray-800">95%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">学习建议</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-growth-50 border-2 border-growth-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  孩子的阅读习惯很好，建议继续保持每天30分钟的阅读时间。
                </p>
              </div>
              <div className="p-3 bg-warm-50 border-2 border-warm-200 rounded-xl">
                <p className="text-sm text-gray-700">
                  可以适当增加数学练习的趣味性，提高孩子的学习兴趣。
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full rounded-full">
                查看详细报告
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                调整任务难度
              </Button>
              <Button variant="outline" className="w-full rounded-full">
                设置奖励规则
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
