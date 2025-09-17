import { Task } from '../types/task'
import { TaskItem } from './TaskItem'
import { WeatherWidget } from './WeatherWidget'
import { Suspense } from 'react'

// Modern Server Component - runs on the server with React 19!
async function getSkiRuns(): Promise<Task[]> {
  // Simulate API delay - but this happens on the server
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      name: 'Steep & Deep',
      mountain: 'Jackson Hole',
      title: 'Steep & Deep', // Legacy compatibility
      description: 'Epic double black diamond run with fresh powder',
      completed: false,
      difficulty: 'double-black',
      priority: 'high', // Legacy compatibility
      conditions: 'powder',
      vertical: 2500,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15'),
      notes: 'Fresh 12" overnight! Expert terrain only. 🎿⚫⚫'
    },
    {
      id: '2',
      name: 'Whistler Village Run',
      mountain: 'Whistler Blackcomb',
      title: 'Whistler Village Run', // Legacy compatibility
      description: 'Perfect intermediate cruiser with stunning views',
      completed: false,
      difficulty: 'blue',
      priority: 'medium', // Legacy compatibility
      conditions: 'groomed',
      vertical: 1800,
      createdAt: new Date('2025-01-14'),
      updatedAt: new Date('2025-01-14'),
      notes: 'Perfectly groomed corduroy. Great for carving! 🔵'
    },
    {
      id: '3',
      name: 'Bunny Slope Warmup',
      mountain: 'Local Resort',
      title: 'Bunny Slope Warmup', // Legacy compatibility
      description: 'Easy warm-up run to start the day',
      completed: true,
      difficulty: 'green',
      priority: 'low', // Legacy compatibility
      conditions: 'perfect',
      vertical: 150,
      createdAt: new Date('2025-01-13'),
      updatedAt: new Date('2025-01-16'),
      completedAt: new Date('2025-01-16'),
      notes: 'Perfect warm-up! Legs feeling good for harder runs. 🟢'
    },
    {
      id: '4',
      name: 'Mogul Madness',
      mountain: 'Aspen Mountain',
      title: 'Mogul Madness', // Legacy compatibility
      description: 'Challenging mogul field for advanced skiers',
      completed: false,
      difficulty: 'black',
      priority: 'high', // Legacy compatibility
      conditions: 'moguls',
      vertical: 1200,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15'),
      notes: 'Huge moguls! Need to work on technique. ⛰️⚫'
    }
  ]
}

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
  // Server Component can directly await data
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