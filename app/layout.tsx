import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Role explorer ',
  description: 'Role explorer is a tool that helps you explore roles and find the right courses to advance your career.',
  generator: 'Deployed on Vercel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
