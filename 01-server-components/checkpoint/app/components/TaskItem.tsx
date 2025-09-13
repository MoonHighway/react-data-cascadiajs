'use client'

import { Task } from '../types/task'
import { Check, Clock, AlertCircle } from 'lucide-react'
import { clsx } from 'clsx'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const priorityColors = {
    high: 'text-red-600',
    medium: 'text-yellow-600', 
    low: 'text-green-600'
  }

  const priorityIcons = {
    high: AlertCircle,
    medium: Clock,
    low: Check
  }

  const PriorityIcon = priorityIcons[task.priority]

  const handleToggle = () => {
    console.log('Toggle task:', task.id)
    // TODO: This will be implemented later with proper state management
  }

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
            <div className={clsx('flex items-center space-x-1', priorityColors[task.priority])}>
              <PriorityIcon className="w-3 h-3" />
              <span className="capitalize">{task.priority}</span>
            </div>
            <span>
              Created {task.createdAt.toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}