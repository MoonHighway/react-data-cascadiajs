import { CheckSquare } from 'lucide-react'

export function Header() {
  return (
    <header className="mb-8">
      <div className="flex items-center space-x-3 mb-2">
        <CheckSquare className="h-8 w-8 text-blue-600" />
        <h1 className="text-3xl font-bold">TaskFlow Pro</h1>
      </div>
      <p className="text-gray-600">
        Modern task management - Day 3 React Course
      </p>
    </header>
  )
}