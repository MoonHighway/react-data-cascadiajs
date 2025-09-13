'use client'

import { useQuery } from '@tanstack/react-query'
import { Task } from '../types/task'
import { TaskItem } from './TaskItem'

// API function
async function fetchTasks(): Promise<Task[]> {
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    {
      id: '1',
      title: 'Learn Server Components',
      description: 'Understand the difference between Server and Client Components',
      completed: false,
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Implement TanStack Query', 
      description: 'Add server state management to the application',
      completed: false,
      priority: 'medium',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: '3',
      title: 'Add Performance Optimizations',
      description: 'Use React.memo and optimization patterns',
      completed: true,
      priority: 'low',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-16')
    }
  ]
}

export function TaskList() {
  const { 
    data: tasks, 
    isLoading, 
    error,
    refetch 
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <p className="text-red-600 mb-4">
          Error loading tasks: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
        <button 
          onClick={() => refetch()} 
          className="btn-secondary text-sm"
        >
          Try Again
        </button>
      </div>
    )
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  )
}