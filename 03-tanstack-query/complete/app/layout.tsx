import './globals.css'
import { Providers } from './providers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Snowtooth Resort - TanStack Query Demo',
  description: 'Real-time ski lift status powered by TanStack Query and React 19',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Providers>
          <main className="min-h-screen">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}