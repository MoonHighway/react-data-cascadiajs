'use client'

import { useEffect, useState } from 'react'

export function TestComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('TestComponent useEffect called')
    fetch('/api/lifts')
      .then(res => res.json())
      .then(data => {
        console.log('TestComponent data:', data.length)
        setData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('TestComponent error:', err)
        setLoading(false)
      })
  }, [])

  console.log('TestComponent render:', { loading, dataLength: data?.length })

  if (loading) {
    return <div>Loading test component...</div>
  }

  return (
    <div>
      <h3>Test Component (without TanStack Query)</h3>
      <p>Data loaded: {data?.length} items</p>
    </div>
  )
}