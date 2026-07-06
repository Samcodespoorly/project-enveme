import type { Metadata } from 'next'
import QRCode from 'qrcode'
import SectionHeading from '@/components/ui/SectionHeading'
import PrintTagButton from '@/components/passport/PrintTagButton'
import {
  fetchPublicVehicle,
  fetchPublicServices,
  fetchPublicCompliance,
  fetchPublicModsDoc,
  fetchPublicTimeline,
  type ComplianceStatus,
} from '@/lib/publicData'

export const metadata: Metadata = {
  title: 'Vehicle Passport — ENVEME',
  description:
    'Persistent digital identity for the 1995 Toyota Soarer JZZ31 (ENVEME). Live service history, compliance status, and modification register — a record that stays with the vehicle.',
}

const PASSPORT_ID = 'NZ-ENVEME-001'
const PASSPORT_URL = 'https://project-enveme.vercel.app/passport'

const STATUS_COLOUR: Record<ComplianceStatus, string> = {
  ok: '#3E7A57',
  warn: '#9A7B2E',
  alert: '#BF4A23',
  expired: '#BF4A23',
}

function mrz(text: string, width = 44): string {
  const clean = text.toUpperCase().replace(/[^A-Z0-9<]/g, '<')
  return (clean + '<'.repeat(width)).slice(0, width)
}

function fmtDate(d: string | null): string {
  if (!d) return '—'
  const date = new Date(d)
  if (isNaN(date.getTime())) return d
  return date.toLocaleDateString('en-NZ', { day: '2-digit', month: 'short', year: 'numeric' })
}

const labelStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.625rem',
  color: 'var(--ink-faint)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.15em',
  marginBottom: '0.5rem',
}

const h3Style = {
  fontFamily: 'var(--font-display)',
  fontSize: '1.25rem',
  fontWeight: 700,
  color: 'var(--ink)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.03em',
  marginBottom: '1.25rem',
}

