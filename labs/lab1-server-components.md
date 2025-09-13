# Lab 1: Server Components Challenge
**Time: 30 minutes**  
**Working Directory: `01-server-components/start/`**

## Objective
Convert the user preferences sidebar to use Server Components and add proper error handling.

## Getting Started
```bash
cd 01-server-components/start
npm install
npm run dev  # Runs on http://localhost:3001
```

## Current State
The application has a basic task list using Client Components with useEffect/useState. We need to add user preferences that load from the server using Server Components.

## Your Challenge

### Part 1: Create Server Component (15min)
Create a new `UserPreferences` component that:

1. **Fetch user preferences from server** (5min)
   ```tsx
   // app/components/UserPreferences.tsx
   async function getUserPreferences() {
     // Simulate API delay
     await new Promise(resolve => setTimeout(resolve, 800))
     
     return {
       theme: 'light',
       defaultPriority: 'medium',
       showCompleted: true,
       sortBy: 'createdAt'
     }
   }
   ```

2. **Display preferences in sidebar** (5min)
   - Theme toggle
   - Default priority setting
   - Task visibility options
   - Sort preferences

3. **Add to main layout** (5min)
   - Update the grid layout in `app/page.tsx`
   - Add proper spacing and styling

### Part 2: Error Handling (10min)
1. **Add error boundary** (5min)
   ```tsx
   // app/components/ErrorBoundary.tsx
   // Create a proper error boundary component
   ```

2. **Simulate error states** (5min)
   - Add random error simulation (20% chance)
   - Show user-friendly error messages
   - Add retry functionality

### Part 3: Loading States (5min)
1. **Create loading skeleton**
   - Match the design of the preferences panel
   - Add smooth transitions

2. **Add Suspense boundary**
   - Wrap UserPreferences in Suspense
   - Use your custom loading skeleton

## Expected File Structure
```
01-server-components/start/
├── app/
│   ├── components/
│   │   ├── UserPreferences.tsx     ← New Server Component
│   │   ├── ErrorBoundary.tsx       ← New Error Boundary
│   │   └── PreferencesSkeleton.tsx ← New Loading Component
│   ├── types/
│   │   └── preferences.ts          ← New Type Definitions
│   └── page.tsx                    ← Updated Layout
```

## Success Criteria
- [ ] UserPreferences loads data from server
- [ ] Proper loading states with skeleton
- [ ] Error boundary catches and handles errors
- [ ] Clean, accessible UI design
- [ ] TypeScript types are properly defined

## Bonus Challenges
If you finish early:
- Add preference persistence (localStorage simulation)
- Implement theme switching functionality
- Add animated transitions between states
- Create custom hook for preferences management

## Solution Reference
When you're done or stuck, check `01-server-components/complete/` to see the full implementation.

## Solution Hints
<details>
<summary>Stuck? Click for hints</summary>

**Hint 1**: Server Components run on the server, so you can use async/await directly in the component function.

**Hint 2**: Error boundaries need to be Client Components (`'use client'`) because they use lifecycle methods.

**Hint 3**: Use the same styling patterns as existing components for consistency.

**Hint 4**: Remember to handle the loading state in your main page component with Suspense.

</details>

## Next Steps
After completing this lab, we'll integrate these patterns into our main application and add more advanced Server Component features in the React Patterns session!