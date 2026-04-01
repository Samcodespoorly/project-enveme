'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to console in development; swap for a real error service in production
    console.error('[ENVEME] Unhandled page error:', error)
  }, [error])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 2rem',
        textAlign: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: '#E8920A',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '1rem',
        }}
      >
        Something went wrong
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.5rem, 8vw, 5rem)',
          fontWeight: 800,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '1.5rem',
        }}
      >
        Error
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: '#666',
          lineHeight: 1.7,
          maxWidth: '28rem',
          marginBottom: '2.5rem',
        }}
      >
        A page-level error occurred. This is usually a transient data fetch
        failure — try again or return home.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 700,
            color: '#000',
            background: '#E8920A',
            border: 'none',
            cursor: 'pointer',
            padding: '0.875rem 2rem',
            borderRadius: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          Try again
        </button>
        <Link
          href="/"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#FFF',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.2)',
            padding: '0.875rem 2rem',
            borderRadius: '0.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            textDecoration: 'none',
          }}
        >
          Go home
        </Link>
      </div>
    </main>
  )
}
