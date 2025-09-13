# Modern React Course

## Course Structure

This course is organized as a progressive build where students start with basic concepts and gradually add advanced features. Each section includes:
- **`/start`** - Starting point for that section
- **`/checkpoint`** - State after instructor demonstration
- **`/complete`** - Final solution after lab completion

## 📁 Folder Structure

```
react-data-cascadiajs /
├── 00-starter/                    # Initial project (basic Next.js setup)
├── 01-server-components/
│   ├── start/                     # Client Components (useEffect + useState)
│   ├── checkpoint/                # Post-demo: Basic Client Components
│   └── complete/                  # Post-lab: Server Components + Suspense
├── 02-react-patterns/
│   ├── start/                     # Basic components
│   ├── checkpoint/                # Post-demo: Added React.memo
│   └── complete/                  # Post-lab: Full optimization + error boundaries
├── 03-tanstack-query/
│   ├── start/                     # Server Components only
│   ├── checkpoint/                # Post-demo: Basic TanStack Query setup
│   └── complete/                  # Post-lab: Mutations + optimistic updates
├── 04-advanced-patterns/
│   ├── start/                     # Basic Query setup
│   ├── checkpoint/                # Post-demo: Search implementation
│   └── complete/                  # Post-lab: Infinite scrolling + caching
└── labs/                          # Lab instructions for each section
```

## Course Outline

### Morning Session (3 hours)

#### 9:00-10:30 - Server Components Fundamentals
- **Start**: `01-server-components/start` (Client Components with useEffect)
- **Build Together**: Convert TaskList to Server Component → **Checkpoint**
- **Lab Activity**: Students add UserPreferences + Suspense (30min)
- **Complete**: `01-server-components/complete` (Full Server Components implementation)

#### 10:45-12:00 - Advanced React Patterns  
- **Start**: `02-react-patterns/start` (Basic components)
- **Build Together**: Add React.memo, error boundaries
- **Lab Activity**: Optimize performance patterns (30min)
- **Complete**: `02-react-patterns/complete`

### Afternoon Session (3 hours)

#### 1:00-2:30 - Server State Management
- **Start**: `03-tanstack-query/start` (Server Components only)
- **Build Together**: Setup TanStack Query, mutations
- **Lab Activity**: Add real-time features (30min)
- **Complete**: `03-tanstack-query/complete` (Full Query integration)

#### 2:45-4:00 - Advanced Data Patterns
- **Start**: `04-advanced-patterns/start` (Basic Query setup)
- **Build Together**: Infinite scrolling, advanced caching
- **Lab Activity**: Performance optimization (30min) 
- **Complete**: `04-advanced-patterns/complete` (Production-ready)

## 🚀 Quick Start

### For Instructors:
```bash
cd 00-starter
npm install
npm run dev

cd 01-server-components/start && npm install && npm run dev  # :3001
cd 01-server-components/complete && npm install && npm run dev  # :3002
```

### For Students:
Students should start with `00-starter` and progressively work through each section following this flow:
1. Begin with `/start/` folder for each section
2. After instructor demo, reference `/checkpoint/` for the demonstrated code
3. Complete lab activities starting from the `/checkpoint/` state
4. Use `/complete/` folder as final reference if stuck

## Learning Objectives

By the end of this course, students will be able to:
- Convert between Server and Client Components appropriately
- Implement proper loading and error states
- Use TanStack Query for complex data management  
- Apply React performance optimization patterns
- Build real-time, responsive user interfaces
- Deploy production-ready React applications

## 📖 Additional Resources

- **`CURRICULUM.md`** - Detailed session breakdown and timing
- **`INSTRUCTOR_GUIDE.md`** - Teaching notes and troubleshooting
- **`/labs`** - Hands-on lab activities for each section

---

*This progressive structure ensures students build confidence while creating a real application they can showcase in their portfolio.*