import { Cable } from 'lucide-react'

// Mock data - we'll replace this with real API data using TanStack Query
const mockLifts = [
  {
    id: "jolly-roger",
    name: "Jolly Roger",
    status: "OPEN" as const,
    capacity: 6,
    night: true,
    elevationGain: 1350,
    openTrails: 7,
    totalTrails: 7
  },
  {
    id: "jazz-cat",
    name: "Jazz Cat",
    status: "OPEN" as const,
    capacity: 2,
    night: false,
    elevationGain: 1230,
    openTrails: 5,
    totalTrails: 7
  },
  {
    id: "summit",
    name: "Summit",
    status: "CLOSED" as const,
    capacity: 6,
    night: false,
    elevationGain: 1480,
    openTrails: 0,
    totalTrails: 7
  },
  {
    id: "panorama",
    name: "Panorama",
    status: "HOLD" as const,
    capacity: 8,
    night: false,
    elevationGain: 2800,
    openTrails: 6,
    totalTrails: 8
  }
]

function LiftCard({ lift }: { lift: typeof mockLifts[0] }) {
  const statusColors = {
    OPEN: 'bg-green-100 text-green-800',
    CLOSED: 'bg-red-100 text-red-800',
    HOLD: 'bg-yellow-100 text-yellow-800'
  }

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
          <span className="ml-2 font-medium">{lift.openTrails}/{lift.totalTrails}</span>
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
  const openLifts = mockLifts.filter(lift => lift.status === 'OPEN').length
  const totalLifts = mockLifts.length

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <h2 className="text-xl font-semibold text-blue-900 mb-2">🏔️ Snowtooth Resort Status</h2>
        <p className="text-blue-700">
          <strong>{openLifts} of {totalLifts} lifts</strong> are currently operational
        </p>
        <p className="text-sm text-blue-600 mt-1">
          Currently showing static data - we'll make this live with TanStack Query!
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockLifts.map((lift) => (
          <LiftCard key={lift.id} lift={lift} />
        ))}
      </div>
    </div>
  )
}