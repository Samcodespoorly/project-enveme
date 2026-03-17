'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const entries = [
  {
    date: 'Mar 2025',
    title: 'Acquisition',
    description:
      'Purchased the JZZ31 in Auckland. Full service history, 102,000 km on the clock. Pearl White over beige interior — all original and unmolested.',
  },
  {
    date: 'Apr 2025',
    title: 'Assessment',
    description:
      'Full mechanical inspection completed. Fluid flush across engine, gearbox, and diff. Worn front lower control arm bushings replaced. Baseline performance and condition established.',
  },
  {
    date: 'May 2025',
    title: 'Suspension',
    description:
      'Tein coilovers installed front and rear. Four-wheel alignment set to factory spec. Ride height lowered 30mm from standard. Visual and handling improvement significant.',
  },
  {
    date: 'Jun 2025',
    title: 'Ongoing',
    description:
      'Defi gauge cluster, cold air intake, and Nardi steering wheel in progress. Interior refresh and detail underway. Build documentation initiated.',
  },
]

export default function TimelineSection() {
  return (
    <section className="py-24 px-6 bg-[#0A0A0A]">
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
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#E8920A]/20 md:-translate-x-px" />

          <div className="flex flex-col gap-0">
            {entries.map((entry, i) => {
              const isLeft = i % 2 === 0

              return (
                <motion.div
                  key={entry.title}
                  className={`relative flex items-start gap-8 mb-12 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-row`}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  {/* Mobile/desktop: dot on the line */}
                  <div
                    className={`absolute left-4 md:left-1/2 top-6 w-3 h-3 rounded-full bg-[#E8920A] border-2 border-[#0A0A0A] -translate-x-1/2 z-10`}
                  />

                  {/* Spacer for desktop alternating layout */}
                  <div className="hidden md:block flex-1" />

                  {/* Content card */}
                  <div className="ml-12 md:ml-0 flex-1 max-w-md glass rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-[#E8920A] text-xs tracking-[0.2em]"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {entry.date}
                      </span>
                    </div>

                    <h3
                      className="text-xl font-bold uppercase text-white mb-2"
                      style={{ fontFamily: 'var(--font-display)' }}
                    >
                      {entry.title}
                    </h3>

                    <p
                      className="text-[#A0A0A0] text-sm leading-relaxed"
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
