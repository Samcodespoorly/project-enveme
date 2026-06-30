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
    date: 'Jul 2025',
    tag: 'MILESTONE',
    tagColor: 'var(--accent)',
    title: 'Acquisition',
    description: 'Purchased the JZZ31 with just 49,000 km on the clock — a genuinely low-mileage example of the naturally aspirated 2JZ-GE grand tourer.',
  },
  {
    date: 'Jul 2025',
    tag: 'SERVICE',
    tagColor: '#60A5FA',
    title: 'Full Service & Baseline Assessment',
    description: 'Complete service — engine oil, oil filter, and air filter replaced — followed by a full performance assessment. Flagged leaking shock absorbers and a worn steering rack as priority future work.',
  },
  {
    date: 'Oct 2025',
    tag: 'MAINTENANCE',
    tagColor: '#60A5FA',
    title: 'Front-of-Engine Refresh',
    description: 'With parts ordered from Amayama, replaced the crankshaft pulley / harmonic damper, both valve cover gaskets, and the drive belt tensioner and drive belt.',
  },
  {
    date: 'Mar 2026',
    tag: 'MODIFICATION',
    tagColor: '#A78BFA',
    title: 'Security & Audio',
    description: 'Installed an Avital 5308L aftermarket alarm system and updated the Carrozzeria FH-P040 head unit to add Bluetooth connectivity.',
  },
  {
    date: 'In progress',
    tag: 'IN PROGRESS',
    tagColor: '#34D399',
    title: 'Interior & Mirror Fabrication',
    description: '3D modelling replacement trim pieces for the cracked AC vents, plus Ganador-style aero wing mirrors to replace the originals.',
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
        color: 'var(--ink)',
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
        color: 'var(--ink-soft)',
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
      boxShadow: `0 0 0 4px var(--bg)${color.startsWith('#') ? `, 0 0 10px ${color}80` : ''}`,
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
        tagColor: STATUS_TAG[e.status]?.color ?? 'var(--accent)',
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
            background: 'linear-gradient(to bottom, transparent, var(--accent) 8%, var(--accent) 92%, transparent)',
          }} />

          {/* Desktop: line in center */}
          <div className="hidden md:block" style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '0.5rem',
            bottom: '0.5rem',
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, var(--accent) 8%, var(--accent) 92%, transparent)',
          }} />

          {displayEntries.map((entry, i) => {
            const isLeft = i % 2 === 0

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
                  <div style={{
                    position: 'absolute',
                    left: '0.75rem',
                    top: '1.625rem',
                    transform: 'translateX(-50%)',
                  }}>
                    <TimelineNode color={entry.tagColor} />
                  </div>

                  <div className="card" style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent)',
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
                      color: 'var(--ink)',
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
                      color: 'var(--ink-soft)',
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
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent)',
                        letterSpacing: '0.15em',
                        paddingTop: '0.375rem',
                      }}>
                        {entry.date}
                      </span>
                    ) : (
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
                      <TimelineCard entry={entry} align="left" />
                    ) : (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--accent)',
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
