import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { GrowthTree, Pet, Badge, UserBadge, Reward } from '@/types'

interface GrowthState {
  growthTree: GrowthTree | null
  pets: Pet[]
  badges: Badge[]
  userBadges: UserBadge[]
  rewards: Reward[]
  setGrowthTree: (tree: GrowthTree | null) => void
  addExperience: (amount: number) => void
  updateHealth: (amount: number) => void
  unlockFeature: (feature: string) => void
  setPets: (pets: Pet[]) => void
  unlockPet: (petId: string) => void
  updatePetHappiness: (petId: string, amount: number) => void
  setBadges: (badges: Badge[]) => void
  setUserBadges: (userBadges: UserBadge[]) => void
  earnBadge: (badgeId: string) => void
  setRewards: (rewards: Reward[]) => void
  unlockReward: (rewardId: string) => void
}

export const useGrowthStore = create<GrowthState>()(
  persist(
    (set) => ({
      growthTree: null,
      pets: [],
      badges: [],
      userBadges: [],
      rewards: [],
      setGrowthTree: (tree) => set({ growthTree: tree }),
      addExperience: (amount) =>
        set((state) => ({
          growthTree: state.growthTree
            ? {
                ...state.growthTree,
                experience: state.growthTree.experience + amount,
              }
            : null,
        })),
      updateHealth: (amount) =>
        set((state) => ({
          growthTree: state.growthTree
            ? {
                ...state.growthTree,
                health: Math.max(0, Math.min(100, state.growthTree.health + amount)),
              }
            : null,
        })),
      unlockFeature: (feature) =>
        set((state) => ({
          growthTree: state.growthTree
            ? {
                ...state.growthTree,
                unlockedFeatures: [
                  ...state.growthTree.unlockedFeatures,
                  feature,
                ],
              }
            : null,
        })),
      setPets: (pets) => set({ pets }),
      unlockPet: (petId) =>
        set((state) => ({
          pets: state.pets.map((pet) =>
            pet.id === petId
              ? { ...pet, unlocked: true, unlockedAt: new Date() }
              : pet
          ),
        })),
      updatePetHappiness: (petId, amount) =>
        set((state) => ({
          pets: state.pets.map((pet) =>
            pet.id === petId
              ? {
                  ...pet,
                  happiness: Math.max(0, Math.min(100, pet.happiness + amount)),
                }
              : pet
          ),
        })),
      setBadges: (badges) => set({ badges }),
      setUserBadges: (userBadges) => set({ userBadges }),
      earnBadge: (badgeId) =>
        set((state) => ({
          userBadges: [
            ...state.userBadges,
            {
              id: `${badgeId}-${Date.now()}`,
              userId: '',
              badgeId,
              earnedAt: new Date(),
            },
          ],
        })),
      setRewards: (rewards) => set({ rewards }),
      unlockReward: (rewardId) =>
        set((state) => ({
          rewards: state.rewards.map((reward) =>
            reward.id === rewardId
              ? { ...reward, unlocked: true, unlockedAt: new Date() }
              : reward
          ),
        })),
    }),
    {
      name: 'growth-storage',
    }
  )
)
