import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/components/layout/Providers'

export const metadata: Metadata = {
  title: 'ReviewForge — AI Code Intelligence',
  description: 'AI-powered code review, security detection, and developer mentorship platform powered by Claude.',
  keywords: ['code review', 'AI', 'security', 'developer tools', 'Claude AI'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ margin: 0, padding: 0, background: '#080810' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}