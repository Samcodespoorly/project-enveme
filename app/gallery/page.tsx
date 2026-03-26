import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gallery — ENVEME',
  description: 'Build photography for Project ENVEME — 1995 Toyota Soarer JZZ31. Photos added as the project progresses.',
}

export default function GalleryPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '9rem 2rem 6rem',
    }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>

        {/* Amber rule */}
        <div style={{
          width: '2.5rem',
          height: '1px',
          background: 'linear-gradient(to right, #E8920A, rgba(232,146,10,0.2))',
          margin: '0 auto 2rem',
        }} />

        {/* Primary heading */}
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: '#E8920A',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          GALLERY — COMING SOON
        </p>

        {/* Subtext */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: '0.9375rem',
          color: '#555',
          lineHeight: 1.7,
        }}>
          Build documentation photography in progress.
        </p>

        {/* Bottom amber rule */}
        <div style={{
          width: '2.5rem',
          height: '1px',
          background: 'linear-gradient(to left, #E8920A, rgba(232,146,10,0.2))',
          margin: '2rem auto 0',
        }} />

      </div>
    </main>
  )
}
