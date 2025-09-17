import { Suspense } from 'react'
import { TaskList } from './components/TaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'

function SkiRunsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
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
  )
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-2xl font-bold">🎿 Your Ski Runs</h2>
            <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Server Components (Checkpoint)
            </span>
          </div>
          <Suspense fallback={<SkiRunsSkeleton />}>
            <TaskList />
          </Suspense>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">⛷️ Log New Run</h2>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  )
}