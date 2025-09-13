import { Task } from '../types/task'
import { TaskItem } from './TaskItem'

// Server Component - runs on the server!
async function getTasks(): Promise<Task[]> {
  // Simulate API delay - but this happens on the server
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    {
      id: '1',
      title: 'Learn Server Components',
      description: 'Understand the difference between Server and Client Components',
      completed: false,
      priority: 'high',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      title: 'Implement TanStack Query', 
      description: 'Add server state management to the application',
      completed: false,
      priority: 'medium',
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-14')
    },
    {
      id: '3',
      title: 'Add Performance Optimizations',
      description: 'Use React.memo and optimization patterns',
      completed: true,
      priority: 'low',
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-16')
    }
  ]
}

export async function TaskList() {
  const tasks = await getTasks()

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">No tasks yet. Create your first task!</p>
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