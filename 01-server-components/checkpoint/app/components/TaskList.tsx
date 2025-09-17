import { Task } from '../types/task'
import { TaskItem } from './TaskItem'

// Server Component - converted from Client Component in checkpoint!
async function getSkiRuns(): Promise<Task[]> {
  // Simulate API delay - but this happens on the server
  await new Promise(resolve => setTimeout(resolve, 1000))

  return [
    {
      id: '1',
      name: 'Morning Groomer',
      mountain: 'Local Resort',
      title: 'Morning Groomer', // Legacy compatibility
      description: 'Perfect groomed run to start the day',
      completed: false,
      difficulty: 'blue',
      priority: 'medium', // Legacy compatibility
      conditions: 'groomed',
      vertical: 800,
      createdAt: new Date('2025-01-15'),
      updatedAt: new Date('2025-01-15'),
      notes: 'Great way to warm up the legs! 🎿'
    },
    {
      id: '2',
      name: 'Powder Stash',
      mountain: 'Mountain Resort',
      title: 'Powder Stash', // Legacy compatibility
      description: 'Hidden powder run off the main trail',
      completed: false,
      difficulty: 'black',
      priority: 'high', // Legacy compatibility
      conditions: 'powder',
      vertical: 1200,
      createdAt: new Date('2025-01-14'),
      updatedAt: new Date('2025-01-14'),
      notes: 'Found some fresh tracks! ❄️'
    },
    {
      id: '3',
      name: 'Bunny Hill Practice',
      mountain: 'Learning Area',
      title: 'Bunny Hill Practice', // Legacy compatibility
      description: 'Easy practice run for building confidence',
      completed: true,
      difficulty: 'green',
      priority: 'low', // Legacy compatibility
      conditions: 'perfect',
      vertical: 200,
      createdAt: new Date('2025-01-13'),
      updatedAt: new Date('2025-01-16'),
      completedAt: new Date('2025-01-16'),
      notes: 'Nailed those parallel turns! 🟢'
    }
  ]
}

export async function TaskList() {
  const skiRuns = await getSkiRuns()

  if (skiRuns.length === 0) {
    return (
      <div className="card text-center py-8">
        <p className="text-gray-500">🎿 No ski runs logged yet. Hit the slopes!</p>
        <p className="text-sm text-gray-400 mt-2">Add your first run to start tracking your mountain adventures</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {skiRuns.map((run) => (
        <TaskItem key={run.id} task={run} />
      ))}
    </div>
  )
}