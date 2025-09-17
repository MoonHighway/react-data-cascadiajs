'use client'

type Difficulty = 'all' | 'green' | 'blue' | 'black' | 'double-black'

interface SkiRunFilterProps {
  selectedDifficulty: Difficulty
  onDifficultyChange: (difficulty: Difficulty) => void
  runCounts: Record<Difficulty, number>
}

export function SkiRunFilter({ selectedDifficulty, onDifficultyChange, runCounts }: SkiRunFilterProps) {
  const filters = [
    { key: 'all', label: 'All Runs', emoji: '🎿', color: 'bg-gray-100' },
    { key: 'green', label: 'Beginner', emoji: '🟢', color: 'bg-green-100' },
    { key: 'blue', label: 'Intermediate', emoji: '🔵', color: 'bg-blue-100' },
    { key: 'black', label: 'Advanced', emoji: '⚫', color: 'bg-gray-700 text-white' },
    { key: 'double-black', label: 'Expert', emoji: '⚫⚫', color: 'bg-black text-white' }
  ] as const

  return (
    <div className="mb-6">
      <h3 className="font-semibold mb-3">🎯 Filter by Difficulty</h3>
      <div className="flex flex-wrap gap-2">
        {filters.map(filter => (
          <button
            key={filter.key}
            onClick={() => onDifficultyChange(filter.key)}
            className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
              selectedDifficulty === filter.key
                ? `${filter.color} shadow-md scale-105`
                : 'bg-white border hover:shadow-sm'
            }`}
          >
            {filter.emoji} {filter.label} ({runCounts[filter.key] || 0})
          </button>
        ))}
      </div>
    </div>
  )
}