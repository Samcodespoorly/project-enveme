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
  title: 'ENVEME — 1995 Toyota Soarer JZZ31 Build',
  description: 'Project ENVEME: a fully documented 1995 Toyota Soarer JZZ31 build by Samuel Donovan, Auckland NZ.',
  openGraph: {
    title: 'ENVEME — 1995 Toyota Soarer JZZ31',
    description: 'A live engineering portfolio documenting the build of a 1995 Toyota Soarer JZZ31.',
    siteName: 'ENVEME',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ENVEME — 1995 Toyota Soarer JZZ31 Build',
    description: 'Project ENVEME: a fully documented 1995 Toyota Soarer JZZ31 build by Samuel Donovan, Auckland NZ.',
    images: ['/og-image.jpg'],
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
