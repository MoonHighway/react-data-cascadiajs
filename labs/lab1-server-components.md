# Lab 1: SkiTracker Pro - Server Components Challenge 🎿
**Working Directory: `01-server-components/start/`**

## Objective
Transform your ski run tracker from Client Components to modern React 19 Server Components, and add a skier profile with weather conditions using the new `use()` hook!

## Getting Started
```bash
cd 01-server-components/start
npm install
npm run dev  # Runs on http://localhost:3001
```

## Current State ❄️
The SkiTracker Pro app currently uses Client Components with useEffect/useState to load ski runs. We'll modernize it with React 19 Server Components and add mountain weather using the new `use()` hook!

## Your Challenge 🏔️

### Part 1: Create Skier Profile Server Component 
Create a new `SkierProfile` component that loads from the server:

1. **Fetch skier profile from server** 
   ```tsx
   // app/components/SkierProfile.tsx
   async function getSkierProfile() {
     // Simulate mountain API delay
     await new Promise(resolve => setTimeout(resolve, 800))

     return {
       name: 'Alpine Explorer',
       skillLevel: 'Advanced',
       preferredTerrain: 'Off-Piste Powder',
       favoriteResort: 'Whistler Blackcomb',
       totalVertical: 125000, // feet this season
       runsCompleted: 47,
       favoriteDifficulty: 'black'
     }
   }
   ```

2. **Display profile in sidebar** 
   - Skier avatar and name
   - Skill level badge (🟢 Beginner, 🔵 Intermediate, ⚫ Advanced, ⚫⚫ Expert)
   - Season stats (total vertical, runs completed)
   - Favorite terrain and resort

3. **Add to main layout** (5min)
   - Update the grid layout in `app/page.tsx`
   - Add proper mountain-themed styling

### Part 2: Weather Widget with React 19 use() Hook (10min)
1. **Create WeatherWidget with use() hook** 
   ```tsx
   // app/components/WeatherWidget.tsx
   'use client'
   import { use } from 'react'

   export function WeatherWidget({ weatherPromise }) {
     const weather = use(weatherPromise) // React 19 feature!

     return (
       <div className="mountain-weather">
         <h3>🏔️ Mountain Conditions</h3>
         <div>Temperature: {weather.temp}°F</div>
         <div>Fresh Snow: {weather.snowfall}"</div>
         <div>Wind: {weather.windSpeed}mph</div>
         <div>Visibility: {weather.visibility}</div>
       </div>
     )
   }
   ```

2. **Simulate mountain conditions** 
   - Add random weather simulation
   - Show powder alerts when fresh snow > 6"
   - Display avalanche warnings for extreme conditions
   - Add resort status (open/closed lifts)

### Part 3: Enhanced Loading & Error States 
1. **Create mountain-themed skeletons**
   - Ski lift loading animation
   - Snow falling animation for weather widget
   - Mountain silhouette for profile loading

2. **Add Suspense boundaries**
   - Wrap SkierProfile and WeatherWidget in Suspense
   - Use custom mountain-themed loading components

## Expected File Structure 🗂️
```
01-server-components/start/
├── app/
│   ├── components/
│   │   ├── SkierProfile.tsx        ← New Server Component
│   │   ├── WeatherWidget.tsx       ← React 19 use() Hook Demo
│   │   ├── MountainSkeleton.tsx    ← Themed Loading Component
│   │   └── SkiErrorBoundary.tsx    ← Mountain-themed Error Boundary
│   ├── types/
│   │   ├── skier.ts               ← Skier Profile Types
│   │   └── weather.ts             ← Weather Data Types
│   └── page.tsx                    ← Updated with Skiing Theme
```

## Success Criteria ✅
- [ ] SkierProfile loads data from server using async Server Component
- [ ] WeatherWidget demonstrates React 19 `use()` hook
- [ ] Mountain-themed loading states with ski animations
- [ ] Error boundaries with skiing humor ("Oops! Wiped out!")
- [ ] All TypeScript types properly defined
- [ ] Proper Suspense boundary usage

## Bonus Challenges 🏆
If you finish early, add these epic features:
- **Lift Status Component**: Show which lifts are open/closed
- **Trail Map Integration**: Add a mini trail map widget
- **Powder Alerts**: Real-time notifications for fresh snow
- **Buddy System**: Show other skiers on the mountain
- **Equipment Tracker**: Track ski gear and conditions

## React 19 Features to Explore 🚀
- **Server Components**: Async functions that run on the server
- **use() Hook**: New primitive for handling promises and context
- **Enhanced Suspense**: Better streaming and error boundaries
- **Improved Performance**: Automatic optimizations

## Solution Reference 📖
When you're done or stuck, check `01-server-components/complete/` to see the full implementation with all React 19 features!

## Solution Hints 💡
<details>
<summary>Need help hitting the slopes? Click for hints!</summary>

**⛷️ Server Component Hint**: Server Components are async functions that run on the server. No more useEffect needed!

**❄️ use() Hook Hint**: The `use()` hook can unwrap promises directly in render. It's like await but for React components!

**🏔️ Styling Hint**: Use mountain colors (blues, whites, grays) and skiing emojis to make it feel authentic.

**🎿 Error Handling Hint**: Error boundaries need to be Client Components. Make them skiing-themed with fun messages!

**⚡ Performance Hint**: Server Components reduce JavaScript bundle size - perfect for mountain apps with slow connections!

</details>

## What You'll Learn 🎓
- Modern React 19 Server Components
- The revolutionary `use()` hook for promises
- Advanced Suspense patterns
- Progressive enhancement techniques
- Building engaging, themed applications

## Next Steps 🚠
After mastering these slopes, we'll add advanced patterns, performance optimizations, and real-time features in the next sessions. You're building a production-ready ski tracking app! 🎿⚡