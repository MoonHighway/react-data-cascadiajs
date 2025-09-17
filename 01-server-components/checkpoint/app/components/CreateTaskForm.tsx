'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'

export function CreateTaskForm() {
  const [runName, setRunName] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState<'green' | 'blue' | 'black' | 'double-black'>('blue')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    console.log('Creating ski run:', { runName, description, difficulty })
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Reset form
    setRunName('')
    setDescription('')
    setDifficulty('blue')
    setIsSubmitting(false)
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <div className="space-y-4">
        <div>
          <label htmlFor="runName" className="block text-sm font-medium text-gray-700 mb-1">
            🎿 Ski Run Name
          </label>
          <input
            type="text"
            id="runName"
            value={runName}
            onChange={(e) => setRunName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Blue Bird Bowl, Powder Paradise..."
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            📝 Notes (Optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="How was the run? Conditions, snow quality, etc..."
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
            ⛷️ Difficulty Level
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'green' | 'blue' | 'black' | 'double-black')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            disabled={isSubmitting}
          >
            <option value="green">🟢 Green Circle (Beginner)</option>
            <option value="blue">🔵 Blue Square (Intermediate)</option>
            <option value="black">⚫ Black Diamond (Advanced)</option>
            <option value="double-black">⚫⚫ Double Black Diamond (Expert)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          <span>{isSubmitting ? 'Logging Run...' : 'Log Ski Run 🎿'}</span>
        </button>
      </div>
    </form>
  )
}