'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Settings, Bell, Moon, Volume2, Shield, User, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useUserStore } from '@/store/useUserStore'

export default function SettingsPage() {
  const { user, toggleParentMode } = useUserStore()
  const [mounted, setMounted] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(false)
  const [soundEffects, setSoundEffects] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const mockUser = user || {
    name: '小明',
    level: 5,
    coins: 150,
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
          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-warm-600" />
                <span>设置</span>
              </CardTitle>
            </CardHeader>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16 border-4 border-warm-300">
                  <AvatarFallback className="bg-warm-400 text-white text-2xl">
                    {mockUser.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{mockUser.name}</h3>
                  <p className="text-sm text-gray-600">等级 {mockUser.level} · {mockUser.coins} 金币</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">通用设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">通知提醒</span>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Moon className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">深色模式</span>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Volume2 className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">音效</span>
                </div>
                <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">家长模式</CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={toggleParentMode}
                variant="outline"
                className="w-full rounded-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                {user?.parentMode ? '退出家长模式' : '进入家长模式'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardHeader>
              <CardTitle className="text-lg">关于</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-3">
                <Info className="h-5 w-5 text-gray-600" />
                <div className="text-sm text-gray-700">
                  <div>成长小树 v1.0.0</div>
                  <div className="text-xs text-gray-500">儿童学习成长管理系统</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
