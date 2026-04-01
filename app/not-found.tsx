import Link from 'next/link'

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg-primary)',
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
        404 · Page not found
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(4rem, 12vw, 9rem)',
          fontWeight: 900,
          color: '#FFFFFF',
          textTransform: 'uppercase',
          letterSpacing: '-0.03em',
          lineHeight: 0.9,
          marginBottom: '2rem',
          textShadow: '0 0 80px rgba(232,146,10,0.15)',
        }}
      >
        404
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: '#666',
          lineHeight: 1.7,
          maxWidth: '26rem',
          marginBottom: '2.5rem',
        }}
      >
        This page doesn&apos;t exist. Head back to the build.
      </p>
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.8125rem',
          fontWeight: 700,
          color: '#000',
          background: '#E8920A',
          padding: '0.875rem 2rem',
          borderRadius: '0.5rem',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          textDecoration: 'none',
        }}
      >
        Back to ENVEME
      </Link>
    </main>
  )
}