export default async function PassportPage() {
  const [vehicle, services, compliance, mods, timeline] = await Promise.all([
    fetchPublicVehicle(),
    fetchPublicServices(),
    fetchPublicCompliance(),
    fetchPublicModsDoc(),
    fetchPublicTimeline(),
  ])

  const qrSvg = await QRCode.toString(PASSPORT_URL, {
    type: 'svg',
    margin: 0,
    errorCorrectionLevel: 'M',
    color: { dark: '#2A211A', light: '#0000' },
  })

  const odometer =
    vehicle.odometer > 0 ? `${vehicle.odometer.toLocaleString('en-NZ')} km` : '~49,000 km'

  const completedProjects = timeline
    .filter(t => t.status === 'complete')
    .sort((a, b) => (b.completedDate ?? '').localeCompare(a.completedDate ?? ''))

  const mrzLine1 = mrz(`P<NZL${vehicle.registrationPlate}<<${vehicle.make}<${vehicle.model}<JZZ31`)
  const mrzLine2 = mrz(`${PASSPORT_ID}<${vehicle.year}<2JZ<GE<ODO<${vehicle.odometer || 49000}KM`)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label={`PERSISTENT VEHICLE IDENTITY · RECORD ${PASSPORT_ID}`}
          heading="Vehicle Passport"
          subtitle="A digital identity that belongs to the car, not the owner. Service history, compliance, and modifications recorded in GarageOS and published live — designed to survive ownership changes the way a logbook never does."
        />

        {/* Identity document */}
        <div
          data-print-hide
          style={{
            borderRadius: '1.25rem',
            background: 'var(--surface)',
            border: '1px solid var(--line)',
            overflow: 'hidden',
            marginBottom: '3rem',
          }}
        >
          <div style={{ padding: '2rem', borderBottom: '1px solid var(--line-soft)' }}>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <p style={labelStyle}>Registration</p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '3rem',
                  fontWeight: 800,
                  lineHeight: 1,
                  color: 'var(--ink)',
                  letterSpacing: '0.04em',
                }}>
                  {vehicle.registrationPlate}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={labelStyle}>Status</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--ink)' }}>
                  {vehicle.buildStatus}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: '1px solid var(--line-soft)' }}>
            {[
              { label: 'Make / Model', value: `${vehicle.make} ${vehicle.model}` },
              { label: 'Chassis', value: 'JZZ31' },
              { label: 'Year', value: String(vehicle.year) },
              { label: 'Engine', value: '2JZ-GE · 3.0L I6' },
              { label: 'Colour', value: vehicle.colour },
              { label: 'Odometer', value: odometer },
              { label: 'Market', value: 'New Zealand (JDM import)' },
              { label: 'Current keeper', value: 'S. Donovan · Keeper No. on record' },
            ].map(item => (
              <div key={item.label} style={{ padding: '1.25rem 2rem', borderTop: '1px solid var(--line-soft)' }}>
                <p style={labelStyle}>{item.label}</p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500, color: 'var(--ink)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Machine-readable zone */}
          <div style={{ padding: '1.25rem 2rem', background: 'var(--surface-2)', overflowX: 'auto' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', letterSpacing: '0.12em', color: 'var(--ink-soft)', whiteSpace: 'pre' }}>
              {mrzLine1}{'\n'}{mrzLine2}
            </p>
          </div>
        </div>

        {/* Compliance */}
        <div data-print-hide style={{ marginBottom: '3rem' }}>
          <h3 style={h3Style}>Compliance</h3>
          {compliance.entries.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
              No compliance records published.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {compliance.entries.map(entry => (
                <div key={entry.type} className="card" style={{ padding: '1.5rem' }}>
                  <div className="flex items-center justify-between" style={{ marginBottom: '0.625rem' }}>
                    <p style={{ ...labelStyle, marginBottom: 0 }}>{entry.label}</p>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.625rem',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        fontWeight: 500,
                        color: STATUS_COLOUR[entry.status],
                      }}
                    >
                      ● {entry.status}
                    </span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 500, color: 'var(--ink)' }}>
                    Expires {fmtDate(entry.expiryDate)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service record */}
        <div data-print-hide style={{ marginBottom: '3rem' }}>
          <h3 style={h3Style}>Service Record</h3>
          <div className="grid grid-cols-3 gap-3" style={{ marginBottom: '1rem' }}>
            {[
              { label: 'Entries on record', value: String(services.totalCount || services.recent.length) },
              { label: 'Last service', value: fmtDate(services.lastServiceDate) },
              { label: 'Record keeper', value: 'GarageOS' },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding: '1.25rem' }}>
                <p style={labelStyle}>{s.label}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '1.125rem', fontWeight: 700, color: 'var(--accent)' }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
          {services.recent.length > 0 && (
            <div style={{ borderRadius: '1.25rem', background: 'var(--surface)', border: '1px solid var(--line)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '560px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--line)' }}>
                      {['Date', 'Category', 'Odometer', 'Performed by'].map(h => (
                        <th key={h} style={{
                          padding: '0.875rem 1.5rem',
                          textAlign: 'left',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.625rem',
                          color: 'var(--ink-faint)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.15em',
                          fontWeight: 500,
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {services.recent.map((entry, i) => (
                      <tr key={`${entry.date}-${i}`} style={{
                        borderBottom: '1px solid var(--line-soft)',
                        background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
                      }}>
                        <td style={{ padding: '0.875rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
                          {fmtDate(entry.date)}
                        </td>
                        <td style={{ padding: '0.875rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink)' }}>
                          {entry.category}
                        </td>
                        <td style={{ padding: '0.875rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--ink-soft)', whiteSpace: 'nowrap' }}>
                          {entry.odometer > 0 ? `${entry.odometer.toLocaleString('en-NZ')} km` : '—'}
                        </td>
                        <td style={{ padding: '0.875rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink)' }}>
                          {entry.performedBy || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Modification register */}
        <div data-print-hide style={{ marginBottom: '3rem' }}>
          <h3 style={h3Style}>Modification Register</h3>
          {mods.items.length === 0 ? (
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
              No modifications on the public register.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mods.items.map(mod => (
                <div key={mod.id} className="card" style={{ padding: '1.5rem' }}>
                  <div className="flex items-baseline justify-between gap-3" style={{ marginBottom: '0.375rem' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', fontWeight: 600, color: 'var(--ink)' }}>
                      {mod.brand ? `${mod.brand} ${mod.name}` : mod.name}
                    </p>
                    <span style={{ ...labelStyle, marginBottom: 0, whiteSpace: 'nowrap' }}>{mod.category}</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--ink-faint)', letterSpacing: '0.06em' }}>
                    {[
                      mod.installDate ? `Installed ${fmtDate(mod.installDate)}` : null,
                      mod.installOdometer ? `${mod.installOdometer.toLocaleString('en-NZ')} km` : null,
                      mod.partNumber ? `PN ${mod.partNumber}` : null,
                    ].filter(Boolean).join(' · ') || 'Installed'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Provenance */}
        <div data-print-hide style={{ marginBottom: '3rem' }}>
          <h3 style={h3Style}>Provenance</h3>
          <div style={{ borderRadius: '1.25rem', background: 'var(--surface)', border: '1px solid var(--line)', padding: '2rem' }}>
            <ol style={{ listStyle: 'none' }}>
              {[
                { date: '1995', event: 'Manufactured — Toyota Soarer 3.0GT (JZZ31), Japan' },
                { date: 'JDM → NZ', event: 'Imported to New Zealand; complied and street registered' },
                { date: '2024 — present', event: 'Current keeper: S. Donovan, Auckland. Full history recorded in GarageOS from acquisition.' },
                ...completedProjects.map(p => ({
                  date: fmtDate(p.completedDate),
                  event: p.title,
                })),
              ].map((item, i) => (
                <li key={i} className="flex gap-6" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--line-soft)' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)', letterSpacing: '0.08em', minWidth: '8.5rem', flexShrink: 0 }}>
                    {item.date}
                  </span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--ink)' }}>
                    {item.event}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Tag */}
        <div style={{ marginBottom: '3rem' }}>
          <h3 data-print-hide style={h3Style}>Passport Tag</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div
              id="passport-tag"
              style={{
                background: '#F4ECDB',
                border: '2px solid #2A211A',
                borderRadius: '8px',
                padding: '1.75rem',
                maxWidth: '340px',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#2A211A',
                marginBottom: '1rem',
              }}>
                Vehicle Passport
              </p>
              <div
                style={{ width: '160px', height: '160px', margin: '0 auto 1.25rem' }}
                dangerouslySetInnerHTML={{ __html: qrSvg }}
              />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.75rem',
                fontWeight: 800,
                textAlign: 'center',
                letterSpacing: '0.06em',
                color: '#2A211A',
                marginBottom: '0.375rem',
              }}>
                {vehicle.registrationPlate}
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                textAlign: 'center',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#6E5F4D',
              }}>
                {PASSPORT_ID} · Scan for live history
              </p>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                textAlign: 'center',
                letterSpacing: '0.08em',
                color: '#9A8B73',
                marginTop: '0.75rem',
              }}>
                Recorded in GarageOS
              </p>
            </div>

            <div data-print-hide>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                This tag lives on the car — door jamb, windscreen, or engine bay. Anyone who scans
                it lands on this page: the live, owner-maintained history of the vehicle. Ownership
                can change; the record stays with the car.
              </p>
              <PrintTagButton />
            </div>
          </div>
        </div>

        <div data-print-hide style={{
          borderRadius: '1.25rem',
          background: 'var(--surface)',
          border: '1px solid var(--line-soft)',
          padding: '1.75rem',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--ink-faint)' }}>
            Passport {PASSPORT_ID} · Data synced live from GarageOS · Costs and personal records remain private to the keeper.
          </p>
        </div>

      </div>
    </main>
  )
}
