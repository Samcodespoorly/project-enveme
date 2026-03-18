import SectionHeading from '@/components/ui/SectionHeading'
import Link from 'next/link'

const journalEntries = [
  {
    date: 'May 2025',
    category: 'SUSPENSION',
    tagColor: '#60A5FA',
    title: 'Tein Coilover Installation & Alignment',
    excerpt: 'After sourcing a set of Tein Street Basis coilovers, I undertook the full front and rear suspension replacement over a weekend. The process involved removing the OEM shock absorbers, compressing the new coilover springs, and setting the initial ride height at 30mm below standard before a four-wheel alignment.',
    slug: 'tein-coilover-install',
  },
  {
    date: 'Apr 2025',
    category: 'MAINTENANCE',
    tagColor: '#34D399',
    title: 'Full Fluid Service & Baseline Inspection',
    excerpt: 'With the JZZ31 freshly acquired, the first priority was a comprehensive fluid service and mechanical baseline. Engine oil, coolant, transmission fluid, differential oil, and brake fluid were all replaced. Worn front lower control arm bushings were identified and replaced ahead of the upcoming suspension work.',
    slug: 'baseline-fluid-service',
  },
  {
    date: 'Mar 2025',
    category: 'ACQUISITION',
    tagColor: '#E8920A',
    title: 'Purchasing the JZZ31 — Why This Car?',
    excerpt: 'After months of searching Trade Me and local classifieds, I found the right example in Auckland — a 1995 Pearl White JZZ31 with 102,000 km and a folder of service history. The 2JZ-GE is a bulletproof platform, the chassis is sophisticated, and the Soarer is genuinely undervalued in the NZ market.',
    slug: 'acquisition-story',
  },
]

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
            <div key={entry.slug} className="card" style={{ transition: 'border-color 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: entry.tagColor,
                  background: `${entry.tagColor}18`,
                  border: `1px solid ${entry.tagColor}40`,
                  padding: '0.35rem 0.875rem',
                  borderRadius: '0.5rem',
                }}>
                  {entry.category}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#666', letterSpacing: '0.1em' }}>
                  {entry.date}
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
