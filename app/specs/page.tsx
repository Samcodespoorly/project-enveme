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
  { value: '1995', label: 'Model Year' },
  { value: 'NZ', label: 'Market' },
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
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        <SectionHeading
          label="JZZ31 PLATFORM · TECHNICAL DATA"
          heading="Vehicle Specs"
        />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

          {/* Factory specs table */}
          <div>
            <h3 className="text-xl font-bold uppercase text-white mb-5 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Factory Specifications
            </h3>
            <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] overflow-hidden">
              <table className="w-full">
                <tbody>
                  {keySpecs.map((spec, i) => (
                    <tr
                      key={spec.label}
                      className={`border-b border-white/[0.05] last:border-0 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                    >
                      <td className="px-7 py-4 text-[11px] text-[#777] uppercase tracking-widest w-2/5" style={{ fontFamily: 'var(--font-mono)' }}>
                        {spec.label}
                      </td>
                      <td className="px-7 py-4 text-sm text-[#E8E8E8]" style={{ fontFamily: 'var(--font-body)' }}>
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
            <h3 className="text-xl font-bold uppercase text-white mb-5 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Key Numbers
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {specsGrid.map((spec) => (
                <div
                  key={spec.label}
                  className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-6"
                >
                  <span className="block text-lg font-bold text-[#E8920A] mb-1.5" style={{ fontFamily: 'var(--font-mono)' }}>
                    {spec.value}
                  </span>
                  <span className="block text-[10px] text-[#666] uppercase tracking-widest" style={{ fontFamily: 'var(--font-mono)' }}>
                    {spec.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Current state */}
        <div className="mb-10">
          <h3 className="text-xl font-bold uppercase text-white mb-5 tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            Current State
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentState.map((item) => (
              <div
                key={item.label}
                className="rounded-xl bg-white/[0.04] border border-white/[0.08] p-7"
              >
                <p className="text-[10px] text-[#666] uppercase tracking-widest mb-3" style={{ fontFamily: 'var(--font-mono)' }}>
                  {item.label}
                </p>
                <p className="text-sm text-[#E8E8E8] font-medium leading-snug" style={{ fontFamily: 'var(--font-body)' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-8 text-center">
          <p className="text-[#555] text-xs leading-relaxed" style={{ fontFamily: 'var(--font-mono)' }}>
            Live data will sync from GarageOS when Firebase integration is complete.
          </p>
        </div>

      </div>
    </main>
  )
}
