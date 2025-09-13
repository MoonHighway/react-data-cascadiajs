import { useState, useMemo, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Task } from '../types/task'

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

async function searchTasks(searchTerm: string): Promise<Task[]> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const allTasks: Task[] = [
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
    },
    {
      id: '4',
      title: 'Setup Infinite Scrolling',
      description: 'Implement virtual scrolling for large task lists',
      completed: false,
      priority: 'high',
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '5',
      title: 'Add Search Functionality',
      description: 'Debounced search with highlighting',
      completed: false,
      priority: 'medium',
      createdAt: new Date('2024-01-11'),
      updatedAt: new Date('2024-01-11')
    }
  ]

  return allTasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )
}

export function useTaskSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const searchQuery = useQuery({
    queryKey: ['tasks', 'search', debouncedSearchTerm],
    queryFn: () => searchTasks(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const isSearching = searchTerm.length >= 2

  return {
    searchTerm,
    setSearchTerm,
    isSearching,
    ...searchQuery
  }
}