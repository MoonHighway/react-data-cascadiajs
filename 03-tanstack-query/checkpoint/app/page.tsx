import { LiftStatus } from './components/LiftStatus'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          ⛷️ Snowtooth Resort
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Real-time lift status powered by TanStack Query
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="flex items-center space-x-1 text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span>Live Data</span>
          </span>
          <span className="flex items-center space-x-1 text-blue-600">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            <span>Auto-refresh</span>
          </span>
          <span className="flex items-center space-x-1 text-purple-600">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            <span>React 19 + Next 15</span>
          </span>
        </div>
      </div>

      <LiftStatus />

      <div className="mt-12 bg-gray-100 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          🚀 TanStack Query Features Demo
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Data Fetching</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Automatic background refetching</li>
              <li>• Smart caching (5min stale time)</li>
              <li>• Loading and error states</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Performance</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Deduplication of requests</li>
              <li>• Optimistic updates ready</li>
              <li>• DevTools integration</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Open browser DevTools and look for the TanStack Query tab to explore caching and network requests.
        </p>
      </div>
    </div>
  )
}