'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const entries = [
  {
    date: 'Mar 2025',
    tag: 'MILESTONE',
    color: { text: '#E8920A', border: 'rgba(232,146,10,0.3)', bg: 'rgba(232,146,10,0.08)' },
    title: 'Acquisition',
    description:
      'Purchased the JZZ31 in Auckland. Full service history, 102,000 km on the clock. Pearl White over beige interior — all original and unmolested.',
  },
  {
    date: 'Apr 2025',
    tag: 'SERVICE',
    color: { text: '#60A5FA', border: 'rgba(96,165,250,0.3)', bg: 'rgba(96,165,250,0.08)' },
    title: 'Assessment & Baseline',
    description:
      'Full mechanical inspection. Fluid flush across engine, gearbox, and diff. Front lower control arm bushings replaced. Baseline condition established.',
  },
  {
    date: 'May 2025',
    tag: 'MODIFICATION',
    color: { text: '#A78BFA', border: 'rgba(167,139,250,0.3)', bg: 'rgba(167,139,250,0.08)' },
    title: 'Suspension Overhaul',
    description:
      'Tein coilovers installed front and rear. Four-wheel alignment set to factory spec. Ride height lowered 30mm — visual and handling improvement significant.',
  },
  {
    date: 'Jun 2025',
    tag: 'IN PROGRESS',
    color: { text: '#34D399', border: 'rgba(52,211,153,0.3)', bg: 'rgba(52,211,153,0.08)' },
    title: 'Gauges & Interior',
    description:
      'Defi gauge cluster, cold air intake, and Nardi steering wheel in progress. Interior refresh and detail underway. Build documentation initiated.',
  },
]

export default function TimelineSection() {
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
            label="CHRONOLOGICAL · PROJECT LOG"
            heading="Build Timeline"
            subtitle="Every stage of the build, documented as it happens."
          />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-5 top-0 bottom-0 w-px bg-gradient-to-b from-[#E8920A]/50 via-[#E8920A]/20 to-transparent" />

          <div className="flex flex-col gap-10 pl-14 md:pl-16">
            {entries.map((entry, i) => (
              <motion.div
                key={entry.title}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-10 md:-left-12 top-5 w-3 h-3 rounded-full bg-[#E8920A] border-2 border-[#0D0D10]"
                  style={{ boxShadow: '0 0 10px rgba(232,146,10,0.5)' }}
                />

                <div className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-7 md:p-9">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span
                      className="text-[#E8920A] text-xs tracking-widest"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {entry.date}
                    </span>
                    <span
                      className="text-[10px] font-semibold tracking-[0.2em] px-2.5 py-1 rounded-md"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: entry.color.text,
                        background: entry.color.bg,
                        border: `1px solid ${entry.color.border}`,
                      }}
                    >
                      {entry.tag}
                    </span>
                  </div>
                  <h3
                    className="text-xl md:text-2xl font-bold uppercase text-white mb-3 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {entry.title}
                  </h3>
                  <p
                    className="text-[#AAAAAA] text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {entry.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
