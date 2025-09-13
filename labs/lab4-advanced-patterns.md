# Lab 4: Advanced Data Patterns & Performance
**Time: 30 minutes**  
**Working Directory: `04-advanced-patterns/start/`**

## Getting Started
```bash
cd 04-advanced-patterns/start
npm install
npm run dev  # Runs on http://localhost:3007
```

## Objective
Master advanced caching strategies, implement infinite scrolling, and create a production-ready data layer for TaskFlow Pro.

## Setup
Ensure you have the TanStack Query DevTools installed to monitor cache behavior:

```tsx
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
```

## Your Challenge

### Part 1: Infinite Scrolling (12min)

1. **Implement Infinite Query** (7min)
   ```tsx
   // app/hooks/useInfiniteTasks.ts
   export function useInfiniteTasks(filter?: TaskFilter) {
     return useInfiniteQuery({
       queryKey: ['tasks', 'infinite', filter],
       queryFn: ({ pageParam = 0 }) => fetchTasksPage({
         offset: pageParam,
         limit: 20,
         filter
       }),
       getNextPageParam: (lastPage, pages) => {
         // Implement pagination logic
       },
       // Add proper configuration for performance
     })
   }
   ```

2. **Create Infinite Scroll UI** (5min)
   - Detect when user reaches bottom
   - Load more button as fallback
   - Proper loading states
   - Handle end of data

### Part 2: Advanced Search (10min)

1. **Debounced Search** (6min)
   ```tsx
   // app/hooks/useTaskSearch.ts
   export function useTaskSearch() {
     const [searchTerm, setSearchTerm] = useState('')
     const debouncedSearch = useDebounce(searchTerm, 300)
     
     const searchQuery = useQuery({
       queryKey: ['tasks', 'search', debouncedSearch],
       queryFn: () => searchTasks(debouncedSearch),
       enabled: debouncedSearch.length >= 2,
       // Add advanced configuration
     })
     
     return { searchTerm, setSearchTerm, ...searchQuery }
   }
   ```

2. **Search UI with Highlights** (4min)
   - Real-time search as user types
   - Highlight matching text
   - Search suggestions
   - Clear search functionality

### Part 3: Cache Optimization (8min)

1. **Smart Prefetching** (4min)
   ```tsx
   // app/hooks/usePrefetchStrategies.ts
   export function usePrefetchStrategies() {
     const queryClient = useQueryClient()
     
     // Prefetch on hover
     const prefetchTask = (taskId: string) => {
       queryClient.prefetchQuery({
         queryKey: ['task', taskId],
         queryFn: () => fetchTaskDetails(taskId),
         staleTime: 5 * 60 * 1000, // 5 minutes
       })
     }
     
     // Prefetch next page
     const prefetchNextPage = (currentPage: number) => {
       // Implement next page prefetching
     }
     
     return { prefetchTask, prefetchNextPage }
   }
   ```

2. **Cache Warming** (4min)
   - Preload critical data on app start
   - Background refresh of stale data
   - Intelligent cache invalidation
   - Memory usage optimization

## Advanced Features to Implement

### Performance Optimization:
```tsx
// Configure query defaults for optimal performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000,   // 10 minutes
      retry: (failureCount, error) => {
        // Smart retry logic based on error type
      },
      refetchOnWindowFocus: false,
      refetchOnReconnect: 'always'
    }
  }
})
```

### Data Synchronization:
```tsx
// Keep related queries in sync
function useTaskSync() {
  const queryClient = useQueryClient()
  
  const updateAllTaskQueries = (updatedTask: Task) => {
    // Update task in all relevant queries:
    // - Main task list
    // - Filtered lists
    // - Search results  
    // - Infinite scroll pages
    // - Individual task cache
  }
}
```

## Code Challenges

### Challenge 1: Infinite Scroll Performance
```tsx
// Optimize this for 10,000+ items
function VirtualizedTaskList({ tasks, hasNextPage, fetchNextPage }) {
  // Implement virtualization
  // Only render visible items
  // Smooth scrolling
  // Proper focus management
}
```

