# Lab 3: TanStack Query with Real-time Ski Resort Data
**Time: 45 minutes**
**Working Directory: `03-tanstack-query/start/`**

## Getting Started
```bash
cd 03-tanstack-query/start
npm install
npm run dev  # Runs on http://localhost:3007
```

## Objective
Transform the static Snowtooth Resort app into a real-time, data-driven application using TanStack Query to fetch live ski lift status from the Snowtooth API.

## Your Challenge

### Part 1: Setup TanStack Query (15 minutes)

1. **Install and Configure TanStack Query** (8 minutes)
   ```bash
   npm install @tanstack/react-query @tanstack/react-query-devtools
   ```

   Create the providers:
   ```tsx
   // app/providers.tsx
   'use client'

   import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
   import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
   import { useState } from 'react'

   export function Providers({ children }: { children: React.ReactNode }) {
     const [queryClient] = useState(() => new QueryClient({
       defaultOptions: {
         queries: {
           staleTime: 1000 * 60 * 5, // 5 minutes
           refetchOnWindowFocus: false,
         },
       },
     }))

     return (
       <QueryClientProvider client={queryClient}>
         {children}
         <ReactQueryDevtools initialIsOpen={false} />
       </QueryClientProvider>
     )
   }
   ```

2. **Update Layout to Use Providers** (7 minutes)
   ```tsx
   // app/layout.tsx
   import { Providers } from './providers'

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en">
         <body className="bg-gray-50 text-gray-900">
           <Providers>
             <main className="min-h-screen">
               {children}
             </main>
           </Providers>
         </body>
       </html>
     )
   }

### Part 2: Fetch Real Ski Lift Data (15 minutes)

1. **Create Lift Type Definitions** (5 minutes)
   ```tsx
   // app/types/lift.ts
   export type LiftStatus = 'OPEN' | 'CLOSED' | 'HOLD'
   export type TrailDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert'

   export interface Trail {
     id: string
     name: string
     status: 'OPEN' | 'CLOSED'
     difficulty: TrailDifficulty
     groomed: boolean
     trees: boolean
     night: boolean
   }

   export interface Lift {
     id: string
     name: string
     status: LiftStatus
     capacity: number
     night: boolean
     elevationGain: number
     trailAccess: Trail[]
   }
   ```

2. **Create API Route to Avoid CORS** (5 minutes)
   ```tsx
   // app/api/lifts/route.ts
   import { NextResponse } from 'next/server'

   export async function GET() {
     try {
       const response = await fetch('https://snowtooth-api-rest.fly.dev/')

       if (!response.ok) {
         throw new Error(`Failed to fetch: ${response.status}`)
       }

       const data = await response.json()
       return NextResponse.json(data)
     } catch (error) {
       console.error('Error fetching lift data:', error)
       return NextResponse.json(
         { error: 'Failed to fetch lift data' },
         { status: 500 }
       )
     }
   }
   ```

3. **Implement Data Fetching with useQuery** (5 minutes)
   ```tsx
   // app/components/LiftStatus.tsx
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

   export function LiftStatus() {
     const { data: lifts, isLoading, error, isError } = useQuery({
       queryKey: ['lifts'],
       queryFn: fetchLifts,
     })

     if (isLoading) {
       return <div>Loading ski lift data...</div>
     }

     if (isError) {
       return <div>Error: {error?.message}</div>
     }

     // Your UI code here...
   }
   ```

### Part 3: Advanced Features (15 minutes)

1. **Add Loading States and Error Handling** (8 minutes)
   ```tsx
   // Add skeleton loading components
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
   ```

2. **Add Auto-refresh** (7 minutes)
   ```tsx
   const { data: lifts, isLoading, error } = useQuery({
     queryKey: ['lifts'],
     queryFn: fetchLifts,
     refetchInterval: 1000 * 60 * 2, // Refetch every 2 minutes
   })
   ```

## Expected Features

### Real-time Data Fetching:
- Live ski lift status from Snowtooth API
- Auto-refresh every 2 minutes
- Smooth loading states with skeleton UI
- Helpful error messages with retry options

### Query Management:
- Efficient caching to reduce API calls
- Background data refetching
- DevTools for debugging queries
- Proper TypeScript integration

## Success Criteria
- [ ] App loads live ski lift data from the API
- [ ] Loading states show skeleton components
- [ ] Error states display helpful messages
- [ ] Data auto-refreshes every 2 minutes
- [ ] React Query DevTools are accessible
- [ ] No TypeScript errors
- [ ] UI matches the static version but with live data

## Testing Scenarios

### Test Your Implementation:
1. **Normal Operation**: Verify lifts load from API
2. **Network Issues**: Disconnect internet and check error handling
3. **Slow Network**: Throttle network to see loading states
4. **DevTools**: Open React Query DevTools to inspect queries
5. **Auto-refresh**: Wait 2 minutes to see data refresh

### API Endpoint Information:
- **External API**: `https://snowtooth-api-rest.fly.dev/` (accessed via Next.js API route)
- **Your API Route**: `/api/lifts`
- **Method**: GET
- **Response**: Array of Lift objects
- **No authentication required**
- **Note**: We use an API route to avoid CORS issues when calling the external API from the browser

## Bonus Challenges
- **Manual Refresh**: Add a refresh button to refetch data
- **Status Filtering**: Filter lifts by status (OPEN, CLOSED, HOLD)
- **Night Skiing Filter**: Show only lifts with night skiing
- **Trail Count Sorting**: Sort lifts by number of open trails
- **Custom Stale Time**: Experiment with different staleTime values

## Solution Hints
<details>
<summary>Need guidance? Click for hints</summary>

**Setup Hint**: Remember to wrap your app with QueryClientProvider at the root level.

**Loading States Hint**: Use the isLoading, isError, and error values returned from useQuery.

**TypeScript Hint**: Define your Lift and Trail interfaces to match the API response structure.

**Auto-refresh Hint**: Use the refetchInterval option in your useQuery configuration.

**DevTools Hint**: Import ReactQueryDevtools and add it inside your QueryClientProvider.

</details>

## API Response Structure
```tsx
// The Snowtooth API returns an array like this:
[
  {
    "id": "jolly-roger",
    "name": "Jolly Roger",
    "status": "OPEN",
    "capacity": 6,
    "night": true,
    "elevationGain": 1350,
    "trailAccess": [
      {
        "id": "blue-bird",
        "name": "Blue Bird",
        "status": "OPEN",
        "difficulty": "intermediate",
        "groomed": true,
        "trees": false,
        "night": true
      }
      // ... more trails
    ]
  }
  // ... more lifts
]
```

## Next Steps
In the next lab, we'll add mutations and advanced query patterns for a complete data management solution!