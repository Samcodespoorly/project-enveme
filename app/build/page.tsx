import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import Link from 'next/link'
import { journalEntries } from '@/lib/buildData'

export const metadata: Metadata = {
  title: 'Build Journal — ENVEME',
  description: 'Chronological documentation of the 1995 Toyota Soarer JZZ31 build — suspension, maintenance, and modifications.',
}

export default function BuildPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="DOCUMENTED BUILD LOG"
          heading="Build Journal"
          subtitle="A chronological record of every modification, service, and decision."
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {journalEntries.map((entry) => (
            <div
              key={entry.slug}
              className="card build-card"
              style={{ '--card-accent': entry.tagColor } as React.CSSProperties}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <Badge label={entry.category} color={entry.tagColor} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', letterSpacing: '0.1em' }}>
                  {entry.date}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', letterSpacing: '0.1em' }}>
                  {entry.readTime}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 3vw, 1.875rem)',
                fontWeight: 700,
                color: '#FFF',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: '1.25rem',
              }}>
                {entry.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: '#AAAAAA',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
              }}>
                {entry.excerpt}
              </p>

              <Link href={`/build/${entry.slug}`} style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.875rem',
                color: '#E8920A',
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: '0.05em',
              }}>
                Read more →
              </Link>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: '2rem',
          borderRadius: '1.25rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', lineHeight: 1.6 }}>
            Full journal entries are managed via GarageOS and will sync automatically.
          </p>
        </div>

      </div>
    </main>
  )
}
