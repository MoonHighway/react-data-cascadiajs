# Modern React Course

## Course Structure

This course is organized as a progressive build where students start with basic concepts and gradually add advanced features. Each section includes:
- **`/start`** - Starting point for that section
- **`/checkpoint`** - State after instructor demonstration
- **`/complete`** - Final solution after lab completion

## 📁 Folder Structure

```
react-data-cascadiajs /
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

* Server Components
* Working with Data
* React Patterns
* Tanstack Query
* Advanced Patterns

## Learning Objectives

By the end of this course, students will be able to:
- Convert between Server and Client Components appropriately
- Implement proper loading and error states
- Use TanStack Query for complex data management  
- Apply React performance optimization patterns
- Build real-time, responsive user interfaces
- Deploy production-ready React applications

## React Data & TanStack Query – Useful Links

### Official Documentation
- [React Docs (beta)](https://react.dev/) – The modern React documentation site.
- [TanStack Query Docs](https://tanstack.com/query/latest) – Official docs for React Query / TanStack Query.
- [TanStack GitHub Repo](https://github.com/TanStack/query) – Source code, issues, and discussions.
- [Next.js Docs](https://nextjs.org/docs) – Official docs for Next.js (framework by Vercel).

### Tutorials & Guides
- [Getting Started with TanStack Query](https://tanstack.com/query/latest/docs/react/overview) – Introductory guide from the official docs.
- [React Query: Data Fetching Made Simple](https://tkdodo.eu/blog/react-query-data-fetching) – Great blog series by TkDodo.
- [React Query Tutorial (freeCodeCamp)](https://www.freecodecamp.org/news/react-query-tutorial/) – Beginner-friendly walkthrough.
- [TanStack Query v5 Upgrade Guide](https://tanstack.com/query/v5/docs/react/guides/migrating-to-v5) – Important for understanding changes if migrating.
- [Data Fetching in Next.js](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching) – Overview of data fetching strategies in Next.js.

### API & Data Handling
- [REST API with Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) – MDN guide for working with Fetch.
- [Axios GitHub](https://github.com/axios/axios) – Popular HTTP client for API requests.
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) – Free fake REST API for testing.
- [PokéAPI](https://pokeapi.co/) – Fun dataset for practice with queries.
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) – Vercel’s hosted Postgres database.
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv) – Managed Redis-compatible key-value store.

### Patterns & Best Practices
- [React Query Best Practices (TkDodo)](https://tkdodo.eu/blog/practical-react-query) – Covers caching, invalidation, and more.
- [React Query Performance Optimizations](https://tanstack.com/query/latest/docs/react/guides/important-defaults) – Official guide on defaults and performance.
- [State Management with React Query](https://blog.logrocket.com/react-query-data-fetching-state-management/) – Explains how React Query overlaps/replaces traditional state management.
- [Next.js Caching & Revalidation](https://nextjs.org/docs/app/building-your-application/caching) – How caching integrates with data fetching on Vercel.

### Advanced Topics
- [Infinite Queries](https://tanstack.com/query/latest/docs/react/guides/infinite-queries) – Loading paginated or infinite data.
- [Mutations](https://tanstack.com/query/latest/docs/react/guides/mutations) – For POST, PUT, DELETE requests.
- [Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates) – Handle UI updates before the server responds.
- [Suspense Mode](https://tanstack.com/query/latest/docs/react/guides/suspense) – Experimental React Suspense integration.
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions) – Write mutations as server-side functions.

### Vercel-Specific Resources
- [Vercel Docs](https://vercel.com/docs) – Main documentation hub.
- [Vercel Deployment Guide](https://vercel.com/docs/deployments/overview) – How to deploy apps to Vercel.
- [Next.js App Router](https://nextjs.org/docs/app) – Official docs for the modern App Router.
- [Streaming & Suspense in Next.js](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming) – Key for real-time data UX.
- [Vercel AI SDK](https://sdk.vercel.ai/docs) – AI integration kit, often used alongside data fetching.
- [Vercel Examples GitHub](https://github.com/vercel/examples) – Code samples, many with Next.js + data fetching patterns.
- [Next.js & TanStack Query Example](https://github.com/vercel/examples/tree/main/edge-middleware/react-query) – Sample showing them together.

### Community & Extras
- [TanStack Discord](https://tlinz.dev/discord) – Active community for help and discussions.
- [TanStack YouTube Channel](https://www.youtube.com/c/TanStack) – Video tutorials, talks, and updates.
- [Awesome TanStack Query](https://github.com/tanstack/awesome-query) – Curated community resources.
- [Vercel YouTube Channel](https://www.youtube.com/c/VercelHQ) – Talks, tutorials, and product launches.
