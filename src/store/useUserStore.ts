import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { User } from '@/types'

interface UserState {
  user: User | null
  parentMode: boolean
  setUser: (user: User | null) => void
  updateCoins: (amount: number) => void
  updateExperience: (amount: number) => void
  updateLevel: (level: number) => void
  toggleParentMode: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      parentMode: false,
      setUser: (user) => set({ user }),
      updateCoins: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, coins: state.user.coins + amount }
            : null,
        })),
      updateExperience: (amount) =>
        set((state) => ({
          user: state.user
            ? { ...state.user, experience: state.user.experience + amount }
            : null,
        })),
      updateLevel: (level) =>
        set((state) => ({
          user: state.user ? { ...state.user, level } : null,
        })),
      toggleParentMode: () =>
        set((state) => ({
          parentMode: !state.parentMode,
          user: state.user
            ? { ...state.user, parentMode: !state.parentMode }
            : null,
        })),
    }),
    {
      name: 'user-storage',
    }
  )
)
