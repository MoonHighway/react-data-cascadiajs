import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TaskFlow Pro - Modern React Course',
  description: 'Building modern React applications with Server Components and TanStack Query',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}