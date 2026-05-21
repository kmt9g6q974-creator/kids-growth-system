import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { BreakfastPlan } from '@/types'
import { BREAKFAST_MENU, BREAKFAST_ALTERNATIVES } from '@/types/breakfast'

interface BreakfastState {
  breakfastPlan: BreakfastPlan[]
  selectedDate: Date
  setPlans: (plans: BreakfastPlan[]) => void
  setSelectedDate: (date: Date) => void
  generateBreakfastPlan: () => void
  completeBreakfast: (index: number, completed: boolean) => void
  toggleFavorite: (index: number) => void
  replaceBreakfast: (index: number, alternative: any) => void
  getShoppingList: () => string[]
}

export const useBreakfastStore = create<BreakfastState>()(
  persist(
    (set, get) => ({
      breakfastPlan: Object.entries(BREAKFAST_MENU).map(([key, menu], index) => ({
        id: `breakfast-${index}`,
        userId: '1',
        weekDay: parseInt(key),
        mainDish: menu.mainDish,
        sideDish: menu.sideDish,
        drink: menu.drink,
        fruit: menu.fruit,
        isFavorite: false,
        completed: false,
        completedAt: undefined,
        createdAt: new Date(),
        updatedAt: new Date(),
      })),
      selectedDate: new Date(),
      setPlans: (plans) => set({ breakfastPlan: plans }),
      setSelectedDate: (date) => set({ selectedDate: date }),
      generateBreakfastPlan: () => {
        set((state) => ({
          breakfastPlan: Object.entries(BREAKFAST_MENU).map(([key, menu], index) => ({
            id: `breakfast-${index}`,
            userId: '1',
            weekDay: parseInt(key),
            mainDish: menu.mainDish,
            sideDish: menu.sideDish,
            drink: menu.drink,
            fruit: menu.fruit,
            isFavorite: false,
            completed: false,
            completedAt: undefined,
            createdAt: new Date(),
            updatedAt: new Date(),
          })),
        }))
      },
      completeBreakfast: (index, completed) =>
        set((state) => ({
          breakfastPlan: state.breakfastPlan.map((plan, i) =>
            i === index
              ? { ...plan, completed, completedAt: completed ? new Date() : undefined }
              : plan
          ),
        })),
      toggleFavorite: (index) =>
        set((state) => ({
          breakfastPlan: state.breakfastPlan.map((plan, i) =>
            i === index
              ? { ...plan, isFavorite: !plan.isFavorite }
              : plan
          ),
        })),
      replaceBreakfast: (index, alternative) => {
        set((state) => ({
          breakfastPlan: state.breakfastPlan.map((plan, i) =>
            i === index
              ? {
                  ...plan,
                  mainDish: alternative.mainDish,
                  sideDish: alternative.sideDish,
                  drink: alternative.drink,
                  fruit: alternative.fruit,
                }
              : plan
          ),
        }))
      },
      getShoppingList: () => {
        const { breakfastPlan } = get()
        const items: string[] = []
        breakfastPlan.forEach((plan) => {
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
