import { Mountain } from 'lucide-react'

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex items-center space-x-1">
          <Mountain className="h-8 w-8 text-blue-600" />
          <span className="text-2xl">🎿</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Ski App
        </h1>
      </div>
      <p className="text-gray-600">
        🏔️ Track your mountain adventures - Modern React Patterns
      </p>
      <div className="mt-4 flex items-center space-x-4 text-sm">
        <div className="flex items-center space-x-1 text-green-600">
          <span>🟢</span>
          <span>Beginner</span>
        </div>
        <div className="flex items-center space-x-1 text-blue-600">
          <span>🔵</span>
          <span>Intermediate</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-700">
          <span>⚫</span>
          <span>Advanced</span>
        </div>
        <div className="flex items-center space-x-1 text-black">
          <span>⚫⚫</span>
          <span>Expert</span>
        </div>
      </div>
    </header>
  )
}