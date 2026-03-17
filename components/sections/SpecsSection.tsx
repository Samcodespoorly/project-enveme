'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const specs = [
  { value: '2JZ-GE', label: 'Engine Code' },
  { value: '2997cc', label: 'Displacement' },
  { value: '225 hp', label: 'Power @ 6000 RPM' },
  { value: '210 lb-ft', label: 'Torque @ 4800 RPM' },
  { value: 'A340E', label: 'Transmission' },
  { value: 'RWD', label: 'Drivetrain' },
  { value: '1590 kg', label: 'Kerb Weight' },
  { value: '1995', label: 'Model Year' },
]

export default function SpecsSection() {
  return (
    <section className="py-28 px-6 bg-[#0D0D10]">
      <div className="max-w-7xl mx-auto">
        {/* Tag */}
        <motion.p
          className="text-[#E8920A] text-xs tracking-[0.25em] uppercase mb-5"
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
            subtitle="Factory figures for the 1995 JZZ31 platform — the foundation everything is built on."
          />
        </motion.div>

        {/* Specs grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="relative rounded-xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              {/* Amber top accent line */}
              <div className="h-px bg-gradient-to-r from-[#E8920A]/60 via-[#E8920A]/20 to-transparent" />
              <div className="p-7">
                <span
                  className="block text-3xl md:text-4xl font-semibold text-[#E8920A] leading-none mb-3"
                  style={{ fontFamily: 'var(--font-mono)' }}
                >
                  {spec.value}
                </span>
                <span
                  className="block text-sm text-[#888888] tracking-wide"
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {spec.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
