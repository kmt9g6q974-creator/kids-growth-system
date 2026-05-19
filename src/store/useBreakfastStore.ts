import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BreakfastPlan } from '@/types'
import { BREAKFAST_MENU, BREAKFAST_ALTERNATIVES } from '@/types/breakfast'

interface BreakfastState {
  plans: BreakfastPlan[]
  selectedWeekDay: number
  setPlans: (plans: BreakfastPlan[]) => void
  setSelectedWeekDay: (day: number) => void
  completeBreakfast: (weekDay: number) => void
  toggleFavorite: (weekDay: number) => void
  replaceBreakfast: (weekDay: number) => void
  getShoppingList: () => string[]
}

export const useBreakfastStore = create<BreakfastState>()(
  persist(
    (set, get) => ({
      plans: [],
      selectedWeekDay: new Date().getDay(),
      setPlans: (plans) => set({ plans }),
      setSelectedWeekDay: (day) => set({ selectedWeekDay: day }),
      completeBreakfast: (weekDay) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.weekDay === weekDay
              ? { ...plan, completed: true, completedAt: new Date() }
              : plan
          ),
        })),
      toggleFavorite: (weekDay) =>
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.weekDay === weekDay
              ? { ...plan, isFavorite: !plan.isFavorite }
              : plan
          ),
        })),
      replaceBreakfast: (weekDay) => {
        const alternatives = BREAKFAST_ALTERNATIVES
        const randomAlternative =
          alternatives[Math.floor(Math.random() * alternatives.length)]
        set((state) => ({
          plans: state.plans.map((plan) =>
            plan.weekDay === weekDay
              ? {
                  ...plan,
                  mainDish: randomAlternative.mainDish,
                  sideDish: randomAlternative.sideDish,
                  drink: randomAlternative.drink,
                  fruit: randomAlternative.fruit,
                }
              : plan
          ),
        }))
      },
      getShoppingList: () => {
        const { plans } = get()
        const items: string[] = []
        plans.forEach((plan) => {
          items.push(plan.mainDish, plan.sideDish, plan.drink, plan.fruit)
        })
        return [...new Set(items)]
      },
    }),
    {
      name: 'breakfast-storage',
    }
  )
)
