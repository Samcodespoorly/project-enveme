'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function BuildError({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('[ENVEME] Build page error:', error)
  }, [error])

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        paddingTop: '9rem',
        paddingBottom: '6rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '9rem 2rem 6rem',
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
        Build Journal · Error
      </p>
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
        Could not load build data. This is usually a temporary issue — try
        again or head home.
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
