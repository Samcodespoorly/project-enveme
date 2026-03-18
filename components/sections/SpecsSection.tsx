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
    <section style={{ background: '#0D0D10', padding: '7rem 0' }}>
      <div className="page-container">
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}
          className="md-grid-4">
          {specs.map((spec, i) => (
            <motion.div
              key={spec.label}
              className="card"
              style={{ position: 'relative' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
            >
              <div style={{
                position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem',
                height: '1px', background: 'linear-gradient(to right, rgba(232,146,10,0.7), rgba(232,146,10,0.2), transparent)'
              }} />
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(1.5rem, 4vw, 2.25rem)',
                  fontWeight: 700,
                  color: '#E8920A',
                  lineHeight: 1,
                  marginBottom: '0.75rem',
                }}
              >
                {spec.value}
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}
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
