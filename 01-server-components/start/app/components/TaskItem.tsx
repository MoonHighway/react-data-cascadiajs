'use client'

import { Task } from '../types/task'
import { Check, Mountain, Snowflake, TrendingUp } from 'lucide-react'
import { clsx } from 'clsx'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  // Skiing difficulty colors and symbols
  const difficultyInfo = {
    green: { symbol: '🟢', color: 'text-green-600', name: 'Green Circle' },
    blue: { symbol: '🔵', color: 'text-blue-600', name: 'Blue Square' },
    black: { symbol: '⚫', color: 'text-gray-800', name: 'Black Diamond' },
    'double-black': { symbol: '⚫⚫', color: 'text-black', name: 'Double Black' }
  }

  // Condition icons and colors
  const conditionInfo = {
    powder: { icon: Snowflake, color: 'text-blue-500', emoji: '❄️' },
    groomed: { icon: TrendingUp, color: 'text-green-500', emoji: '🎿' },
    moguls: { icon: Mountain, color: 'text-yellow-600', emoji: '⛰️' },
    icy: { icon: Snowflake, color: 'text-cyan-400', emoji: '🧊' },
    perfect: { icon: Check, color: 'text-emerald-500', emoji: '✨' }
  }

  const difficulty = difficultyInfo[task.difficulty]
  const condition = conditionInfo[task.conditions]
  const ConditionIcon = condition.icon

  const handleToggle = () => {
    console.log('Toggle ski run:', task.id)
    // TODO: This will be implemented later with proper state management
  }

  return (
    <div className={clsx(
      'card transition-all duration-200 hover:shadow-md cursor-pointer border-l-4',
      task.completed && 'opacity-60',
      // Left border color based on difficulty
      task.difficulty === 'green' && 'border-l-green-500',
      task.difficulty === 'blue' && 'border-l-blue-500',
      task.difficulty === 'black' && 'border-l-gray-700',
      task.difficulty === 'double-black' && 'border-l-black'
    )}>
      <div className="flex items-start space-x-4">
        <button
          onClick={handleToggle}
          className={clsx(
            'mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors text-xs',
            task.completed
              ? 'bg-emerald-600 border-emerald-600 text-white'
              : 'border-gray-300 hover:border-blue-500'
          )}
        >
          {task.completed ? <Check className="w-3 h-3" /> : '🎿'}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className={clsx(
              'font-medium text-lg',
              task.completed && 'line-through text-gray-500'
            )}>
              {task.name || task.title}
            </h3>
            <span className="text-lg">{difficulty.symbol}</span>
          </div>

          <p className="text-sm font-medium text-gray-700 mb-1">
            📍 {task.mountain}
          </p>

          {task.description && (
            <p className="text-sm text-gray-600 mb-2">
              {task.description}
            </p>
          )}

          {task.notes && (
            <p className="text-sm text-blue-600 italic mb-2">
              💭 {task.notes}
            </p>
          )}

          <div className="flex items-center space-x-4 text-xs text-gray-500">
            <div className={clsx('flex items-center space-x-1', difficulty.color)}>
              <span>{difficulty.name}</span>
            </div>

            <div className={clsx('flex items-center space-x-1', condition.color)}>
              <ConditionIcon className="w-3 h-3" />
              <span className="capitalize">{task.conditions}</span>
              <span>{condition.emoji}</span>
            </div>

            <div className="flex items-center space-x-1 text-purple-600">
              <TrendingUp className="w-3 h-3" />
              <span>{task.vertical}ft vertical</span>
            </div>

            <span>
              {task.completed && task.completedAt
                ? `Completed ${task.completedAt.toLocaleDateString()}`
                : `Added ${task.createdAt.toLocaleDateString()}`
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}