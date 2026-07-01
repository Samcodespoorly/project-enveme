import type { Metadata } from 'next'
import Link from 'next/link'
import { fetchPublicGallery } from '@/lib/publicData'
import GalleryGrid from '@/components/GalleryGrid'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Gallery — ENVEME',
  description: 'Build documentation photography for Project ENVEME — 1995 Toyota Soarer JZZ31. Photos added as the project progresses.',
}

export default async function GalleryPage() {
  const gallery = await fetchPublicGallery()

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--color-bg-primary)',
      paddingTop: '9rem',
      paddingBottom: '6rem',
    }}>
      <div className="page-container">

        {/* Heading */}
        <div style={{ marginBottom: '3rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--accent)',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            BUILD PHOTOGRAPHY · JZZ31
          </p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 800,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.92,
            marginBottom: '1.5rem',
          }}>
            Gallery
          </h1>
          <div style={{
            height: '2px',
            maxWidth: '180px',
            background: 'linear-gradient(to right, var(--accent), transparent)',
            marginBottom: '1.5rem',
          }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: 'var(--ink-soft)',
            lineHeight: 1.7,
            maxWidth: '36rem',
          }}>
            Build photography in progress — each set is captured at key milestones as the project advances. Check back as documentation accumulates.
          </p>
        </div>

        {/* Status notice */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.625rem',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '2rem',
          padding: '0.5rem 1.25rem',
          marginBottom: '3rem',
        }}>
          <span style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: '#FCD34D',
            boxShadow: '0 0 5px rgba(252,211,77,0.5)',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5625rem',
            color: 'var(--accent)',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
            Shooting in progress · Updates with each build stage
          </span>
        </div>

        {/* Photo sets grid */}
        <GalleryGrid gallery={gallery} />

        {/* CTA back to build */}
        <div style={{
          borderTop: '1px solid var(--line-soft)',
          paddingTop: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: 'var(--ink-faint)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            While you wait — read the full build log
          </p>
          <Link href="/build" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--accent)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid var(--line)',
            padding: '0.5rem 1.25rem',
            borderRadius: '0.5rem',
            transition: 'background 0.15s ease, border-color 0.15s ease',
            whiteSpace: 'nowrap',
          }}>
            Build Journal →
          </Link>
        </div>

      </div>
    </main>
  )
}
