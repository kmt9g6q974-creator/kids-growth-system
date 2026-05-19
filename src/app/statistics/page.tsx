'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, BookOpen, Languages, Calculator, Moon, Award } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function StatisticsPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const weeklyData = [
    { day: '周一', completion: 85, points: 120 },
    { day: '周二', completion: 92, points: 145 },
    { day: '周三', completion: 78, points: 110 },
    { day: '周四', completion: 95, points: 150 },
    { day: '周五', completion: 88, points: 135 },
    { day: '周六', completion: 90, points: 140 },
    { day: '周日', completion: 82, points: 125 },
  ]

  const monthlyData = [
    { week: '第1周', completion: 85 },
    { week: '第2周', completion: 88 },
    { week: '第3周', completion: 92 },
    { week: '第4周', completion: 90 },
  ]

  const stats = [
    {
      title: '周完成率',
      value: '87%',
      icon: TrendingUp,
      color: 'text-growth-600',
      bgColor: 'bg-growth-100',
    },
    {
      title: '阅读时长',
      value: '420分钟',
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: '英语打卡',
      value: '28次',
      icon: Languages,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: '数学完成',
      value: '92%',
      icon: Calculator,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: '睡眠规律',
      value: '95%',
      icon: Moon,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: '获得勋章',
      value: '12个',
      icon: Award,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-orange-50 to-growth-50">
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-6 space-y-6"
        >
          <h1 className="text-2xl font-bold text-gray-800">数据统计</h1>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="border-warm-200 bg-white/80 backdrop-blur">
                    <CardContent className="pt-6">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-xl ${stat.bgColor}`}>
                          <Icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        <span className="text-sm text-gray-600">{stat.title}</span>
                      </div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>周完成率趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#22c55e" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>月度趋势</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    stroke="#f97316" 
                    strokeWidth={3}
                    dot={{ fill: '#f97316', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="weekly">周数据</TabsTrigger>
              <TabsTrigger value="monthly">月数据</TabsTrigger>
            </TabsList>
            <TabsContent value="weekly" className="space-y-4">
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle>本周积分</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="points" fill="#eab308" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="monthly" className="space-y-4">
              <Card className="border-warm-200 bg-white/80 backdrop-blur">
                <CardHeader>
                  <CardTitle>本月完成率</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="completion" 
                        stroke="#22c55e" 
                        strokeWidth={3}
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 6 }}
                      />
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
