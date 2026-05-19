'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Eye, Clock, TrendingUp, BookOpen, Award, Settings, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserStore } from '@/store/useUserStore'

export default function ParentPage() {
  const { user, toggleParentMode } = useUserStore()
  const [mounted, setMounted] = useState(false)
  const [pin, setPin] = useState('')
  const [isVerified, setIsVerified] = useState(false)
  const [showPinDialog, setShowPinDialog] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handlePinVerify = () => {
    if (pin === '1234') {
      setIsVerified(true)
      setShowPinDialog(false)
    } else {
      alert('PIN码错误')
    }
  }

  if (!isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full px-4"
        >
          <Card className="border-blue-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-20 h-20 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">家长模式</h1>
                  <p className="text-gray-600 mt-2">请输入PIN码进入家长控制面板</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pin">PIN码</Label>
                  <Input
                    id="pin"
                    type="password"
                    placeholder="请输入4位PIN码"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    maxLength={4}
                    className="text-center text-2xl tracking-widest h-14"
                  />
                </div>
                <Button
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                  onClick={handlePinVerify}
                >
                  验证
                </Button>
              </div>
              <p className="text-center text-sm text-gray-500">
                默认PIN码：1234
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  const stats = [
    {
      title: '本周完成率',
      value: '87%',
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: '平均学习时长',
      value: '2.5小时',
      icon: Clock,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: '阅读总量',
      value: '420分钟',
      icon: BookOpen,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pt-6 space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">家长控制面板</h1>
                <p className="text-sm text-gray-600">监督孩子的学习进度</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="border-2 border-gray-200"
              onClick={() => {
                setIsVerified(false)
                toggleParentMode()
              }}
            >
              <Lock className="h-4 w-4 mr-2" />
              退出
            </Button>
          </div>

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
                  <Card className="border-blue-200 bg-white/80 backdrop-blur">
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

          <Card className="border-blue-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>本周活动概览</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {[
                  { activity: '完成数学练习', count: 5, status: 'excellent' },
                  { activity: '英语打卡', count: 7, status: 'excellent' },
                  { activity: '阅读任务', count: 6, status: 'good' },
                  { activity: '按时睡觉', count: 5, status: 'good' },
                ].map((item, index) => (
                  <motion.div
                    key={item.activity}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-xl"
                  >
                    <span className="text-gray-800">{item.activity}</span>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">{item.count}次</span>
                      <div
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'excellent'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {item.status === 'excellent' ? '优秀' : '良好'}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>学习建议</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                <div className="flex items-start space-x-3">
                  <Eye className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">睡眠时间</h4>
                    <p className="text-sm text-gray-600">
                      本周有2天未按时睡觉，建议调整作息时间
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                <div className="flex items-start space-x-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-1">学习进步</h4>
                    <p className="text-sm text-gray-600">
                      数学练习完成率提升了15%，继续保持！
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle>快速操作</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full h-12 justify-start border-2 border-gray-200">
                <Settings className="h-4 w-4 mr-3" />
                修改作息时间
              </Button>
              <Button variant="outline" className="w-full h-12 justify-start border-2 border-gray-200">
                <Award className="h-4 w-4 mr-3" />
                设置奖励规则
              </Button>
              <Button variant="outline" className="w-full h-12 justify-start border-2 border-gray-200">
                <Clock className="h-4 w-4 mr-3" />
                查看详细报告
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
