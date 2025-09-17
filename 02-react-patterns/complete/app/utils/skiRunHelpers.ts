import { SkiRun } from '../types/task'

export function getDifficultyStyles(difficulty: SkiRun['difficulty']): string {
  const styles = {
    'green': 'border-l-green-500 bg-green-50',
    'blue': 'border-l-blue-500 bg-blue-50',
    'black': 'border-l-gray-700 bg-gray-50',
    'double-black': 'border-l-black bg-gray-100'
  }
  return styles[difficulty]
}

export function getDifficultyIcon(difficulty: SkiRun['difficulty']): string {
  const icons = {
    'green': '🟢',
    'blue': '🔵',
    'black': '⚫',
    'double-black': '⚫⚫'
  }
  return icons[difficulty]
}

export function getConditionsIcon(conditions: SkiRun['conditions']): string {
  const icons = {
    'powder': '❄️',
    'groomed': '🎿',
    'moguls': '⛷️',
    'icy': '🧊',
    'perfect': '✨'
  }
  return icons[conditions]
}

export function getConditionsDescription(conditions: SkiRun['conditions']): string {
  const descriptions = {
    'powder': 'Fresh powder snow',
    'groomed': 'Perfectly groomed corduroy',
    'moguls': 'Challenging mogul field',
    'icy': 'Hard-packed icy conditions',
    'perfect': 'Perfect bluebird day'
  }
  return descriptions[conditions]
}

export function getDifficultyDescription(difficulty: SkiRun['difficulty']): string {
  const descriptions = {
    'green': 'Beginner - Easy slope',
    'blue': 'Intermediate - Moderate difficulty',
    'black': 'Advanced - Steep and challenging',
    'double-black': 'Expert - Extremely difficult'
  }
  return descriptions[difficulty]
}

export function formatVertical(vertical: number): string {
  return `${vertical.toLocaleString()} ft`
}

export function calculateSkiingDays(runs: SkiRun[]): number {
  const uniqueDates = new Set(
    runs
      .filter(run => run.completedAt)
      .map(run => run.completedAt!.toDateString())
  )
  return uniqueDates.size
}

export function getMostFrequentResort(runs: SkiRun[]): string {
  if (runs.length === 0) return 'N/A'

  const resortCounts = runs.reduce((acc, run) => {
    acc[run.mountain] = (acc[run.mountain] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(resortCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
}

export function getSeasonProgress(runs: SkiRun[], seasonGoal: number = 100): {
  completed: number
  percentage: number
  remaining: number
} {
  const completed = runs.filter(run => run.completed).length
  const percentage = Math.min((completed / seasonGoal) * 100, 100)
  const remaining = Math.max(seasonGoal - completed, 0)

  return { completed, percentage, remaining }
}

export function sortRunsByDate(runs: SkiRun[], ascending = false): SkiRun[] {
  return [...runs].sort((a, b) => {
    const dateA = a.completedAt || a.createdAt
    const dateB = b.completedAt || b.createdAt
    return ascending
      ? dateA.getTime() - dateB.getTime()
      : dateB.getTime() - dateA.getTime()
  })
}

export function groupRunsByMonth(runs: SkiRun[]): Record<string, SkiRun[]> {
  return runs.reduce((acc, run) => {
    const date = run.completedAt || run.createdAt
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

    if (!acc[monthKey]) {
      acc[monthKey] = []
    }
    acc[monthKey].push(run)

    return acc
  }, {} as Record<string, SkiRun[]>)
}

export function generateSkiRunSummary(run: SkiRun): string {
  const difficulty = getDifficultyDescription(run.difficulty)
  const conditions = getConditionsDescription(run.conditions)
  const vertical = formatVertical(run.vertical)

  return `${run.name} at ${run.mountain} - ${difficulty} with ${conditions} (${vertical} vertical)`
}