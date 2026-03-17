import SectionHeading from '@/components/ui/SectionHeading'
import GlassCard from '@/components/ui/GlassCard'

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
  { label: 'Drivetrain', value: 'Rear-wheel drive (RWD)' },
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
  { value: 'A340E', label: 'Gearbox Code' },
  { value: '4AT', label: 'Gearbox Type' },
  { value: 'RWD', label: 'Drivetrain' },
  { value: '1590 kg', label: 'Kerb Weight' },
  { value: 'JZZ31', label: 'Chassis Code' },
  { value: '1995', label: 'Model Year' },
]

const currentState = [
  { label: 'Odometer', value: '~102,000 km' },
  { label: 'Condition', value: 'Good — active project' },
  { label: 'Original colour', value: 'Pearl White' },
  { label: 'Current status', value: 'Street registered · Active build' },
  { label: 'NZ plate', value: 'ENVEME' },
  { label: 'Purchase price', value: 'NZD $19,000' },
]

export default function SpecsPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] pt-24 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page header */}
        <SectionHeading
          label="JZZ31 PLATFORM · TECHNICAL DATA"
          heading="Vehicle Specifications"
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left: key specs table */}
          <div>
            <h3
              className="text-lg font-bold uppercase text-white mb-4 tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Factory Specifications
            </h3>
            <GlassCard className="p-0 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {keySpecs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}
                    >
                      <td
                        className="px-5 py-3 text-xs text-[#666666] uppercase tracking-wider w-1/2"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {spec.label}
                      </td>
                      <td
                        className="px-5 py-3 text-sm text-[#FAFAFA]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </GlassCard>
          </div>

          {/* Right: specs grid */}
          <div>
            <h3
              className="text-lg font-bold uppercase text-white mb-4 tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Key Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {specsGrid.map((spec) => (
                <div
                  key={spec.label}
                  className="glass rounded-lg p-4 flex flex-col gap-1"
                >
                  <span
                    className="text-xl font-medium text-[#E8920A]"
                    style={{ fontFamily: 'var(--font-mono)' }}
                  >
                    {spec.value}
                  </span>
                  <span
                    className="text-xs text-[#666666] uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {spec.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current state section */}
        <div className="mb-12">
          <h3
            className="text-lg font-bold uppercase text-white mb-4 tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Current State
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentState.map((item) => (
              <GlassCard key={item.label} className="p-4">
                <p
                  className="text-xs text-[#666666] uppercase tracking-wider mb-1"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm text-[#FAFAFA]"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.value}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Integration note */}
        <div className="glass rounded-xl p-5">
          <p
            className="text-[#666666] text-xs leading-relaxed text-center"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Live data will sync from GarageOS when Firebase integration is
            complete.
          </p>
        </div>
      </div>
    </main>
  )
}
