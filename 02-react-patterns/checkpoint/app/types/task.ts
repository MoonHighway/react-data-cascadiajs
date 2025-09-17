export interface SkiRun {
  id: string
  name: string
  mountain: string
  difficulty: 'green' | 'blue' | 'black' | 'double-black'
  completed: boolean
  conditions: 'powder' | 'groomed' | 'moguls' | 'icy' | 'perfect'
  vertical: number // feet of vertical descent
  createdAt: Date
  completedAt?: Date
  skierId?: string
  notes?: string
}

// Keep legacy type for compatibility during transition
export interface Task extends SkiRun {
  title: string
  description?: string
  priority: 'low' | 'medium' | 'high'
  updatedAt: Date
  userId?: string
}