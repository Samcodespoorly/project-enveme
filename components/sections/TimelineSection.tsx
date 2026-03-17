'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const entries = [
  {
    date: 'Mar 2025',
    title: 'Acquisition',
    description:
      'Purchased the JZZ31 in Auckland. Full service history, 102,000 km on the clock. Pearl White over beige interior — all original and unmolested.',
    tag: 'MILESTONE',
  },
  {
    date: 'Apr 2025',
    title: 'Assessment & Baseline',
    description:
      'Full mechanical inspection. Fluid flush across engine, gearbox, and diff. Front lower control arm bushings replaced. Baseline condition established.',
    tag: 'SERVICE',
  },
  {
    date: 'May 2025',
    title: 'Suspension Overhaul',
    description:
      'Tein coilovers installed front and rear. Four-wheel alignment set to factory spec. Ride height lowered 30mm — visual and handling improvement significant.',
    tag: 'MODIFICATION',
  },
  {
    date: 'Jun 2025',
    title: 'Gauges & Interior',
    description:
      'Defi gauge cluster, cold air intake, and Nardi steering wheel in progress. Interior refresh and detail underway. Build documentation initiated.',
    tag: 'IN PROGRESS',
  },
]

const tagStyles: Record<string, { color: string; bg: string; border: string }> = {
  MILESTONE:    { color: '#E8920A', bg: 'rgba(232,146,10,0.1)',  border: 'rgba(232,146,10,0.3)'  },
  SERVICE:      { color: '#60A5FA', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.3)'  },
  MODIFICATION: { color: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.3)' },
  'IN PROGRESS':{ color: '#34D399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.3)'  },
}

export default function TimelineSection() {
  return (
    <section className="py-28 px-6 bg-[#0D0D10]">
      <div className="max-w-5xl mx-auto">
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

        <div className="relative">
          {/* Center vertical line */}
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8920A]/40 via-[#E8920A]/20 to-transparent md:-translate-x-px" />

          <div className="flex flex-col">
            {entries.map((entry, i) => {
              const isLeft = i % 2 === 0
              const t = tagStyles[entry.tag]

              return (
                <motion.div
                  key={entry.title}
                  className={`relative flex items-start gap-8 mb-14 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                >
                  {/* Dot */}
                  <div className="absolute left-5 md:left-1/2 top-7 w-3.5 h-3.5 rounded-full bg-[#E8920A] border-2 border-[#0D0D10] -translate-x-1/2 z-10 shadow-[0_0_12px_rgba(232,146,10,0.5)]" />

                  {/* Spacer */}
                  <div className="hidden md:block flex-1" />

                  {/* Card */}
                  <div
                    className="ml-14 md:ml-0 flex-1 max-w-md rounded-xl p-8"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span
                        className="text-[#E8920A] text-xs tracking-[0.2em] font-medium"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {entry.date}
                      </span>
                      <span
                        className="text-[10px] font-semibold tracking-widest px-2.5 py-1 rounded"
                        style={{ fontFamily: 'var(--font-mono)', color: t.color, background: t.bg, border: `1px solid ${t.border}` }}
                      >
                        {entry.tag}
                      </span>
                    </div>

                    <h3
                      className="text-2xl font-bold uppercase text-white mb-3 leading-tight"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {entry.title}
                    </h3>

                    <p
                      className="text-[#999999] text-sm leading-relaxed"
                      style={{ fontFamily: 'var(--font-body)' }}
                    >
                      {entry.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
