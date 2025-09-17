import { LiftStatus } from './components/LiftStatus'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          ⛷️ Snowtooth Resort
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Ski lift status dashboard
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="flex items-center space-x-1 text-gray-600">
            <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
            <span>Static Data</span>
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
          🎯 Workshop Goals
        </h2>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">We'll Learn</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Setting up TanStack Query</li>
              <li>• Fetching real-time API data</li>
              <li>• Loading and error states</li>
              <li>• Caching and background updates</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Features We'll Add</h3>
            <ul className="space-y-1 text-gray-600">
              <li>• Live API data fetching</li>
              <li>• Auto-refresh every 2 minutes</li>
              <li>• Query DevTools integration</li>
              <li>• Optimistic updates</li>
            </ul>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-4">
          Let's transform this static app into a real-time data-driven experience!
        </p>
      </div>
    </div>
  )
}