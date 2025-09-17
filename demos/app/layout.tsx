import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Ski React 19 Demos",
  description: "Tiny ski-themed demos for React 19 / Next.js 15",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <div className="mx-auto max-w-3xl p-6">
          <header className="mb-8">
            <h1 className="text-2xl font-bold">⛷️ Ski React 19 Demos</h1>
            <p className="text-sm text-gray-600">React 19 hooks + Next.js 15 App Router</p>
          </header>
          <main className="space-y-8">{children}</main>
          <footer className="mt-16 text-xs text-gray-500">Made for quick teaching demos.</footer>
        </div>
      </body>
    </html>
  );
}
