import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { StatisticsData } from '@/types'

interface StatisticsState {
  statistics: StatisticsData | null
  setStatistics: (stats: StatisticsData) => void
  updateWeeklyData: (date: string, completionRate: number, points: number) => void
  updateMonthlyData: (date: string, completionRate: number, points: number) => void
  updateHeatmapData: (date: string, value: number) => void
}

export const useStatisticsStore = create<StatisticsState>()(
  persist(
    (set, get) => ({
      statistics: null,
      setStatistics: (stats) => set({ statistics: stats }),
      updateWeeklyData: (date, completionRate, points) =>
        set((state) => ({
          statistics: state.statistics
            ? {
                ...state.statistics,
                weeklyData: [
                  ...state.statistics.weeklyData.filter((d) => d.date !== date),
                  { date, completionRate, points },
                ].sort((a, b) => a.date.localeCompare(b.date)),
              }
            : null,
        })),
      updateMonthlyData: (date, completionRate, points) =>
        set((state) => ({
          statistics: state.statistics
            ? {
                ...state.statistics,
                monthlyData: [
                  ...state.statistics.monthlyData.filter((d) => d.date !== date),
                  { date, completionRate, points },
                ].sort((a, b) => a.date.localeCompare(b.date)),
              }
            : null,
        })),
      updateHeatmapData: (date, value) =>
        set((state) => ({
          statistics: state.statistics
            ? {
                ...state.statistics,
                heatmapData: [
                  ...state.statistics.heatmapData.filter((d) => d.date !== date),
                  { date, value },
                ].sort((a, b) => a.date.localeCompare(b.date)),
              }
            : null,
        })),
    }),
    {
      name: 'statistics-storage',
    }
  )
)
