import { Suspense } from 'react'
import { TaskList } from './components/TaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'

function SkiRunsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Weather skeleton */}
      <div className="card animate-pulse">
        <div className="h-20 bg-blue-100 rounded"></div>
      </div>

      {/* Ski runs skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card animate-pulse border-l-4 border-l-blue-200">
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats skeleton */}
      <div className="card animate-pulse">
        <div className="h-20 bg-gradient-to-r from-blue-50 to-purple-50 rounded"></div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-2xl font-bold">🎿 Your Ski Adventures</h2>
            <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
              Server Components + React 19
            </span>
          </div>
          <Suspense fallback={<SkiRunsSkeleton />}>
            <TaskList />
          </Suspense>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">⛷️ Log New Adventure</h2>
          <CreateTaskForm />

          {/* Feature highlights for this lesson */}
          <div className="mt-8 card bg-gradient-to-br from-purple-50 to-blue-50">
            <h3 className="font-semibold text-gray-800 mb-3">✨ React 19 Features</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Server Components (async functions)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                <span>use() hook for promises</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                <span>Enhanced Suspense</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                <span>Improved hydration</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}