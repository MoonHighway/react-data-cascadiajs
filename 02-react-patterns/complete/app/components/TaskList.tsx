import { Task } from '../types/task'
import { TaskItem } from './TaskItem'
import { WeatherWidget } from './WeatherWidget'
import { getSkiRuns } from '../actions/skiActions'
import { Suspense } from 'react'

// Fetch mountain weather (demonstrates modern async data)
async function getMountainWeather() {
  await new Promise(resolve => setTimeout(resolve, 500))
  return {
    temp: 28,
    conditions: 'Partly Cloudy',
    snowfall: 8,
    windSpeed: 12,
    visibility: 'Excellent'
  }
}

export async function TaskList() {
  // Server Component can directly await data from our shared store
  const skiRuns = await getSkiRuns()

  // Create a promise for weather data to demonstrate use() hook
  const weatherPromise = getMountainWeather()

  if (skiRuns.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">🎿 No ski runs logged yet. Hit the slopes!</p>
        <p className="text-sm text-gray-400 mt-2">Add your first run to start tracking your mountain adventures</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Weather widget using React 19 use() hook */}
      <Suspense fallback={
        <div className="card animate-pulse">
          <div className="h-16 bg-blue-100 rounded"></div>
        </div>
      }>
        <WeatherWidget weatherPromise={weatherPromise} />
      </Suspense>

      {/* Ski runs list */}
      <div className="space-y-4">
        {skiRuns.map((run) => (
          <TaskItem key={run.id} task={run} />
        ))}
      </div>

      {/* Stats summary */}
      <div className="card bg-gradient-to-r from-blue-50 to-purple-50">
        <h3 className="font-semibold text-gray-800 mb-2">📊 Session Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-emerald-600">
              {skiRuns.filter(r => r.completed).length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-purple-600">
              {skiRuns.reduce((sum, r) => sum + r.vertical, 0).toLocaleString()}ft
            </div>
            <div className="text-gray-600">Total Vertical</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-blue-600">
              {skiRuns.filter(r => r.difficulty === 'black' || r.difficulty === 'double-black').length}
            </div>
            <div className="text-gray-600">Expert Runs</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-yellow-600">
              {skiRuns.filter(r => r.conditions === 'powder').length}
            </div>
            <div className="text-gray-600">Powder Days</div>
          </div>
        </div>
      </div>
    </div>
  )
}
