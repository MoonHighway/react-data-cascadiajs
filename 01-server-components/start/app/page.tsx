import { TaskList } from './components/TaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex items-center space-x-2 mb-6">
            <h2 className="text-2xl font-bold">🎿 Your Ski Runs</h2>
            <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              Client Components Demo
            </span>
          </div>
          <TaskList />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">⛷️ Log New Run</h2>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  )
}