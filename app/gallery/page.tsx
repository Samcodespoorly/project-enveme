import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gallery — ENVEME',
  description: 'Build documentation photography for Project ENVEME — 1995 Toyota Soarer JZZ31. Photos added as the project progresses.',
}

// Placeholder entries — each represents a future photo set
const plannedSets = [
  { label: 'Acquisition', note: 'Day-1 condition photography', status: 'PLANNED' },
  { label: 'Suspension Install', note: 'Tein coilover fitment process', status: 'PLANNED' },
  { label: 'Engine Bay', note: '2JZ-GE detail shots', status: 'PLANNED' },
  { label: 'Interior', note: 'Factory cabin & gauge cluster', status: 'PLANNED' },
  { label: 'Undercarriage', note: 'Chassis & subframe condition', status: 'PLANNED' },
  { label: 'Rolling Shots', note: 'On-road & static photography', status: 'PLANNED' },
]

export default function GalleryPage() {
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
            color: '#E8920A',
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
            color: '#FFFFFF',
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
            background: 'linear-gradient(to right, #E8920A 0%, rgba(232,146,10,0.1) 70%, transparent 100%)',
            marginBottom: '1.5rem',
          }} />
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            color: '#888',
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
          background: 'rgba(232,146,10,0.06)',
          border: '1px solid rgba(232,146,10,0.18)',
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
            color: '#E8920A',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
          }}>
            Shooting in progress · Updates with each build stage
          </span>
        </div>

        {/* Planned photo sets grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
          marginBottom: '4rem',
        }}>
          {plannedSets.map((set) => (
            <div
              key={set.label}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                minHeight: '140px',
                justifyContent: 'space-between',
                opacity: 0.7,
              }}
            >
              {/* Top: placeholder image area */}
              <div style={{
                width: '100%',
                height: '80px',
                borderRadius: '0.75rem',
                background: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 4px, transparent 4px, transparent 12px)',
                border: '1px dashed rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#E8920A" strokeWidth="1.5" />
                  <circle cx="8.5" cy="8.5" r="1.5" stroke="#E8920A" strokeWidth="1.5" />
                  <path d="M21 15l-5-5L5 21" stroke="#E8920A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <div>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1rem',
                  fontWeight: 700,
                  color: '#FFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.03em',
                  marginBottom: '0.25rem',
                }}>
                  {set.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: '#666',
                  letterSpacing: '0.1em',
                }}>
                  {set.note}
                </p>
              </div>

              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: '#9CA3AF',
                background: 'rgba(156,163,175,0.1)',
                border: '1px solid rgba(156,163,175,0.2)',
                padding: '0.2rem 0.625rem',
                borderRadius: '0.375rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                alignSelf: 'flex-start',
              }}>
                {set.status}
              </span>
            </div>
          ))}
        </div>

        {/* CTA back to build */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '2.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: '#555',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            While you wait — read the full build log
          </p>
          <Link href="/build" style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: '#E8920A',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: '1px solid rgba(232,146,10,0.3)',
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
