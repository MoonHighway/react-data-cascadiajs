import { useMemo } from 'react'
import { SkiRun } from '../types/task'

export function useSkiStats(runs: SkiRun[]) {
  return useMemo(() => {
    const completedRuns = runs.filter(run => run.completed)
    const totalVertical = completedRuns.reduce((sum, run) => sum + run.vertical, 0)

    const difficultyBreakdown = {
      green: completedRuns.filter(r => r.difficulty === 'green').length,
      blue: completedRuns.filter(r => r.difficulty === 'blue').length,
      black: completedRuns.filter(r => r.difficulty === 'black').length,
      'double-black': completedRuns.filter(r => r.difficulty === 'double-black').length
    }

    const conditionsBreakdown = {
      powder: runs.filter(r => r.conditions === 'powder').length,
      groomed: runs.filter(r => r.conditions === 'groomed').length,
      moguls: runs.filter(r => r.conditions === 'moguls').length,
      icy: runs.filter(r => r.conditions === 'icy').length,
      perfect: runs.filter(r => r.conditions === 'perfect').length
    }

    const resortFrequency = completedRuns.reduce((acc, run) => {
      acc[run.mountain] = (acc[run.mountain] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    const favoriteResort = Object.entries(resortFrequency)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'

    const avgVertical = completedRuns.length > 0
      ? Math.round(totalVertical / completedRuns.length)
      : 0

    const bestVerticalDay = completedRuns.reduce((max, run) =>
      run.vertical > max ? run.vertical : max, 0
    )

    return {
      totalRuns: completedRuns.length,
      totalVertical,
      avgVertical,
      bestVerticalDay,
      favoriteResort,
      difficultyBreakdown,
      conditionsBreakdown,
      powderDays: conditionsBreakdown.powder,
      perfectDays: conditionsBreakdown.perfect
    }
  }, [runs])
}