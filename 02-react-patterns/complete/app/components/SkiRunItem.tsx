'use client'

import { SkiRun } from '../types/task'
import { memo, useCallback } from 'react'
import { clsx } from 'clsx'

interface SkiRunItemProps {
  run: SkiRun
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

function getDifficultyStyles(difficulty: SkiRun['difficulty']): string {
  const styles = {
    'green': 'border-l-green-500 bg-green-50',
    'blue': 'border-l-blue-500 bg-blue-50',
    'black': 'border-l-gray-700 bg-gray-50',
    'double-black': 'border-l-black bg-gray-100'
  }
  return styles[difficulty]
}

function getDifficultyIcon(difficulty: SkiRun['difficulty']): string {
  const icons = {
    'green': '🟢',
    'blue': '🔵',
    'black': '⚫',
    'double-black': '⚫⚫'
  }
  return icons[difficulty]
}

function getConditionsIcon(conditions: SkiRun['conditions']): string {
  const icons = {
    'powder': '❄️',
    'groomed': '🎿',
    'moguls': '⛷️',
    'icy': '🧊',
    'perfect': '✨'
  }
  return icons[conditions]
}

export const SkiRunItem = memo(function SkiRunItem({
  run,
  onToggle,
  onDelete
}: SkiRunItemProps) {
  const handleToggle = useCallback(() => onToggle(run.id), [run.id, onToggle])
  const handleDelete = useCallback(() => onDelete(run.id), [run.id, onDelete])

  const difficultyStyle = getDifficultyStyles(run.difficulty)
  const difficultyIcon = getDifficultyIcon(run.difficulty)
  const conditionsIcon = getConditionsIcon(run.conditions)

  return (
    <div className={clsx(
      'card border-l-4 transition-all duration-200 hover:shadow-md',
      difficultyStyle,
      run.completed && 'opacity-60'
    )}>
      <div className="flex items-start space-x-4">
        <button
          onClick={handleToggle}
          className={clsx(
            'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
            run.completed
              ? 'bg-green-500 border-green-500 text-white'
              : 'border-gray-300 hover:border-green-400'
          )}
        >
          {run.completed && '✓'}
        </button>

        <div className="text-2xl mt-1">
          {difficultyIcon}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={clsx(
            'font-semibold text-lg',
            run.completed ? 'line-through text-gray-500' : 'text-gray-900'
          )}>
            {run.name}
          </h3>

          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
            <span>🏔️ {run.mountain}</span>
            <span>📍 {run.vertical.toLocaleString()}ft vertical</span>
            <span>{conditionsIcon} {run.conditions}</span>
          </div>

          {run.notes && (
            <p className="text-sm text-gray-700 mt-2 italic">
              {run.notes}
            </p>
          )}

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>
                Created {run.createdAt.toLocaleDateString()}
              </span>
              {run.completedAt && (
                <span>
                  Completed {run.completedAt.toLocaleDateString()}
                </span>
              )}
            </div>

            <button
              onClick={handleDelete}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
})