### Challenge 2: Complex Cache Updates
```tsx
// When a task is updated, update it everywhere
function useUpdateTaskEverywhere() {
  return useMutation({
    mutationFn: updateTaskAPI,
    onSuccess: (updatedTask) => {
      // Update in:
      // 1. Main task list
      // 2. All filtered lists
      // 3. Search results
      // 4. Infinite scroll pages
      // 5. Individual task cache
      // 6. Related user queries
      
      // Challenge: Do this efficiently!
    }
  })
}
```

### Challenge 3: Smart Background Sync
```tsx
// Only sync what's needed, when it's needed
function useSmartSync() {
  // Sync more frequently for:
  // - Currently visible data
  // - Data user interacted with recently
  // - Critical business data
  
  // Sync less frequently for:
  // - Data that's rarely accessed
  // - Heavy/expensive queries
  // - Non-critical data
}
```

## Success Criteria
- [ ] Infinite scrolling works smoothly with 1000+ tasks
- [ ] Search provides instant feedback with debouncing
- [ ] Cache updates are consistent across all views
- [ ] Performance is optimized (use DevTools to verify)
- [ ] Memory usage stays reasonable
- [ ] Network requests are minimized
- [ ] User experience is seamless

## Performance Benchmarks

### Target Metrics:
- **Scroll Performance**: 60fps with 10,000+ items
- **Search Response**: Sub-100ms feedback
- **Cache Hit Ratio**: >80% for repeated queries
- **Memory Usage**: <50MB for typical session
- **Network Requests**: <10 per user interaction

### Monitoring Tools:
```tsx
// Add performance monitoring
function PerformanceMonitor() {
  useEffect(() => {
    // Monitor React Query cache size
    // Track network request frequency
    // Measure component render times
    // Log user interaction delays
  }, [])
}
```

## Bonus Challenges
- **Background Tab Sync**: Different sync strategies when tab is inactive
- **Connection-Aware**: Adapt behavior based on network speed
- **Predictive Prefetching**: Use ML to predict what user will need next
- **Cross-Tab Synchronization**: Sync data between multiple open tabs
- **Progressive Enhancement**: App works with JavaScript disabled

## Testing Your Implementation

### Stress Tests:
1. **Large Dataset**: Test with 10,000+ tasks
2. **Slow Network**: Simulate 3G connection
3. **High Latency**: Add 2-second API delays
4. **Memory Pressure**: Monitor for memory leaks
5. **Rapid Interactions**: Spam clicks and scrolling

### User Experience Tests:
1. **Search Responsiveness**: Type quickly and verify smooth updates
2. **Scroll Performance**: Scroll through long lists smoothly
3. **Tab Switching**: Verify data stays fresh across tab switches
4. **Network Issues**: Test offline/online transitions

## Solution Architecture

### Expected File Structure:
```
app/
├── hooks/
│   ├── useInfiniteTasks.ts
│   ├── useTaskSearch.ts
│   ├── usePrefetchStrategies.ts
│   └── useSmartSync.ts
├── components/
│   ├── VirtualizedTaskList.tsx
│   ├── SearchInput.tsx
│   └── InfiniteScrollContainer.tsx
└── utils/
    ├── queryConfig.ts
    └── cacheUpdates.ts
```

## Solution Hints
<details>
<summary>Need help? Click for guidance</summary>

**Infinite Scroll Hint**: Use `react-window` or `@tanstack/react-virtual` for virtualization.

**Search Hint**: Combine `useDeferredValue` with `useQuery` for optimal search UX.

**Caching Hint**: Use `queryClient.setQueriesData()` with query filters to update multiple caches at once.

**Performance Hint**: Profile with React DevTools Profiler to find actual bottlenecks.

</details>

## Real-world Applications
This lab teaches patterns you'll use in production:
- E-commerce product catalogs
- Social media feeds  
- Document management systems
- Real-time dashboards
- Collaborative applications

## Next Steps
Congratulations! You've built a production-ready React application with modern patterns. Consider extending this further with authentication, real-time WebSockets, or mobile responsiveness!