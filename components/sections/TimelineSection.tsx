'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const entries = [
  {
    date: 'Mar 2025',
    tag: 'MILESTONE',
    tagColor: '#E8920A',
    title: 'Acquisition',
    description: 'Purchased the JZZ31 in Auckland. Full service history, 102,000 km on the clock. Pearl White over beige interior — all original and unmolested.',
  },
  {
    date: 'Apr 2025',
    tag: 'SERVICE',
    tagColor: '#60A5FA',
    title: 'Assessment & Baseline',
    description: 'Full mechanical inspection. Fluid flush across engine, gearbox, and diff. Front lower control arm bushings replaced. Baseline condition established.',
  },
  {
    date: 'May 2025',
    tag: 'MODIFICATION',
    tagColor: '#A78BFA',
    title: 'Suspension Overhaul',
    description: 'Tein coilovers installed front and rear. Four-wheel alignment set to factory spec. Ride height lowered 30mm — visual and handling improvement significant.',
  },
  {
    date: 'Jun 2025',
    tag: 'IN PROGRESS',
    tagColor: '#34D399',
    title: 'Gauges & Interior',
    description: 'Defi gauge cluster, cold air intake, and Nardi steering wheel in progress. Interior refresh and detail underway. Build documentation initiated.',
  },
]

export default function TimelineSection() {
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
            label="CHRONOLOGICAL · PROJECT LOG"
            heading="Build Timeline"
            subtitle="Every stage of the build, documented as it happens."
          />
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {entries.map((entry, i) => (
            <motion.div
              key={entry.title}
              className="card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
            >
              {/* Top row: date + tag */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: '#E8920A',
                    letterSpacing: '0.15em',
                  }}
                >
                  {entry.date}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.2em',
                    color: entry.tagColor,
                    background: `${entry.tagColor}18`,
                    border: `1px solid ${entry.tagColor}40`,
                    padding: '0.3rem 0.75rem',
                    borderRadius: '0.5rem',
                  }}
                >
                  {entry.tag}
                </span>
              </div>

              {/* Title */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                  marginBottom: '1rem',
                }}
              >
                {entry.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9375rem',
                  color: '#AAAAAA',
                  lineHeight: 1.7,
                }}
              >
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
