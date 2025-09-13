import { TaskList } from './components/TaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Your Tasks</h2>
          <TaskList />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Add</h2>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  )
}