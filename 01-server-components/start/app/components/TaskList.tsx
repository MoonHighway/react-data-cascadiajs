'use client'

import { useState, useEffect } from 'react'
import { Task } from '../types/task'
import { TaskItem } from './TaskItem'

// Simulate API call for ski runs
async function fetchSkiRuns(): Promise<Task[]> {
  // Simulate network delay (like waiting for mountain conditions)
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      name: 'Blue Bird Bowl',
      mountain: 'Whistler Blackcomb',
      title: 'Blue Bird Bowl', // Legacy compatibility
      description: 'Perfect powder run on a bluebird day',
      completed: false,
      difficulty: 'black',
      priority: 'high', // Legacy compatibility
      conditions: 'powder',
      vertical: 1200,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15'),
      notes: 'Fresh 8" of powder overnight! 🎿'
    },
    {
      id: '2',
      name: 'Corduroy Dreams',
      mountain: 'Aspen Mountain',
      title: 'Corduroy Dreams', // Legacy compatibility
      description: 'Perfectly groomed blue square run',
      completed: false,
      difficulty: 'blue',
      priority: 'medium', // Legacy compatibility
      conditions: 'groomed',
      vertical: 800,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14'),
      notes: 'Groomed to perfection this morning'
    },
    {
      id: '3',
      name: 'Bunny Hill Practice',
      mountain: 'Local Mountain',
      title: 'Bunny Hill Practice', // Legacy compatibility
      description: 'Easy green run for warming up',
      completed: true,
      difficulty: 'green',
      priority: 'low', // Legacy compatibility
      conditions: 'perfect',
      vertical: 200,
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-16'),
      completedAt: new Date('2024-01-16'),
      notes: 'Warmed up nicely! Ready for harder runs.'
    }
  ]
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSkiRuns()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-blue-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            <div className="h-2 bg-gray-100 rounded w-1/4 mt-2"></div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="card border-red-200 bg-red-50">
        <p className="text-red-600">❄️ Error loading ski runs: {error}</p>
        <p className="text-sm text-red-500 mt-1">Mountain conditions temporarily unavailable</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 btn-secondary text-sm"
        >
          🔄 Check Conditions Again
        </button>
      </div>
    )
  }

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">🎿 No ski runs logged yet. Hit the slopes!</p>
        <p className="text-sm text-gray-400 mt-2">Add your first run to start tracking your mountain adventures</p>
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