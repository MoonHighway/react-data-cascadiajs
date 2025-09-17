'use client'

import { Suspense } from 'react'
import { TaskList } from './components/TaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'
import { SkiStats } from './components/SkiStats'
import { SkiRunFilter } from './components/SkiRunFilter'
import { SkiErrorBoundary } from './components/SkiErrorBoundary'
import { useSkiRunFilters } from './hooks/useSkiRunFilters'
import { useSkiStats } from './hooks/useSkiStats'
import { useState, useEffect } from 'react'
import { SkiRun } from './types/task'
import { getSkiRuns } from './actions/skiActions'

function SkiRunsSkeleton() {
  return (
    <div className="space-y-6">
      {/* Ski runs skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card animate-pulse border-l-4 border-l-blue-200">
            <div className="flex space-x-4">
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const [runs, setRuns] = useState<SkiRun[]>([])
  const [loading, setLoading] = useState(true)

  const {
    filters,
    filteredRuns,
    runCounts,
    setDifficulty,
    clearFilters
  } = useSkiRunFilters(runs)

  const stats = useSkiStats(runs)

  useEffect(() => {
    const loadRuns = async () => {
      try {
        const skiRuns = await getSkiRuns()
        setRuns(skiRuns)
      } catch (error) {
        console.error('Failed to load ski runs:', error)
      } finally {
        setLoading(false)
      }
    }

    loadRuns()
  }, [])

  return (
    <SkiErrorBoundary>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-bold">🎿 Your Ski Adventures</h2>
                <span className="text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">
                  React Patterns Complete
                </span>
              </div>

              {filteredRuns.length !== runs.length && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  Clear Filters
                </button>
              )}
            </div>

            {/* Filtering */}
            <SkiRunFilter
              selectedDifficulty={filters.difficulty}
              onDifficultyChange={setDifficulty}
              runCounts={runCounts}
            />

            {loading ? (
              <SkiRunsSkeleton />
            ) : (
              <Suspense fallback={<SkiRunsSkeleton />}>
                <TaskList />
              </Suspense>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6">⛷️ Log New Adventure</h2>
              <CreateTaskForm />
            </div>

            {/* Statistics Dashboard */}
            <SkiErrorBoundary fallback={
              <div className="card bg-yellow-50 border-yellow-200">
                <p className="text-yellow-800">📊 Stats temporarily unavailable</p>
              </div>
            }>
              <SkiStats runs={runs} />
            </SkiErrorBoundary>

            {/* Feature highlights for this lesson */}
            <div className="card bg-gradient-to-br from-purple-50 to-blue-50">
              <h3 className="font-semibold text-gray-800 mb-3">✨ React Patterns Mastered</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Smart filtering with useMemo ✓</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                  <span>Optimized components with memo ✓</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                  <span>Error boundaries for resilience ✓</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                  <span>Custom hooks for reusable logic ✓</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  <span>Real-time statistics ✓</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-purple-200">
                <div className="text-xs text-gray-600">
                  <strong>Current Filter:</strong> {filters.difficulty === 'all' ? 'All difficulties' : filters.difficulty}
                  <br />
                  <strong>Showing:</strong> {filteredRuns.length} of {runs.length} runs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SkiErrorBoundary>
  )
}