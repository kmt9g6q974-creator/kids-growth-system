import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DailyTask, TimelineItem } from '@/types'
import { getScheduleForDate } from '@/types/schedule'

interface TaskState {
  tasks: DailyTask[]
  todaySchedule: TimelineItem[]
  selectedDate: Date
  setTasks: (tasks: DailyTask[]) => void
  completeTask: (taskId: string) => void
  uncompleteTask: (taskId: string) => void
  setSelectedDate: (date: Date) => void
  generateTodaySchedule: () => void
  updateTaskCompletion: (taskType: string, completed: boolean) => void
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      todaySchedule: [],
      selectedDate: new Date(),
      setTasks: (tasks) => set({ tasks }),
      completeTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: true, completedAt: new Date() }
              : task
          ),
          todaySchedule: state.todaySchedule.map((item) =>
            item.taskType === taskId
              ? { ...item, completed: true }
              : item
          ),
        })),
      uncompleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, completed: false, completedAt: undefined }
              : task
          ),
          todaySchedule: state.todaySchedule.map((item) =>
            item.taskType === taskId
              ? { ...item, completed: false }
              : item
          ),
        })),
      setSelectedDate: (date) => {
        set({ selectedDate: date })
        get().generateTodaySchedule()
      },
      generateTodaySchedule: () => {
        const { selectedDate } = get()
        const schedule = getScheduleForDate(selectedDate)
        const timeline: TimelineItem[] = schedule.map((item) => ({
          time: item.time,
          title: item.title,
          description: item.description,
          taskType: item.taskType,
          completed: false,
          points: item.points,
          icon: item.icon,
        }))
        set({ todaySchedule: timeline })
      },
      updateTaskCompletion: (taskType, completed) =>
        set((state) => ({
          todaySchedule: state.todaySchedule.map((item) =>
            item.taskType === taskType ? { ...item, completed } : item
          ),
        })),
    }),
    {
      name: 'task-storage',
    }
  )
)
