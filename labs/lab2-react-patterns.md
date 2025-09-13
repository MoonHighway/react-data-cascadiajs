# Lab 2: Advanced React Patterns
**Time: 30 minutes**  
**Working Directory: `02-react-patterns/start/`**

## Getting Started
```bash
cd 02-react-patterns/start
npm install
npm run dev  # Runs on http://localhost:3003
```

## Objective
Optimize the TaskFlow Pro application using React performance patterns and advanced error handling.

## Current Challenge
Our task list works but could be more performant and resilient. Let's add professional-grade optimizations.

## Your Challenge

### Part 1: Performance Optimization (15min)

1. **Optimize TaskItem Component** (8min)
   ```tsx
   // Optimize this component to prevent unnecessary re-renders
   // Consider: What props actually change?
   // Consider: What computations are expensive?
   
   export function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
     // Add performance optimizations here
   }
   ```

   Requirements:
   - Use React.memo appropriately
   - Optimize callback functions
   - Memoize expensive calculations (priority colors, date formatting)

2. **Optimize TaskList Component** (7min)
   - Prevent re-rendering when task order hasn't changed
   - Optimize the filtering and sorting logic
   - Add virtual scrolling for large lists (bonus)

### Part 2: Advanced Error Boundaries (10min)

1. **Create Task-Level Error Boundary** (5min)
   ```tsx
   // app/components/TaskErrorBoundary.tsx
   // This should catch errors in individual tasks
   // without breaking the entire list
   ```

   Features needed:
   - Isolate errors to single task items
   - Show "Task failed to load" state
   - Retry functionality
   - Error reporting (console.error with task ID)

2. **Add Global Error Boundary** (5min)
   - Wrap the entire application
   - Provide fallback UI for catastrophic errors
   - Add error reporting capability

### Part 3: Advanced Suspense Patterns (5min)

1. **Coordinate Loading States**
   ```tsx
   // Create coordinated loading for multiple components
   <Suspense fallback={<AppLoadingSkeleton />}>
     <TaskList />
     <UserPreferences />
     <RecentActivity />
   </Suspense>
   ```

2. **Implement Selective Suspense**
   - Different loading strategies for different sections
   - Priority-based loading (critical content first)

## Expected Enhancements

### Performance Metrics to Achieve:
- Reduce TaskItem re-renders by 80%
- Optimize task filtering performance
- Smooth scrolling with 100+ tasks
- Sub-100ms interaction response

### Error Resilience:
- Individual task failures don't break the app
- Graceful degradation for network issues
- User-friendly error messages
- One-click recovery options

## Code Challenges

### Challenge 1: Smart Memoization
```tsx
// Optimize this expensive computation
function TaskItem({ task, users, categories, settings }) {
  const displayData = computeTaskDisplay(task, users, categories, settings)
  const priorityStyle = getPriorityStyle(task.priority, settings.theme)
  const relativeDate = formatRelativeDate(task.createdAt)
  
  return (
    <div className={priorityStyle}>
      {displayData.title} - {relativeDate}
    </div>
  )
}
```

### Challenge 2: Error Recovery
```tsx
// Add sophisticated error handling
function TaskList() {
  const { data: tasks, error } = useQuery(['tasks'])
  
  // Handle different types of errors:
  // - Network errors (retry automatically)
  // - Server errors (show user-friendly message)
  // - Data validation errors (report and continue)
  // - Permission errors (redirect to login)
}
```

## Success Criteria
- [ ] TaskItem components don't re-render unnecessarily
- [ ] Individual task errors don't break the entire list
- [ ] Loading states are coordinated and smooth
- [ ] Error messages are user-friendly and actionable
- [ ] Performance is measurably improved
- [ ] Code follows React best practices

## Bonus Challenges
- **Virtual Scrolling**: Handle 10,000+ tasks smoothly
- **Progressive Enhancement**: App works without JavaScript
- **Error Analytics**: Track and report error patterns
- **A11y Optimization**: Screen reader friendly error states

## Testing Your Work

### Performance Testing:
```tsx
// Add this to test component re-renders
import { StrictMode } from 'react'

// Wrap your app in StrictMode during development
// Watch the console for excessive re-renders
```

### Error Testing:
```tsx
// Add these props to simulate errors
<TaskItem 
  task={task} 
  simulateError={Math.random() < 0.1} // 10% error rate
/>
```

## Solution Hints
<details>
<summary>Need help? Click for hints</summary>

**Performance Hint**: Look for objects/functions being created in render. Move them outside or memoize them.

**Error Boundary Hint**: Error boundaries must be class components or use the `react-error-boundary` library.

**Suspense Hint**: You can nest Suspense boundaries for more granular loading control.

**Memoization Hint**: Don't memo everything! Profile first, then optimize the actual bottlenecks.

</details>

## Next Steps
These patterns will serve as the foundation for our afternoon session on advanced data management!