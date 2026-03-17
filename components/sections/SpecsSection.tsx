'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const specs = [
  { value: '2JZ-GE', label: 'Engine' },
  { value: '2997cc', label: 'Displacement' },
  { value: '225 hp', label: 'Power @ 6000 RPM' },
  { value: '210 lb-ft', label: 'Torque @ 4800 RPM' },
  { value: 'A340E 4AT', label: 'Transmission' },
  { value: 'RWD', label: 'Drivetrain' },
  { value: '1590 kg', label: 'Kerb Weight' },
  { value: '1995', label: 'Model Year' },
]

export default function SpecsSection() {
  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        {/* Tag */}
        <motion.p
          className="text-[#E8920A] text-xs tracking-[0.2em] uppercase mb-4"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          PLATFORM · JZZ31 CHASSIS
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <SectionHeading
            heading="Technical Specifications"
          />
        </motion.div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="glass rounded-xl p-6 flex flex-col gap-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <span
                className="text-2xl md:text-3xl font-medium text-[#E8920A]"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
