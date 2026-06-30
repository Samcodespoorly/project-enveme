import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import Badge from '@/components/ui/Badge'
import { fetchPublicModsDoc } from '@/lib/publicData'
import type { PublicMod } from '@/lib/publicData'

export const metadata: Metadata = {
  title: 'Parts Catalogue — ENVEME',
  description:
    'Every part fitted to the 1995 Toyota Soarer JZZ31 — brand, part number, OEM cross-reference, and fitment. Live from GarageOS.',
}

const CATEGORY_COLOURS: Record<string, string> = {
  suspension: 'var(--accent)',
  engine:     '#F87171',
  electrical: '#22D3EE',
  exterior:   '#A78BFA',
  interior:   '#FBBF24',
  wheels:     '#34D399',
  brakes:     '#FB7185',
  part:       '#60A5FA',
  consumable: '#FACC15',
}

function categoryColour(category: string): string {
  return CATEGORY_COLOURS[category] ?? '#9CA3AF'
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-NZ', { year: 'numeric', month: 'short' })
}

function syncedLabel(updatedAt: string): string | null {
  if (!updatedAt) return null
  const d = new Date(updatedAt)
  if (isNaN(d.getTime())) return null
  return d.toLocaleDateString('en-NZ', { day: 'numeric', month: 'short', year: 'numeric' })
}

function PartCard({ part }: { part: PublicMod }) {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.0625rem',
            fontWeight: 700,
            color: 'var(--ink)',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            lineHeight: 1.2,
          }}>
            {part.name}
          </h3>
          {part.brand && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--accent)', marginTop: '0.25rem', fontWeight: 500 }}>
              {part.brand}
            </p>
          )}
        </div>
        <Badge label={part.category} color={categoryColour(part.category)} />
      </div>

      {part.description && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink-soft)', lineHeight: 1.6 }}>
          {part.description}
        </p>
      )}

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
        gap: '0.75rem 1.25rem',
        paddingTop: '0.875rem',
        borderTop: '1px solid var(--line-soft)',
      }}>
        {part.partNumber && (
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--ink-faint)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              Part No.
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--ink)' }}>{part.partNumber}</span>
          </div>
        )}
        {part.oemPartNumber && (
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--ink-faint)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              OEM Cross-Ref
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--ink)' }}>{part.oemPartNumber}</span>
          </div>
        )}
        {part.fitmentNotes && (
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--ink-faint)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
              Fitment
            </span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--ink)' }}>{part.fitmentNotes}</span>
          </div>
        )}
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--ink-faint)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
            Installed
          </span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: 'var(--ink)' }}>
            {formatDate(part.installDate)}
            {part.installOdometer ? ` · ${part.installOdometer.toLocaleString('en-NZ')} km` : ''}
          </span>
        </div>
      </div>
    </div>
  )
}

export default async function PartsPage() {
  const { items, updatedAt } = await fetchPublicModsDoc()

  const brands = new Set(items.map(p => p.brand).filter(Boolean))
  const crossReferenced = items.filter(p => p.oemPartNumber).length
  const synced = syncedLabel(updatedAt)

  const stats = [
    { label: 'Parts fitted', value: String(items.length) },
    { label: 'Brands', value: String(brands.size) },
    { label: 'OE cross-referenced', value: String(crossReferenced) },
  ]

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="FITMENT-VERIFIED PARTS DATA"
          heading="Parts Catalogue"
          subtitle="Every part fitted to the JZZ31 — brand, part number, OEM cross-reference, and applicability. Synced live from GarageOS."
        />

        {/* Live sync indicator */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.625rem',
          background: 'var(--surface)',
          border: '1px solid var(--line)',
          borderRadius: '2rem',
          padding: '0.4375rem 1rem',
          marginBottom: '2.5rem',
        }}>
          <span className="status-dot-live" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: 'var(--accent)', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {synced ? `Live from GarageOS · synced ${synced}` : 'Live from GarageOS'}
          </span>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem 2.5rem',
          marginBottom: '3rem',
          paddingBottom: '2.5rem',
          borderBottom: '1px solid var(--line-soft)',
        }}>
          {stats.map(stat => (
            <div key={stat.label}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'var(--ink-faint)', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                {stat.label}
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--ink)', fontWeight: 700 }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {items.length > 0 ? (
          <div className="md-grid-2" style={{ gap: '1.25rem' }}>
            {items.map(part => <PartCard key={part.id} part={part} />)}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--accent)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              CATALOGUE EMPTY
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-soft)' }}>
              Parts marked public in GarageOS appear here automatically.
            </p>
          </div>
        )}

      </div>
    </main>
  )
}
