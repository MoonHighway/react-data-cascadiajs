import { SkiRun } from '../types/task'
import { useMemo } from 'react'

interface SkiStatsProps {
  runs: SkiRun[]
}

interface StatItemProps {
  icon: string
  label: string
  value: string
}

function StatItem({ icon, label, value }: StatItemProps) {
  return (
    <div className="text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-lg font-semibold text-gray-800">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  )
}

function getMostFrequentResort(runs: SkiRun[]): string {
  if (runs.length === 0) return 'N/A'

  const resortCounts = runs.reduce((acc, run) => {
    acc[run.mountain] = (acc[run.mountain] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return Object.entries(resortCounts)
    .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
}

export function SkiStats({ runs }: SkiStatsProps) {
  const stats = useMemo(() => {
    const completedRuns = runs.filter(run => run.completed)
    const totalVertical = completedRuns.reduce((sum, run) => sum + run.vertical, 0)
    const powderDays = runs.filter(run => run.conditions === 'powder').length
    const favoriteResort = getMostFrequentResort(runs)

    return {
      totalRuns: completedRuns.length,
      totalVertical,
      powderDays,
      favoriteResort,
      avgVertical: Math.round(totalVertical / completedRuns.length) || 0
    }
  }, [runs])

  return (
    <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
      <h3 className="font-semibold text-lg mb-4">📊 Season Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        <StatItem
          icon="🎿"
          label="Total Runs"
          value={stats.totalRuns.toString()}
        />
        <StatItem
          icon="📏"
          label="Total Vertical"
          value={`${stats.totalVertical.toLocaleString()} ft`}
        />
        <StatItem
          icon="❄️"
          label="Powder Days"
          value={stats.powderDays.toString()}
        />
        <StatItem
          icon="🏔️"
          label="Favorite Resort"
          value={stats.favoriteResort}
        />
      </div>
    </div>
  )
}