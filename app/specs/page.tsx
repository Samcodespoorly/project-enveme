import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import { keySpecs, specsGrid, currentStateItems, vehicle } from '@/lib/vehicleData'
import { fetchPublicVehicle } from '@/lib/publicData'

export const metadata: Metadata = {
  title: 'Vehicle Specs — ENVEME',
  description: 'Factory and current specifications for the 1995 Toyota Soarer JZZ31 (Project ENVEME).',
}

export default async function SpecsPage() {
  const liveVehicle = await fetchPublicVehicle()
  const liveOdometer = liveVehicle.odometer > 0
    ? `${liveVehicle.odometer.toLocaleString('en-NZ')} km`
    : vehicle.currentState.odometer

  const liveCurrentStateItems = currentStateItems.map(item =>
    item.label === 'Odometer' ? { ...item, value: liveOdometer } : item
  )
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="JZZ31 PLATFORM · TECHNICAL DATA"
          heading="Vehicle Specs"
        />

        {/* 1 col mobile → 2 cols lg+ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" style={{ marginBottom: '3rem' }}>

          {/* Factory specs table */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#FFF',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '1.25rem',
            }}>
              Factory Specifications
            </h3>
            <div style={{ borderRadius: '1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {keySpecs.map((spec, i) => (
                    <tr key={spec.label} style={{
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent',
                    }}>
                      <td style={{
                        padding: '0.875rem 1.5rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.6875rem',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        width: '40%',
                      }}>
                        {spec.label}
                      </td>
                      <td style={{
                        padding: '0.875rem 1.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.875rem',
                        color: '#E8E8E8',
                      }}>
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Key numbers grid */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#FFF',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '1.25rem',
            }}>
              Key Numbers
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {specsGrid.map((spec) => (
                <div key={spec.label} className="card spec-card" style={{ padding: '1.5rem' }}>
                  <span
                    className="spec-value"
                    style={{
                      display: 'block',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#E8920A',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {spec.value}
                  </span>
                  <span style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    color: '#666',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                  }}>
                    {spec.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current state */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#FFF',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            marginBottom: '1.25rem',
          }}>
            Current State
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {liveCurrentStateItems.map((item) => (
              <div key={item.label} className="card" style={{ padding: '1.5rem' }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  marginBottom: '0.625rem',
                }}>
                  {item.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: '#E8E8E8',
                  fontWeight: 500,
                }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          borderRadius: '1.25rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '1.75rem',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555' }}>
            Odometer synced live from GarageOS · Static specs from factory documentation.
          </p>
        </div>

      </div>
    </main>
  )
}
