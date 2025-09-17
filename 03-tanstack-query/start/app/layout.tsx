import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Snowtooth Resort - TanStack Query Workshop',
  description: 'Learn TanStack Query with real ski resort data',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}