'use client'
import { Component, ReactNode } from 'react'

interface SkiErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class SkiErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  SkiErrorBoundaryState
> {
  constructor(props: any) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): SkiErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('SkiErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="card bg-red-50 border-red-200">
          <div className="text-center py-8">
            <span className="text-6xl mb-4 block">🎿💥</span>
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Oops! Wiped out on this run!
            </h3>
            <p className="text-red-600 mb-4">
              Something went wrong loading your ski data.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              🔄 Get back on the slopes
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}