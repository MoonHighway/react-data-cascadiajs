'use client'

import { useActionState } from 'react'
import { Mountain, Plus } from 'lucide-react'
import { addSkiRun } from '../actions/skiActions'

// React 19 feature: useActionState for form handling
export function CreateTaskForm() {
  const [state, formAction, isPending] = useActionState(
    async (prevState: any, formData: FormData) => {
      try {
        const result = await addSkiRun(formData)
        return { success: true, message: result.message }
      } catch (error) {
        return { success: false, message: error instanceof Error ? error.message : 'Failed to log ski run' }
      }
    },
    { success: false, message: '' }
  )

  return (
    <div className="space-y-4">
      {/* Success/Error Message */}
      {state.message && (
        <div className={`p-3 rounded-lg text-sm ${
          state.success
            ? 'bg-green-50 text-green-800 border border-green-200'
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {state.message}
        </div>
      )}

      {/* Modern Server Action Form */}
      <form action={formAction} className="card">
        <div className="flex items-center space-x-2 mb-4">
          <Mountain className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold">Log Your Ski Adventure</h3>
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            Server Actions Demo
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="runName" className="block text-sm font-medium text-gray-700 mb-1">
              🎿 Ski Run Name
            </label>
            <input
              type="text"
              id="runName"
              name="runName"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Blue Bird Bowl, Steep & Deep..."
              required
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="mountain" className="block text-sm font-medium text-gray-700 mb-1">
              🏔️ Mountain/Resort
            </label>
            <input
              type="text"
              id="mountain"
              name="mountain"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Whistler, Aspen, Jackson Hole..."
              required
              disabled={isPending}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty Level
              </label>
              <select
                id="difficulty"
                name="difficulty"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue="blue"
                disabled={isPending}
              >
                <option value="green">🟢 Beginner (Green Circle)</option>
                <option value="blue">🔵 Intermediate (Blue Square)</option>
                <option value="black">⚫ Advanced (Black Diamond)</option>
                <option value="double-black">⚫⚫ Expert (Double Black)</option>
              </select>
            </div>

            <div>
              <label htmlFor="conditions" className="block text-sm font-medium text-gray-700 mb-1">
                Snow Conditions
              </label>
              <select
                id="conditions"
                name="conditions"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                defaultValue="groomed"
                disabled={isPending}
              >
                <option value="powder">❄️ Fresh Powder</option>
                <option value="groomed">🎿 Groomed</option>
                <option value="moguls">⛰️ Moguls</option>
                <option value="icy">🧊 Icy</option>
                <option value="perfect">✨ Perfect</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="vertical" className="block text-sm font-medium text-gray-700 mb-1">
              📏 Vertical Drop (feet)
            </label>
            <input
              type="number"
              id="vertical"
              name="vertical"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 1200"
              min="0"
              disabled={isPending}
            />
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
              💭 Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="How was the run? Any memorable moments?"
              disabled={isPending}
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
            <span>{isPending ? 'Logging Run...' : 'Log This Adventure! 🎿'}</span>
          </button>
        </div>
      </form>

      {/* Info about Server Actions */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <strong>React 19 Server Actions:</strong> This form uses modern server actions for progressive enhancement.
        It works without JavaScript and provides instant feedback!
      </div>
    </div>
  )
}