import type { Metadata } from 'next'
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'ENVEME | Project Build Portfolio',
  description: '1995 Toyota Soarer JZZ31 — a mechatronics and finance engineering portfolio',
  openGraph: {
    title: 'ENVEME | Project Build Portfolio',
    description: '1995 Toyota Soarer JZZ31 — a mechatronics and finance engineering portfolio',
    type: 'website',
    siteName: 'ENVEME',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENVEME | Project Build Portfolio',
    description: '1995 Toyota Soarer JZZ31 — a mechatronics and finance engineering portfolio',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${barlowCondensed.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <Navigation />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
