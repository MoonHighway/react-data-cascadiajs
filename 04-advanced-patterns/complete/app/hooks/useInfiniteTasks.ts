import { useInfiniteQuery } from '@tanstack/react-query'
import { Task } from '../types/task'

interface TaskPage {
  tasks: Task[]
  nextCursor: number | null
}

async function fetchTasksPage({ pageParam = 0 }: { pageParam: number }): Promise<TaskPage> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const allTasks: Task[] = Array.from({ length: 100 }, (_, i) => ({
    id: (i + 1).toString(),
    title: `Task ${i + 1}`,
    description: `Description for task ${i + 1}`,
    completed: Math.random() > 0.7,
    priority: (['low', 'medium', 'high'] as const)[Math.floor(Math.random() * 3)],
    createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
    updatedAt: new Date()
  }))

  const pageSize = 20
  const start = pageParam
  const end = start + pageSize
  const tasks = allTasks.slice(start, end)
  
  return {
    tasks,
    nextCursor: end < allTasks.length ? end : null
  }
}

export function useInfiniteTasks() {
  return useInfiniteQuery({
    queryKey: ['tasks', 'infinite'],
    queryFn: fetchTasksPage,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 0,
  })
}