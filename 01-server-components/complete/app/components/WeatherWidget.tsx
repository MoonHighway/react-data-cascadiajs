'use client'

import { use } from 'react'
import { Cloud, Snowflake, Wind, Eye } from 'lucide-react'

interface Weather {
  temp: number
  conditions: string
  snowfall: number
  windSpeed: number
  visibility: string
}

interface WeatherWidgetProps {
  weatherPromise: Promise<Weather>
}

// React 19 feature: use() hook for promises!
export function WeatherWidget({ weatherPromise }: WeatherWidgetProps) {
  // This is the new React 19 use() hook in action!
  const weather = use(weatherPromise)

  return (
    <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg flex items-center space-x-2">
          <Cloud className="w-5 h-5" />
          <span>🏔️ Mountain Conditions</span>
        </h3>
        <div className="text-sm bg-blue-400 bg-opacity-50 px-2 py-1 rounded">
          React 19 use() Hook Demo
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{weather.temp}°F</div>
          <div className="text-blue-100 text-sm">Temperature</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Snowflake className="w-4 h-4" />
            <span className="font-bold">{weather.snowfall}"</span>
          </div>
          <div className="text-blue-100 text-sm">Fresh Snow</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Wind className="w-4 h-4" />
            <span className="font-bold">{weather.windSpeed}mph</span>
          </div>
          <div className="text-blue-100 text-sm">Wind Speed</div>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center space-x-1 mb-1">
            <Eye className="w-4 h-4" />
            <span className="font-bold text-sm">{weather.visibility}</span>
          </div>
          <div className="text-blue-100 text-sm">Visibility</div>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-400 bg-opacity-30 rounded-lg">
        <div className="flex items-center space-x-2">
          <span className="text-lg">☀️</span>
          <span className="text-sm">
            <strong>{weather.conditions}</strong> - Perfect skiing conditions!
            {weather.snowfall > 6 && " Fresh powder day! 🎿"}
          </span>
        </div>
      </div>
    </div>
  )
}