'use client'

import { useState, useMemo, useCallback } from 'react'
import { SkiRun } from '../types/task'

type Difficulty = 'all' | 'green' | 'blue' | 'black' | 'double-black'
type Conditions = 'all' | 'powder' | 'groomed' | 'moguls' | 'icy' | 'perfect'

interface FilterState {
  difficulty: Difficulty
  conditions: Conditions
  searchTerm: string
}

export function useSkiRunFilters(runs: SkiRun[]) {
  const [filters, setFilters] = useState<FilterState>({
    difficulty: 'all',
    conditions: 'all',
    searchTerm: ''
  })

  const filteredRuns = useMemo(() => {
    return runs.filter(run => {
      const matchesDifficulty = filters.difficulty === 'all' || run.difficulty === filters.difficulty
      const matchesConditions = filters.conditions === 'all' || run.conditions === filters.conditions
      const matchesSearch = filters.searchTerm === '' ||
        run.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        run.mountain.toLowerCase().includes(filters.searchTerm.toLowerCase())

      return matchesDifficulty && matchesConditions && matchesSearch
    })
  }, [runs, filters])

  const runCounts = useMemo(() => {
    return {
      all: runs.length,
      green: runs.filter(r => r.difficulty === 'green').length,
      blue: runs.filter(r => r.difficulty === 'blue').length,
      black: runs.filter(r => r.difficulty === 'black').length,
      'double-black': runs.filter(r => r.difficulty === 'double-black').length
    }
  }, [runs])

  const conditionCounts = useMemo(() => {
    return {
      all: runs.length,
      powder: runs.filter(r => r.conditions === 'powder').length,
      groomed: runs.filter(r => r.conditions === 'groomed').length,
      moguls: runs.filter(r => r.conditions === 'moguls').length,
      icy: runs.filter(r => r.conditions === 'icy').length,
      perfect: runs.filter(r => r.conditions === 'perfect').length
    }
  }, [runs])

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setFilters(prev => ({ ...prev, difficulty }))
  }, [])

  const setConditions = useCallback((conditions: Conditions) => {
    setFilters(prev => ({ ...prev, conditions }))
  }, [])

  const setSearchTerm = useCallback((searchTerm: string) => {
    setFilters(prev => ({ ...prev, searchTerm }))
  }, [])

  const clearFilters = useCallback(() => {
    setFilters({
      difficulty: 'all',
      conditions: 'all',
      searchTerm: ''
    })
  }, [])

  return {
    filters,
    filteredRuns,
    runCounts,
    conditionCounts,
    setDifficulty,
    setConditions,
    setSearchTerm,
    clearFilters
  }
}