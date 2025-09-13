'use client'

import { memo, useMemo, useCallback } from 'react'
import { Task } from '../types/task'
import { Check, Clock, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

interface TaskItemProps {
  task: Task
  onToggle?: (taskId: string) => void
}

const TaskItem = memo(function TaskItem({ task, onToggle }: TaskItemProps) {
  const priorityConfig = useMemo(() => ({
    high: { color: 'text-red-600', icon: AlertCircle },
    medium: { color: 'text-yellow-600', icon: Clock },
    low: { color: 'text-green-600', icon: Check }
  }), [])

  const { color: priorityColor, icon: PriorityIcon } = priorityConfig[task.priority]

  const formattedDate = useMemo(() => 
    task.createdAt.toLocaleDateString(),
    [task.createdAt]
  )

  const handleToggle = useCallback(() => {
    console.log('Toggle task:', task.id)
    onToggle?.(task.id)
  }, [task.id, onToggle])

  return (
    <div className={clsx(
      'card transition-all duration-200 hover:shadow-md cursor-pointer',
      task.completed && 'opacity-60'
    )}>
      <div className="flex items-start space-x-4">
        <button
          onClick={handleToggle}
          className={clsx(
            'mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
            task.completed
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'border-gray-300 hover:border-blue-500'
          )}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1 min-w-0">
          <h3 className={clsx(
            'font-medium',
            task.completed && 'line-through text-gray-500'
          )}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">
              {task.description}
            </p>
          )}
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
            <div className={clsx('flex items-center space-x-1', priorityColor)}>
              <PriorityIcon className="w-3 h-3" />
              <span className="capitalize">{task.priority}</span>
            </div>
            <span>Created {formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  )
})

export { TaskItem }