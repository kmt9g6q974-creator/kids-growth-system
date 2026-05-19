'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Heart, RefreshCw, ShoppingCart, Check, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useBreakfastStore } from '@/store/useBreakfastStore'
import { cn, getWeekDayName } from '@/lib/utils'
import { BREAKFAST_MENU, BREAKFAST_ALTERNATIVES } from '@/types/breakfast'

export default function BreakfastPage() {
  const { plans, selectedWeekDay, setSelectedWeekDay, completeBreakfast, toggleFavorite, replaceBreakfast, getShoppingList } = useBreakfastStore()
  const [mounted, setMounted] = useState(false)
  const [shoppingListOpen, setShoppingListOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    setSelectedWeekDay(new Date().getDay())
  }, [setSelectedWeekDay])

  if (!mounted) {
    return null
  }

  const handleDayChange = (direction: number) => {
    const newDay = (selectedWeekDay + direction + 7) % 7
    setSelectedWeekDay(newDay)
  }

  const currentPlan = plans.find(p => p.weekDay === selectedWeekDay) || {
    mainDish: BREAKFAST_MENU[selectedWeekDay]?.mainDish || '',
    sideDish: BREAKFAST_MENU[selectedWeekDay]?.sideDish || '',
    drink: BREAKFAST_MENU[selectedWeekDay]?.drink || '',
    fruit: BREAKFAST_MENU[selectedWeekDay]?.fruit || '',
    isFavorite: false,
    completed: false,
  }

  const shoppingList = getShoppingList()

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
              onClick={() => handleDayChange(-1)}
              className="rounded-full"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div className="text-center">
              <h1 className="text-xl font-bold text-gray-800">
                {getWeekDayName(selectedWeekDay)}早餐
              </h1>
              <p className="text-sm text-gray-600">营养均衡，开启美好一天</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDayChange(1)}
              className="rounded-full"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <Card className="border-warm-200 bg-white/80 backdrop-blur">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center justify-between p-4 bg-warm-50 rounded-2xl border-2 border-warm-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🍳</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">主食</h3>
                      <p className="text-sm text-gray-600">{currentPlan.mainDish}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => replaceBreakfast(selectedWeekDay)}
                    className="rounded-full"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-2xl border-2 border-orange-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🥚</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">配菜</h3>
                      <p className="text-sm text-gray-600">{currentPlan.sideDish}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => replaceBreakfast(selectedWeekDay)}
                    className="rounded-full"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 bg-blue-50 rounded-2xl border-2 border-blue-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🥛</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">饮品</h3>
                      <p className="text-sm text-gray-600">{currentPlan.drink}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => replaceBreakfast(selectedWeekDay)}
                    className="rounded-full"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border-2 border-green-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🍎</div>
                    <div>
                      <h3 className="font-semibold text-gray-800">水果</h3>
                      <p className="text-sm text-gray-600">{currentPlan.fruit}</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => replaceBreakfast(selectedWeekDay)}
                    className="rounded-full"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>

          <div className="flex space-x-3">
            <Button
              className={cn(
                "flex-1 h-14 text-lg",
                currentPlan.completed
                  ? "bg-growth-500 hover:bg-growth-600"
                  : "bg-warm-500 hover:bg-warm-600"
              )}
              onClick={() => completeBreakfast(selectedWeekDay)}
            >
              {currentPlan.completed ? (
                <>
                  <Check className="h-5 w-5 mr-2" />
                  已完成
                </>
              ) : (
                '完成打卡'
              )}
            </Button>
            <Button
              variant="outline"
              className={cn(
                "h-14 px-6 border-2",
                currentPlan.isFavorite
                  ? "border-red-400 text-red-600 bg-red-50"
                  : "border-gray-200"
              )}
              onClick={() => toggleFavorite(selectedWeekDay)}
            >
              <Heart
                className={cn(
                  "h-5 w-5",
                  currentPlan.isFavorite && "fill-current"
                )}
              />
            </Button>
            <Dialog open={shoppingListOpen} onOpenChange={setShoppingListOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-14 px-6 border-2 border-gray-200">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>采购清单</DialogTitle>
                </DialogHeader>
                <div className="space-y-2">
                  {shoppingList.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl"
                    >
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-gray-800">{item}</span>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <Card className="border-warm-200 bg-gradient-to-br from-yellow-100 to-orange-100">
            <CardHeader>
              <CardTitle className="text-lg">本周早餐计划</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }).map((_, index) => {
                  const dayPlan = plans.find(p => p.weekDay === index)
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedWeekDay(index)}
                      className={cn(
                        "p-2 rounded-xl text-center cursor-pointer transition-all",
                        selectedWeekDay === index
                          ? "bg-warm-500 text-white"
                          : "bg-white/50 hover:bg-white"
                      )}
                    >
                      <div className="text-xs mb-1">{getWeekDayName(index)}</div>
                      <div className="text-lg">
                        {dayPlan?.completed ? '✅' : '🍽️'}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
