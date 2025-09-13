'use client'

import { useState } from 'react'
import { TaskList } from './components/TaskList'
import { InfiniteTaskList } from './components/InfiniteTaskList'
import { CreateTaskForm } from './components/CreateTaskForm'
import { Header } from './components/Header'
import { SearchInput } from './components/SearchInput'
import { useTaskSearch } from './hooks/useTaskSearch'
import { TaskItem } from './components/TaskItem'

export default function Home() {
  const [viewMode, setViewMode] = useState<'normal' | 'infinite' | 'search'>('normal')
  const { 
    searchTerm, 
    setSearchTerm, 
    isSearching, 
    data: searchResults,
    isLoading: isSearchLoading 
  } = useTaskSearch()

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    if (value.length >= 2) {
      setViewMode('search')
    } else {
      setViewMode('normal')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Header />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Tasks</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setViewMode('normal')}
                className={`px-3 py-1 text-sm rounded ${
                  viewMode === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setViewMode('infinite')}
                className={`px-3 py-1 text-sm rounded ${
                  viewMode === 'infinite' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
                }`}
              >
                Infinite
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <SearchInput
              value={searchTerm}
              onChange={handleSearchChange}
              isLoading={isSearchLoading}
            />
          </div>

          {viewMode === 'search' && isSearching ? (
            <div className="space-y-4">
              {isSearchLoading ? (
                <div className="text-center py-8 text-gray-500">Searching...</div>
              ) : searchResults && searchResults.length > 0 ? (
                searchResults.map((task) => (
                  <TaskItem key={task.id} task={task} />
                ))
              ) : (
                <div className="card text-center py-8">
                  <p className="text-gray-500">No tasks found for "{searchTerm}"</p>
                </div>
              )}
            </div>
          ) : viewMode === 'infinite' ? (
            <InfiniteTaskList />
          ) : (
            <TaskList />
          )}
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-6">Quick Add</h2>
          <CreateTaskForm />
        </div>
      </div>
    </div>
  )
}