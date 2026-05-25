'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Utensils, ChevronLeft, ChevronRight, RefreshCw, Heart, Check, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useBreakfastStore } from '@/store/useBreakfastStore'
import { BREAKFAST_MENU, BREAKFAST_ALTERNATIVES } from '@/types/breakfast'
import { formatDate, getWeekDayName } from '@/lib/utils'

export default function BreakfastPage() {
  const { breakfastPlan, selectedDate, setSelectedDate, generateBreakfastPlan, completeBreakfast, toggleFavorite, replaceBreakfast, getShoppingList } = useBreakfastStore()
  const [mounted, setMounted] = useState(false)
  const [shoppingListOpen, setShoppingListOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    generateBreakfastPlan()
  }, [generateBreakfastPlan])

  if (!mounted) {
    return null
  }

  const handleDateChange = (days: number) => {
    const newDate = new Date(selectedDate)
    newDate.setDate(newDate.getDate() + days)
    setSelectedDate(newDate)
    generateBreakfastPlan()
  }

  const handleReplace = (dayIndex: number) => {
    const alternatives = BREAKFAST_ALTERNATIVES
    const randomAlternative = alternatives[Math.floor(Math.random() * alternatives.length)]
    replaceBreakfast(dayIndex, randomAlternative)
  }

  const shoppingList = getShoppingList()

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
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-warm-600" />
                  <span>早餐计划</span>
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDateChange(-1)}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="text-center min-w-[120px]">
                    <div className="text-sm text-gray-600">{getWeekDayName(selectedDate.getDay())}</div>
                    <div className="font-semibold text-gray-800">{formatDate(selectedDate)}</div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleDateChange(1)}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Dialog open={shoppingListOpen} onOpenChange={setShoppingListOpen}>
            <DialogTrigger asChild>
              <Button className="w-full bg-warm-500 hover:bg-warm-600">
                <ShoppingCart className="h-4 w-4 mr-2" />
                采购清单
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>采购清单</DialogTitle>
              </DialogHeader>
              <div className="space-y-2">
                {shoppingList.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <div className="space-y-4">
            {Object.entries(BREAKFAST_MENU).map(([key, day], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card
                  className={`border-2 transition-all ${
                    breakfastPlan[index]?.completed
                      ? 'bg-growth-50 border-growth-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{getWeekDayName(parseInt(key))}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleReplace(index)}
                          className="rounded-full"
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => toggleFavorite(index)}
                          className={`rounded-full ${
                            breakfastPlan[index]?.favorite ? 'text-red-500' : ''
                          }`}
                        >
                          <Heart className={`h-4 w-4 ${breakfastPlan[index]?.favorite ? 'fill-current' : ''}`} />
                        </Button>
                        {breakfastPlan[index]?.completed ? (
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => completeBreakfast(index, false)}
                            className="rounded-full border-growth-300 text-growth-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            onClick={() => completeBreakfast(index, true)}
                            className="rounded-full bg-growth-500 hover:bg-growth-600"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <span>•</span>
                        <span>{day.mainDish}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <span>•</span>
                        <span>{day.sideDish}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <span>•</span>
                        <span>{day.drink}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-700">
                        <span>•</span>
                        <span>{day.fruit}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
