'use client'

import { useEffect } from 'react'
import { useInfiniteTasks } from '../hooks/useInfiniteTasks'
import { TaskItem } from './TaskItem'
import { Loader2 } from 'lucide-react'

export function InfiniteTaskList() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError
  } = useInfiniteTasks()

  // Auto-fetch more on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= 
        document.body.offsetHeight - 1000 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="card border-red-200 bg-red-50">
        <p className="text-red-600">
          Error loading tasks: {error instanceof Error ? error.message : 'Unknown error'}
        </p>
      </div>
    )
  }

  const allTasks = data?.pages.flatMap(page => page.tasks) ?? []

  return (
    <div className="space-y-4">
      {allTasks.map((task, index) => (
        <TaskItem key={`${task.id}-${index}`} task={task} />
      ))}
      
      {isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
        </div>
      )}
      
      {hasNextPage && !isFetchingNextPage && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => fetchNextPage()}
            className="btn-primary"
          >
            Load More
          </button>
        </div>
      )}
      
      {!hasNextPage && allTasks.length > 0 && (
        <div className="text-center py-4 text-gray-500">
          No more tasks to load
        </div>
      )}
    </div>
  )
}