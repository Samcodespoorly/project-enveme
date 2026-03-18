import SectionHeading from '@/components/ui/SectionHeading'

const keySpecs = [
  { label: 'Make', value: 'Toyota' },
  { label: 'Model', value: 'Soarer (JZZ31)' },
  { label: 'Also known as', value: 'Lexus SC300 (USDM)' },
  { label: 'Year', value: '1995' },
  { label: 'Engine code', value: '2JZ-GE' },
  { label: 'Engine type', value: '3.0L DOHC Inline-6' },
  { label: 'Displacement', value: '2997cc' },
  { label: 'Power output', value: '225 hp @ 6000 RPM' },
  { label: 'Torque', value: '210 lb-ft @ 4800 RPM' },
  { label: 'Aspiration', value: 'Naturally aspirated' },
  { label: 'Transmission', value: 'A340E 4-speed automatic' },
  { label: 'Drivetrain', value: 'Rear-wheel drive' },
  { label: 'Kerb weight', value: '1590 kg' },
  { label: 'Body style', value: '2-door grand tourer coupé' },
]

const specsGrid = [
  { value: '2JZ-GE', label: 'Engine' },
  { value: '2997cc', label: 'Displacement' },
  { value: '225 hp', label: 'Peak Power' },
  { value: '6000 rpm', label: 'Power RPM' },
  { value: '210 lb-ft', label: 'Peak Torque' },
  { value: '4800 rpm', label: 'Torque RPM' },
  { value: 'A340E', label: 'Gearbox' },
  { value: 'RWD', label: 'Drivetrain' },
  { value: '1590 kg', label: 'Kerb Weight' },
  { value: 'JZZ31', label: 'Chassis' },
  { value: '1995', label: 'Year' },
  { value: 'NZ', label: 'Market' },
]

const currentState = [
  { label: 'Odometer', value: '~102,000 km' },
  { label: 'Condition', value: 'Good — active project' },
  { label: 'Original colour', value: 'Pearl White' },
  { label: 'Status', value: 'Street registered · Active build' },
  { label: 'NZ plate', value: 'ENVEME' },
  { label: 'Purchase price', value: 'NZD $19,000' },
]

export default function SpecsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="JZZ31 PLATFORM · TECHNICAL DATA"
          heading="Vehicle Specs"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', marginBottom: '3rem' }}
          className="lg-grid-2">

          {/* Factory specs table */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '1.25rem' }}>
              Factory Specifications
            </h3>
            <div style={{ borderRadius: '1.25rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {keySpecs.map((spec, i) => (
                    <tr key={spec.label} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: i % 2 === 0 ? 'rgba(255,255,255,0.015)' : 'transparent' }}>
                      <td style={{ padding: '0.875rem 1.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.12em', width: '40%' }}>
                        {spec.label}
                      </td>
                      <td style={{ padding: '0.875rem 1.5rem', fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#E8E8E8' }}>
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
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '1.25rem' }}>
              Key Numbers
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}>
              {specsGrid.map((spec) => (
                <div key={spec.label} style={{ borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem' }}>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 700, color: '#E8920A', marginBottom: '0.5rem' }}>
                    {spec.value}
                  </span>
                  <span style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {spec.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current state */}
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '1.25rem' }}>
            Current State
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.875rem' }}>
            {currentState.map((item) => (
              <div key={item.label} style={{ borderRadius: '1rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem' }}>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#666', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.625rem' }}>
                  {item.label}
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#E8E8E8', fontWeight: 500 }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ borderRadius: '1.25rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', padding: '1.75rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555' }}>
            Live data will sync from GarageOS when Firebase integration is complete.
          </p>
        </div>

      </div>
    </main>
  )
}
