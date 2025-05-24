// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Web Development | Websites That Drive Growth',
  description: 'We build responsive, SEO-optimized websites for businesses of all sizes',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Preload video resource */}
        <link
          rel="preload"
          href="/videos/background-video.mp4"
          as="video"
          type="video/mp4"
        />
        {/* Add custom styles for smooth page transitions */}
        <style>{`
          body {
            transition: opacity 0.3s ease;
          }
        `}</style>
      </head>
      <body className={inter.className}>
        <Navbar />
        {children}</body>
    </html>
  )
}