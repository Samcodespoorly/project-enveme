'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const specs = [
  { value: '2JZ-GE', label: 'Engine Code' },
  { value: '2997cc', label: 'Displacement' },
  { value: '225 hp', label: 'Peak Power' },
  { value: '210 lb-ft', label: 'Peak Torque' },
  { value: 'A340E', label: 'Transmission' },
  { value: 'RWD', label: 'Drivetrain' },
  { value: '1590 kg', label: 'Kerb Weight' },
  { value: '1995', label: 'Model Year' },
]

export default function SpecsSection() {
  return (
    <section className="py-28 md:py-36 bg-[#0D0D10]">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="PLATFORM · JZZ31 CHASSIS"
            heading="Technical Specs"
            subtitle="Factory figures for the 1995 JZZ31 — the foundation everything is built on."
          />
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="relative rounded-2xl bg-white/[0.04] border border-white/[0.08] p-7 md:p-8"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              {/* Amber accent top */}
              <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-[#E8920A]/70 via-[#E8920A]/30 to-transparent" />
              <span
                className="block text-3xl md:text-4xl font-bold text-[#E8920A] leading-none mb-3"
                style={{ fontFamily: 'var(--font-mono)' }}
              >
                {spec.value}
              </span>
              <span
                className="block text-xs text-[#777] uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-mono)' }}
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
