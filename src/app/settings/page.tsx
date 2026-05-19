'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { User, Bell, Moon, Sun, Shield, LogOut, ChevronRight, Palette } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useUserStore } from '@/store/useUserStore'

export default function SettingsPage() {
  const { user, toggleParentMode } = useUserStore()
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [soundEnabled, setSoundEnabled] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const settings = [
    {
      icon: Bell,
      title: '通知设置',
      description: '管理提醒通知',
      action: (
        <Switch
          checked={notifications}
          onCheckedChange={setNotifications}
        />
      ),
    },
    {
      icon: Palette,
      title: '深色模式',
      description: '切换深色主题',
      action: (
        <Switch
          checked={darkMode}
          onCheckedChange={setDarkMode}
        />
      ),
    },
    {
      icon: Bell,
      title: '音效',
      description: '开启/关闭音效',
      action: (
        <Switch
          checked={soundEnabled}
          onCheckedChange={setSoundEnabled}
        />
      ),
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
          <h1 className="text-2xl font-bold text-gray-800">设置</h1>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full bg-warm-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-warm-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {user?.name || '小明'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    等级 {user?.level || 5} · {user?.experience || 350} 经验
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">通用设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {settings.map((setting, index) => {
                const Icon = setting.icon
                return (
                  <motion.div
                    key={setting.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-xl bg-warm-100">
                          <Icon className="h-5 w-5 text-warm-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{setting.title}</h4>
                          <p className="text-sm text-gray-600">{setting.description}</p>
                        </div>
                      </div>
                      {setting.action}
                    </div>
                    {index < settings.length - 1 && <Separator />}
                  </motion.div>
                )
              })}
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">家长模式</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-blue-100">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">启用家长模式</h4>
                    <p className="text-sm text-gray-600">需要PIN码验证</p>
                  </div>
                </div>
                <Switch
                  checked={user?.parentMode || false}
                  onCheckedChange={toggleParentMode}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">关于</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-3">
                <span className="text-gray-600">版本</span>
                <span className="font-medium text-gray-800">1.0.0</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between p-3">
                <span className="text-gray-600">更新日期</span>
                <span className="font-medium text-gray-800">2024-01</span>
              </div>
            </CardContent>
          </Card>

          <Button
            variant="outline"
            className="w-full h-12 border-2 border-red-200 text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            退出登录
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
