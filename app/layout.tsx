import type { Metadata } from 'next'
import {
  Saira_Condensed,
  Saira,
  Instrument_Serif,
  Newsreader,
  Archivo,
  Spline_Sans_Mono,
  JetBrains_Mono,
} from 'next/font/google'
import './globals.css'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'

const sairaCondensed = Saira_Condensed({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-saira-cond',
  display: 'swap',
})

const saira = Saira({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-saira',
  display: 'swap',
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-instrument-serif',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-newsreader',
  display: 'swap',
})

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
  variable: '--font-archivo',
  display: 'swap',
})

const splineSansMono = Spline_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-spline-mono',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://project-enveme.vercel.app'),
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
      className={`${sairaCondensed.variable} ${saira.variable} ${instrumentSerif.variable} ${newsreader.variable} ${archivo.variable} ${splineSansMono.variable} ${jetbrainsMono.variable}`}
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
