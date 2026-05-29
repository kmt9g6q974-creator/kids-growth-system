"use client";

"use client";

"use client";

'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Lock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { mockBadges } from '@/data/mock'

export default function BadgesPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const unlockedBadges = mockBadges.filter(b => true)
  const lockedBadges = mockBadges.filter(b => false)

  const achievements = unlockedBadges.filter(b => b.category === 'ACHIEVEMENT')
  const habits = unlockedBadges.filter(b => b.category === 'HABIT')
  const learning = unlockedBadges.filter(b => b.category === 'LEARNING')

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
                <Award className="h-5 w-5 text-warm-600" />
                <span>勋章成就</span>
              </CardTitle>
            </CardHeader>
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
                {unlockedBadges.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-warm-200 bg-white/80 backdrop-blur">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="text-5xl">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                          <div className="flex items-center justify-center space-x-2">
                            <span className="text-xs text-warm-600">+{badge.points} 积分</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="achievement" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-warm-200 bg-white/80 backdrop-blur">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="text-5xl">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="habit" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {habits.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-warm-200 bg-white/80 backdrop-blur">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="text-5xl">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="learning" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {learning.map((badge, index) => (
                  <motion.div
                    key={badge.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="border-warm-200 bg-white/80 backdrop-blur">
                      <CardContent className="pt-6">
                        <div className="text-center space-y-3">
                          <div className="text-5xl">{badge.icon}</div>
                          <h3 className="font-semibold text-gray-800">{badge.name}</h3>
                          <p className="text-sm text-gray-600">{badge.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
