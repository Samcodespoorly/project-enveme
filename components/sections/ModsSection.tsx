'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const mods = [
  {
    category: 'ENGINE',
    tagColor: '#E8920A',
    title: 'Cold Air Intake',
    description: 'High-flow cold air intake routed away from engine bay heat soak. Improves throttle response and adds an aggressive induction note under load.',
    status: 'INSTALLED',
  },
  {
    category: 'SUSPENSION',
    tagColor: '#60A5FA',
    title: 'Tein Coilover Suspension',
    description: 'Tein Street Basis coilovers front and rear with adjustable ride height. Lowered 30mm from standard with a four-wheel alignment set to factory spec.',
    status: 'INSTALLED',
  },
  {
    category: 'ELECTRICAL',
    tagColor: '#A78BFA',
    title: 'Defi Gauge Cluster',
    description: 'Defi-Link BF series oil pressure, oil temperature, and water temperature gauges on an A-pillar pod. Integrated with the Defi control unit for data logging.',
    status: 'INSTALLED',
  },
  {
    category: 'INTERIOR',
    tagColor: '#34D399',
    title: 'Nardi Steering Wheel',
    description: 'Nardi Classic 350mm leather wheel on a Works Bell hub adapter. Reduces column reach and improves driving position for spirited use.',
    status: 'INSTALLED',
  },
]

export default function ModsSection() {
  return (
    <section style={{ background: '#0A0A0A', padding: '7rem 0' }}>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="BUILD · MODIFICATIONS"
            heading="Current Mods"
            subtitle="Every change documented — what was done, why, and with what."
          />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {mods.map((mod, i) => (
            <motion.div
              key={mod.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: mod.tagColor,
                  background: `${mod.tagColor}18`,
                  border: `1px solid ${mod.tagColor}40`,
                  padding: '0.3rem 0.75rem',
                  borderRadius: '0.5rem',
                }}>
                  {mod.category}
                </span>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: '#34D399',
                  background: 'rgba(52,211,153,0.1)',
                  border: '1px solid rgba(52,211,153,0.3)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '0.5rem',
                }}>
                  {mod.status}
                </span>
              </div>

              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                fontWeight: 700,
                color: '#FFF',
                textTransform: 'uppercase',
                letterSpacing: '-0.01em',
                lineHeight: 1.1,
                marginBottom: '1rem',
              }}>
                {mod.title}
              </h3>

              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9375rem',
                color: '#AAAAAA',
                lineHeight: 1.7,
              }}>
                {mod.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
