# Lab 3: TanStack Query Real-time Features
**Time: 30 minutes**  
**Working Directory: `03-tanstack-query/start/`**

## Getting Started
```bash
cd 03-tanstack-query/start
npm install
npm run dev  # Runs on http://localhost:3005
```

## Objective
Transform TaskFlow Pro into a real-time, responsive application using TanStack Query's advanced features.

## Setup Required
Make sure TanStack Query is configured in your app:

```tsx
// app/providers/QueryProvider.tsx (should exist after our session)
import { QueryClient, QueryProvider } from '@tanstack/react-query'
```

## Your Challenge

### Part 1: Task Mutations (15min)

1. **Implement Task Toggle** (8min)
   ```tsx
   // app/hooks/useTasks.ts
   export function useToggleTask() {
     return useMutation({
       mutationFn: async ({ taskId, completed }: ToggleTaskData) => {
         // Simulate API call
         await new Promise(resolve => setTimeout(resolve, 500))
         if (Math.random() < 0.1) throw new Error('Network error')
         
         return { taskId, completed }
       },
       // Add optimistic updates here
       // Add error handling here
       // Add success handling here
     })
   }
   ```

   **Requirements:**
   - Optimistic UI updates (instant feedback)
   - Error rollback if API fails
   - Toast notifications for success/error
   - Loading states during mutation

2. **Add Task Creation** (7min)
   - Convert CreateTaskForm to use mutations
   - Add form validation
   - Clear form on success
   - Handle creation errors gracefully

### Part 2: Real-time Simulation (10min)

1. **Implement Background Sync** (5min)
   ```tsx
   // Simulate real-time updates from other users
   export function useRealtimeSync() {
     const queryClient = useQueryClient()
     
     useEffect(() => {
       const interval = setInterval(() => {
         // Simulate receiving updates from other users
         // Randomly toggle a task or add a new one
         // Update the cache accordingly
       }, 10000) // Every 10 seconds
       
       return () => clearInterval(interval)
     }, [])
   }
   ```

2. **Add Collaborative Features** (5min)
   - Show "Last updated by" information
   - Add typing indicators simulation
   - Display recent activity feed

### Part 3: Advanced Query Features (5min)

1. **Implement Query Filtering**
   ```tsx
   export function useFilteredTasks(filter: TaskFilter) {
     return useQuery({
       queryKey: ['tasks', 'filtered', filter],
       queryFn: () => fetchFilteredTasks(filter),
       // Add proper configuration
     })
   }
   ```

2. **Add Dependent Queries**
   - Load user preferences first
   - Then load tasks based on preferences
   - Handle loading dependencies properly

## Expected Features

### Real-time Behavior:
- Tasks update automatically when others make changes
- Optimistic UI for all user actions
- Conflict resolution for simultaneous edits
- Activity feed showing recent changes

### Error Resilience:
- Automatic retry on network failures
- User notification for permanent failures
- Offline support simulation
- Queue actions when offline

## Code Challenges

### Challenge 1: Optimistic Updates
```tsx
// Make this work with proper optimism and rollback
function useToggleTask() {
  return useMutation({
    mutationFn: toggleTaskAPI,
    onMutate: async (variables) => {
      // Cancel outgoing requests
      // Snapshot current state
      // Optimistically update cache
    },
    onError: (error, variables, context) => {
      // Rollback using snapshot
      // Show error message
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch if needed
    }
  })
}
```

### Challenge 2: Real-time Conflicts
```tsx
// Handle when two users edit the same task
function handleTaskConflict(localTask: Task, remoteTask: Task) {
  // Implement conflict resolution strategy:
  // 1. Last-write-wins?
  // 2. Merge changes?
  // 3. Ask user to resolve?
}
```

### Challenge 3: Background Sync
```tsx
// Keep data fresh even when user isn't actively using the app
function useBackgroundSync() {
  // Implement smart background fetching
  // Only sync when data might be stale
  // Respect user's network conditions
}
```

## Success Criteria
- [ ] Task completion toggles work instantly (optimistic)
- [ ] Failed operations roll back gracefully
- [ ] Real-time updates appear from "other users"
- [ ] Loading states are smooth and informative
- [ ] Error messages are helpful and actionable
- [ ] No unnecessary network requests
- [ ] Cache stays consistent across operations

## Testing Scenarios

### Test Your Mutations:
1. Toggle task while offline (simulate)
2. Toggle task with slow network (3G simulation)
3. Toggle task that another user just deleted
4. Create task with duplicate name
5. Rapid-fire multiple toggles

### Test Real-time Features:
1. Open app in two browser tabs
2. Make changes in one tab
3. Verify other tab updates automatically
4. Test with network interruptions

## Bonus Challenges
- **Infinite Scrolling**: Load more tasks as user scrolls
- **Search with Debouncing**: Real-time search with performance
- **Offline Queue**: Store actions when offline, sync when online
- **WebSocket Integration**: Replace polling with real WebSocket updates
- **Optimistic Deletions**: Handle delete operations optimistically

## Solution Hints
<details>
<summary>Need guidance? Click for hints</summary>

**Optimistic Updates Hint**: Use the `onMutate` callback to immediately update the cache, save a snapshot for rollback.

**Real-time Hint**: Use `queryClient.invalidateQueries()` to trigger refetches, or `setQueryData()` for direct cache updates.

**Error Handling Hint**: Always provide user feedback. Silent failures are the worst UX.

**Performance Hint**: Use `staleTime` and `gcTime` to reduce unnecessary requests.

</details>

## API Simulation Helpers
```tsx
// Use these to simulate realistic API behavior
export const api = {
  toggleTask: (taskId: string) => simulateAPI(() => ({ taskId, completed: !currentState })),
  createTask: (task: NewTask) => simulateAPI(() => ({ ...task, id: generateId() })),
  deleteTask: (taskId: string) => simulateAPI(() => ({ taskId }))
}

function simulateAPI<T>(fn: () => T, delay = 500): Promise<T> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.9) resolve(fn())
      else reject(new Error('Simulated network error'))
    }, delay)
  })
}
```

## Next Steps
These real-time patterns will be extended in our final lab with advanced caching strategies!