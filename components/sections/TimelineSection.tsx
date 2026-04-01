'use client'

import { motion } from 'framer-motion'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import AmberOutlineLink from '@/components/ui/AmberOutlineLink'
import type { PublicTimeline } from '@/lib/publicData'

interface DisplayEntry {
  date: string
  tag: string
  tagColor: string
  title: string
  description: string
}

const STATUS_TAG: Record<string, { tag: string; color: string }> = {
  complete:    { tag: 'COMPLETE',    color: '#34D399' },
  in_progress: { tag: 'IN PROGRESS', color: '#FCD34D' },
  planning:    { tag: 'PLANNED',     color: '#9CA3AF' },
  on_hold:     { tag: 'ON HOLD',     color: '#F97316' },
}

const FALLBACK_ENTRIES: DisplayEntry[] = [
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

type Props = { entries: PublicTimeline[] }

function TimelineCard({
  entry,
  align = 'left',
}: {
  entry: DisplayEntry
  align?: 'left' | 'right'
}) {
  return (
    <div className="card" style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        flexWrap: 'wrap',
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}>
        <Badge label={entry.tag} color={entry.tagColor} />
      </div>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(1.125rem, 2vw, 1.625rem)',
        fontWeight: 700,
        color: '#FFFFFF',
        textTransform: 'uppercase',
        letterSpacing: '-0.01em',
        lineHeight: 1.1,
        marginBottom: '0.875rem',
        textAlign: align === 'right' ? 'right' : 'left',
      }}>
        {entry.title}
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9375rem',
        color: '#AAAAAA',
        lineHeight: 1.7,
        textAlign: align === 'right' ? 'right' : 'left',
      }}>
        {entry.description}
      </p>
    </div>
  )
}

function TimelineNode({ color }: { color: string }) {
  return (
    <div style={{
      width: '0.75rem',
      height: '0.75rem',
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 0 4px #0D0D10, 0 0 10px ${color}80`,
      flexShrink: 0,
    }} />
  )
}

export default function TimelineSection({ entries }: Props) {
  const displayEntries: DisplayEntry[] = entries.length > 0
    ? entries.map(e => ({
        date: e.startDate
          ? new Date(e.startDate).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' })
          : '',
        tag: STATUS_TAG[e.status]?.tag ?? e.status.toUpperCase(),
        tagColor: STATUS_TAG[e.status]?.color ?? '#E8920A',
        title: e.title,
        description: e.description ?? '',
      }))
    : FALLBACK_ENTRIES

  return (
    <section style={{ background: 'var(--color-bg-secondary)', padding: '7rem 0' }}>
      <div className="page-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            label="CHRONOLOGICAL · PROJECT LOG"
            heading="Build Timeline"
            subtitle="Every stage of the build, documented as it happens."
          />
        </motion.div>

        <div style={{ position: 'relative' }}>
          {/* Mobile: line on left */}
          <div className="md:hidden" style={{
            position: 'absolute',
            left: '0.75rem',
            top: '0.5rem',
            bottom: '0.5rem',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, #E8920A 8%, #E8920A 92%, transparent)',
          }} />

          {/* Desktop: line in center */}
          <div className="hidden md:block" style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '0.5rem',
            bottom: '0.5rem',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, #E8920A 8%, #E8920A 92%, transparent)',
          }} />

          {displayEntries.map((entry, i) => {
            const isLeft = i % 2 === 0 // even = date on left, card on right

            return (
              <div key={`${entry.title}-${i}`} className="timeline-entry-wrap">

                {/* ── MOBILE LAYOUT ── */}
                <motion.div
                  className="timeline-mobile-entry"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Node sits on the left line */}
                  <div style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '1.625rem',
                    transform: 'translateX(-50%)',
                  }}>
                    <TimelineNode color={entry.tagColor} />
                  </div>

                  {/* Card */}
                  <div className="card" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: '#E8920A',
                        letterSpacing: '0.15em',
                      }}>
                        {entry.date}
                      </span>
                      <Badge label={entry.tag} color={entry.tagColor} />
                    </div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                      marginBottom: '1rem',
                    }}>
                      {entry.title}
                    </h3>
                    <p style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.9375rem',
                      color: '#AAAAAA',
                      lineHeight: 1.7,
                    }}>
                      {entry.description}
                    </p>
                  </div>
                </motion.div>

                {/* ── DESKTOP LAYOUT (alternating) ── */}
                <motion.div
                  className="timeline-desktop-entry"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.65, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Left column */}
                  <div style={{
                    padding: '0 2rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-end',
                    paddingTop: '1.25rem',
                  }}>
                    {isLeft ? (
                      // Date label on left
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: '#E8920A',
                        letterSpacing: '0.15em',
                        paddingTop: '0.375rem',
                      }}>
                        {entry.date}
                      </span>
                    ) : (
                      // Card on left (right-aligned text)
                      <TimelineCard entry={entry} align="right" />
                    )}
                  </div>

                  {/* Center: node */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: '1.625rem',
                  }}>
                    <TimelineNode color={entry.tagColor} />
                  </div>

                  {/* Right column */}
                  <div style={{
                    padding: '0 2rem',
                    paddingTop: '1.25rem',
                  }}>
                    {isLeft ? (
                      // Card on right
                      <TimelineCard entry={entry} align="left" />
                    ) : (
                      // Date label on right
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: '#E8920A',
                        letterSpacing: '0.15em',
                        paddingTop: '0.375rem',
                        display: 'block',
                      }}>
                        {entry.date}
                      </span>
                    )}
                  </div>
                </motion.div>

              </div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', marginTop: '3.5rem' }}
        >
          <AmberOutlineLink href="/build">
            View full build log →
          </AmberOutlineLink>
        </motion.div>
      </div>
    </section>
  )
}
