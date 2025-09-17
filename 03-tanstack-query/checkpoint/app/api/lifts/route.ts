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