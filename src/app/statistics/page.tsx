'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart3, TrendingUp, BookOpen, Target, Clock, Moon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'
import { mockStatistics } from '@/data/mock'

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const stats = mockStatistics

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
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-warm-600" />
                <span>数据统计</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-growth-600" />
                    <span className="text-sm text-gray-600">周完成率</span>
                  </div>
                  <div className="text-3xl font-bold text-growth-600">
                    {stats.weeklyCompletionRate}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <BookOpen className="h-4 w-4 text-warm-600" />
                    <span className="text-sm text-gray-600">阅读时长</span>
                  </div>
                  <div className="text-3xl font-bold text-warm-600">
                    {stats.totalReadingMinutes}
                  </div>
                  <div className="text-xs text-gray-500">分钟</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <Target className="h-4 w-4 text-star-600" />
                    <span className="text-sm text-gray-600">英语打卡</span>
                  </div>
                  <div className="text-3xl font-bold text-star-600">
                    {stats.englishCheckInCount}
                  </div>
                  <div className="text-xs text-gray-500">次</div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-4 w-4 text-growth-600" />
                    <span className="text-sm text-gray-600">数学完成</span>
                  </div>
                  <div className="text-3xl font-bold text-growth-600">
                    {stats.mathCompletionRate}%
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-warm-600" />
                <span>睡眠规律</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">睡眠规律度</span>
                <span className="text-3xl font-bold text-warm-600">{stats.sleepRegularity}%</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">周趋势</TabsTrigger>
              <TabsTrigger value="monthly">月趋势</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="space-y-4">
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={stats.weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completionRate" fill="#f97316" name="完成率(%)" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4">
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={stats.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completionRate" stroke="#f97316" name="完成率(%)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
