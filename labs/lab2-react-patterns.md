# Lab 2: SkiTracker Pro - React Patterns Challenge 🎿
**Working Directory: `02-react-patterns/start/`**

## Objective
Master advanced React patterns by enhancing your ski run tracker with filtering, statistics, performance optimizations, and error handling. Build on your Server Components foundation from Lab 1!

## Getting Started
```bash
cd 02-react-patterns/start
npm install
npm run dev  # Runs on http://localhost:3004
```

## Current State ❄️
Your SkiTracker Pro app now has Server Components and the new React 19 `use()` hook. Time to add advanced patterns for better user experience, performance, and maintainability!

## Your Challenge 🏔️

### Part 1: Smart Filtering System (15min)

Create an intelligent filtering system for your ski runs:

1. **Add difficulty filter** (5min)
   ```tsx
   // app/components/SkiRunFilter.tsx
   'use client'

   type Difficulty = 'all' | 'green' | 'blue' | 'black' | 'double-black'

   interface SkiRunFilterProps {
     selectedDifficulty: Difficulty
     onDifficultyChange: (difficulty: Difficulty) => void
     runCounts: Record<Difficulty, number>
   }

   export function SkiRunFilter({ selectedDifficulty, onDifficultyChange, runCounts }: SkiRunFilterProps) {
     const filters = [
       { key: 'all', label: 'All Runs', emoji: '🎿', color: 'bg-gray-100' },
       { key: 'green', label: 'Beginner', emoji: '🟢', color: 'bg-green-100' },
       { key: 'blue', label: 'Intermediate', emoji: '🔵', color: 'bg-blue-100' },
       { key: 'black', label: 'Advanced', emoji: '⚫', color: 'bg-gray-700 text-white' },
       { key: 'double-black', label: 'Expert', emoji: '⚫⚫', color: 'bg-black text-white' }
     ] as const

     return (
       <div className="mb-6">
         <h3 className="font-semibold mb-3">🎯 Filter by Difficulty</h3>
         <div className="flex flex-wrap gap-2">
           {filters.map(filter => (
             <button
               key={filter.key}
               onClick={() => onDifficultyChange(filter.key)}
               className={`px-3 py-2 rounded-full text-sm font-medium transition-all ${
                 selectedDifficulty === filter.key
                   ? `${filter.color} shadow-md scale-105`
                   : 'bg-white border hover:shadow-sm'
               }`}
             >
               {filter.emoji} {filter.label} ({runCounts[filter.key] || 0})
             </button>
           ))}
         </div>
       </div>
     )
   }
   ```

2. **Add conditions filter** (5min)
   - Perfect powder days ❄️
   - Groomed corduroy 🎿
   - Spring conditions ☀️
   - Variable conditions 🌤️

3. **Implement smart state management** (5min)
   - Use `useState` for filter state
   - Use `useMemo` to optimize filtered results
   - Add URL persistence with `useSearchParams`

### Part 2: Statistics Dashboard (10min)

1. **Create SkiStats component** (5min)
   ```tsx
   // app/components/SkiStats.tsx
   import { SkiRun } from '../types/task'
   import { useMemo } from 'react'

   interface SkiStatsProps {
     runs: SkiRun[]
   }

   export function SkiStats({ runs }: SkiStatsProps) {
     const stats = useMemo(() => {
       const completedRuns = runs.filter(run => run.completed)
       const totalVertical = completedRuns.reduce((sum, run) => sum + run.vertical, 0)
       const powderDays = runs.filter(run => run.conditions === 'powder').length
       const favoriteResort = getMostFrequentResort(runs)

       return {
         totalRuns: completedRuns.length,
         totalVertical,
         powderDays,
         favoriteResort,
         avgVertical: Math.round(totalVertical / completedRuns.length) || 0
       }
     }, [runs])

     return (
       <div className="card bg-gradient-to-br from-blue-50 to-purple-50">
         <h3 className="font-semibold text-lg mb-4">📊 Season Stats</h3>
         <div className="grid grid-cols-2 gap-4">
           <StatItem
             icon="🎿"
             label="Total Runs"
             value={stats.totalRuns.toString()}
           />
           <StatItem
             icon="📏"
             label="Total Vertical"
             value={`${stats.totalVertical.toLocaleString()} ft`}
           />
           <StatItem
             icon="❄️"
             label="Powder Days"
             value={stats.powderDays.toString()}
           />
           <StatItem
             icon="🏔️"
             label="Favorite Resort"
             value={stats.favoriteResort}
           />
         </div>
       </div>
     )
   }
   ```

2. **Add real-time updates** (5min)
   - Stats update automatically when runs change
   - Smooth animations for number changes
   - Progress bars for season goals

### Part 3: Performance Optimization (10min)

