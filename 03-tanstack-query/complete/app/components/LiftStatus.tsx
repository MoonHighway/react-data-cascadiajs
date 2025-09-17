'use client'

import { useQuery } from '@tanstack/react-query'
import { Lift } from '../types/lift'
import { Cable } from 'lucide-react'

const fetchLifts = async (): Promise<Lift[]> => {
  const response = await fetch('/api/lifts')
  if (!response.ok) {
    throw new Error('Failed to fetch lift data')
  }
  return response.json()
}

function LiftCard({ lift }: { lift: Lift }) {
  const statusColors = {
    OPEN: 'bg-green-100 text-green-800',
    CLOSED: 'bg-red-100 text-red-800',
    HOLD: 'bg-yellow-100 text-yellow-800'
  }

  const openTrails = lift.trailAccess.filter(trail => trail.status === 'OPEN').length
  const totalTrails = lift.trailAccess.length

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-l-blue-500">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Cable className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{lift.name}</h3>
            <p className="text-sm text-gray-500">Capacity: {lift.capacity} people</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[lift.status]}`}>
          {lift.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-500">Elevation Gain:</span>
          <span className="ml-2 font-medium">{lift.elevationGain.toLocaleString()} ft</span>
        </div>
        <div>
          <span className="text-gray-500">Trails Open:</span>
          <span className="ml-2 font-medium">{openTrails}/{totalTrails}</span>
        </div>
      </div>

      {lift.night && (
        <div className="mt-3">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            🌙 Night Skiing
          </span>
        </div>
      )}
    </div>
  )
}

export function LiftStatus() {
  const { data: lifts, isLoading, error, isError } = useQuery({
    queryKey: ['lifts'],
    queryFn: fetchLifts,
    refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-6 h-6 bg-gray-200 rounded"></div>
              <div className="flex-1">
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded-full"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ Unable to Load Lift Data</h3>
        <p className="text-red-600">
          {error instanceof Error ? error.message : 'Something went wrong fetching lift status'}
        </p>
        <p className="text-sm text-red-500 mt-2">
          Check your internet connection and try refreshing the page.
        </p>
      </div>
    )
  }

  const openLifts = lifts?.filter(lift => lift.status === 'OPEN').length ?? 0
  const totalLifts = lifts?.length ?? 0

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">🏔️ Snowtooth Resort Status</h2>
        <p className="text-blue-700">
          <strong>{openLifts} of {totalLifts} lifts</strong> are currently operational
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Last updated: {new Date().toLocaleTimeString()}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {lifts?.map((lift) => (
          <LiftCard key={lift.id} lift={lift} />
        ))}
      </div>
    </div>
  )
}