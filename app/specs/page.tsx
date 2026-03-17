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
    <main className="min-h-screen bg-[#0A0A0A] pt-32 pb-28">
      <div className="max-w-7xl mx-auto px-8">

        <SectionHeading
          label="JZZ31 PLATFORM · TECHNICAL DATA"
          heading="Vehicle Specifications"
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {/* Left: key specs table */}
          <div>
            <h3
              className="text-lg font-bold uppercase text-white mb-5 tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Factory Specifications
            </h3>
            <div
              className="rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
            >
              <table className="w-full">
                <tbody>
                  {keySpecs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={`border-b border-white/[0.05] last:border-0 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                    >
                      <td
                        className="px-8 py-5 text-xs text-[#888888] uppercase tracking-wider w-2/5"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {spec.label}
                      </td>
                      <td
                        className="px-8 py-5 text-sm text-[#EEEEEE]"
                        style={{ fontFamily: 'var(--font-body)' }}
                      >
                        {spec.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right: specs grid */}
          <div>
            <h3
              className="text-lg font-bold uppercase text-white mb-5 tracking-wide"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Key Numbers
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {specsGrid.map((spec) => (
                <div
                  key={spec.label}
                  className="relative rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px rounded-t-xl bg-gradient-to-r from-[#E8920A]/50 via-[#E8920A]/15 to-transparent" />
                  <div className="p-8 pt-9">
                    <span
                      className="block text-xl font-semibold text-[#E8920A] mb-2"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {spec.value}
                    </span>
                    <span
                      className="block text-xs text-[#888888] uppercase tracking-wider"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {spec.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current state section */}
        <div className="mb-14">
          <h3
            className="text-lg font-bold uppercase text-white mb-5 tracking-wide"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Current State
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {currentState.map((item) => (
              <div
                key={item.label}
                className="rounded-xl p-8"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              >
                <p
                  className="text-xs text-[#888888] uppercase tracking-wider mb-2"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {item.label}
                </p>
                <p
                  className="text-sm text-[#EEEEEE] font-medium"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Integration note */}
        <div
          className="rounded-xl p-6 text-center"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p
            className="text-[#888888] text-xs leading-relaxed"
            style={{ fontFamily: 'var(--font-mono)' }}
          >
            Live data will sync from GarageOS when Firebase integration is complete.
          </p>
        </div>

      </div>
    </main>
  )
}
