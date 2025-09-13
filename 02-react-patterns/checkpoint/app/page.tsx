import { Suspense } from 'react'
import { TaskList } from './components/TaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'

function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="card animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
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
          <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Add</h2>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  )
}