1. **Implement smart memoization** (5min)
   ```tsx
   // Optimize SkiRunItem component
   import { memo } from 'react'

   interface SkiRunItemProps {
     run: SkiRun
     onToggle: (id: string) => void
     onDelete: (id: string) => void
   }

   export const SkiRunItem = memo(function SkiRunItem({
     run,
     onToggle,
     onDelete
   }: SkiRunItemProps) {
     // Component implementation with memoized callbacks
     const handleToggle = useCallback(() => onToggle(run.id), [run.id, onToggle])
     const handleDelete = useCallback(() => onDelete(run.id), [run.id, onDelete])

     return (
       <div className={`card border-l-4 ${getDifficultyStyles(run.difficulty)}`}>
         {/* Ski run content */}
       </div>
     )
   })
   ```

2. **Add virtual scrolling for large lists** (5min)
   - Handle 100+ ski runs smoothly
   - Implement `react-window` or custom solution
   - Maintain filter/search performance

### Part 4: Error Boundaries & Resilience (5min)

1. **Create SkiErrorBoundary** (3min)
   ```tsx
   // app/components/SkiErrorBoundary.tsx
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
                 className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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
   ```

2. **Add graceful degradation** (2min)
   - Individual run failures don't break the app
   - Loading states for slow connections
   - Offline support indicators

## Expected File Structure 🗂️
```
02-react-patterns/start/
├── app/
│   ├── components/
│   │   ├── SkiRunFilter.tsx        ← New Filter Component
│   │   ├── SkiStats.tsx            ← New Statistics Dashboard
│   │   ├── SkiErrorBoundary.tsx    ← Error Handling
│   │   ├── SkiRunItem.tsx          ← Optimized Item Component
│   │   └── VirtualSkiList.tsx      ← Performance Optimization
│   ├── hooks/
│   │   ├── useSkiRunFilters.ts     ← Custom Filter Hook
│   │   └── useSkiStats.ts          ← Statistics Hook
│   └── utils/
│       └── skiRunHelpers.ts        ← Utility Functions
```

## Success Criteria ✅
- [ ] Difficulty and conditions filtering works smoothly
- [ ] Statistics dashboard updates in real-time
- [ ] Components are properly memoized (no unnecessary re-renders)
- [ ] Error boundaries catch and display ski-themed error messages
- [ ] Performance remains smooth with 50+ ski runs
- [ ] All TypeScript types are properly defined
- [ ] Filters persist in URL for sharing

## Bonus Challenges 🏆
If you finish early, add these epic features:
- **Smart Recommendations**: Suggest runs based on weather/skill
- **Run Comparison**: Compare multiple ski runs side-by-side
- **Social Features**: Share runs with skiing buddies
- **Gear Tracking**: Track which skis performed best
- **Weather Integration**: Real mountain weather data
- **Photo Upload**: Add photos to your epic runs

## React Patterns to Explore 🚀
- **Component Composition**: Build reusable, composable components
- **Smart Memoization**: Use `memo`, `useMemo`, `useCallback` strategically
- **Error Boundaries**: Graceful error handling with skiing humor
- **Custom Hooks**: Extract reusable logic into custom hooks
- **Performance Optimization**: Virtual scrolling and smart re-rendering

## Testing Your Work 🧪

### Performance Testing:
```tsx
// Add this to test component re-renders
import { StrictMode } from 'react'

// Wrap your app in StrictMode during development
// Watch the console for excessive re-renders
```

### Filter Testing:
```tsx
// Test with different run combinations
const testRuns = [
  { difficulty: 'green', conditions: 'groomed', completed: true },
  { difficulty: 'double-black', conditions: 'powder', completed: false },
  // Add 20+ runs to test performance
]
```

## Solution Reference 📖
When you're done or stuck, check `02-react-patterns/complete/` to see the full implementation with all React patterns mastered!

## Solution Hints 💡
<details>
<summary>Need help navigating these patterns? Click for hints!</summary>

**🎿 Memoization Hint**: Only memoize expensive calculations or when props frequently change. Profile first!

**❄️ Filter Hint**: Use `useMemo` for filtered lists and `useCallback` for filter functions to prevent re-renders.

**🏔️ Error Boundary Hint**: Error boundaries must be class components or use libraries like `react-error-boundary`.

**⚡ Performance Hint**: Look for objects/functions created in render. Move them outside or memoize them.

**🎯 Custom Hooks Hint**: Extract complex state logic into custom hooks for reusability and testing.

</details>

## What You'll Learn 🎓
- Advanced React patterns for real-world apps
- Performance optimization techniques
- Error handling and resilience strategies
- Custom hooks and reusable logic patterns
- Building maintainable, scalable component architectures

## Next Steps 🚠
These patterns will serve as the foundation for our TanStack Query session, where we'll add real-time data fetching and synchronization to your ski tracker! 🎿⚡