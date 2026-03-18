'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const mods = [
  {
    category: 'ENGINE',
    color: { text: '#E8920A', bg: 'rgba(232,146,10,0.1)', border: 'rgba(232,146,10,0.2)' },
    title: 'Cold Air Intake',
    description:
      'High-flow cold air intake routed away from engine bay heat soak. Improves throttle response and adds an aggressive induction note under load.',
    status: 'INSTALLED',
  },
  {
    category: 'SUSPENSION',
    color: { text: '#60A5FA', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.2)' },
    title: 'Tein Coilover Suspension',
    description:
      'Tein Street Basis coilovers front and rear with adjustable ride height. Lowered 30mm from standard with a four-wheel alignment set to factory spec.',
    status: 'INSTALLED',
  },
  {
    category: 'ELECTRICAL',
    color: { text: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
    title: 'Defi Gauge Cluster',
    description:
      'Defi-Link BF series oil pressure, oil temperature, and water temperature gauges on an A-pillar pod. Integrated with the Defi control unit for data logging.',
    status: 'INSTALLED',
  },
  {
    category: 'INTERIOR',
    color: { text: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
    title: 'Nardi Steering Wheel',
    description:
      'Nardi Classic 350mm leather wheel on a Works Bell hub adapter. Reduces column reach and improves driving position for spirited use.',
    status: 'INSTALLED',
  },
]

export default function ModsSection() {
  return (
    <section className="py-28 md:py-36 bg-[#0A0A0A]">
      <div className="w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
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

        <div className="flex flex-col gap-5">
          {mods.map((mod, i) => (
            <motion.div
              key={mod.title}
              className="rounded-2xl bg-white/[0.04] border border-white/[0.08] p-8 md:p-10"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span
                  className="text-[10px] font-semibold tracking-[0.2em] px-3 py-1.5 rounded-lg"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: mod.color.text,
                    background: mod.color.bg,
                    border: `1px solid ${mod.color.border}`,
                  }}
                >
                  {mod.category}
                </span>
                <span
                  className="text-[10px] font-semibold tracking-[0.2em] px-3 py-1.5 rounded-lg"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: '#34D399',
                    background: 'rgba(52,211,153,0.1)',
                    border: '1px solid rgba(52,211,153,0.2)',
                  }}
                >
                  {mod.status}
                </span>
              </div>

              <h3
                className="text-2xl md:text-3xl font-bold uppercase text-white mb-4 leading-tight"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {mod.title}
              </h3>

              <p
                className="text-[#AAAAAA] text-sm md:text-base leading-relaxed"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {mod.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
