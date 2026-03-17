'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const mods = [
  {
    category: 'ENGINE',
    title: 'Cold Air Intake',
    description:
      'High-flow cold air intake routed away from engine bay heat soak. Improves throttle response and adds an aggressive induction note under load.',
    status: 'INSTALLED',
    imageAlt: 'Cold Air Intake',
  },
  {
    category: 'SUSPENSION',
    title: 'Coilover Suspension',
    description:
      'Tein Street Basis coilovers front and rear with adjustable ride height. Lowered 30mm from standard with a four-wheel alignment set to factory spec.',
    status: 'INSTALLED',
    imageAlt: 'Coilover Suspension',
  },
  {
    category: 'ELECTRICAL',
    title: 'Defi Gauge Cluster',
    description:
      'Defi-Link BF series oil pressure, oil temperature, and water temperature gauges on an A-pillar pod. Integrated with the Defi control unit for data logging.',
    status: 'INSTALLED',
    imageAlt: 'Defi Gauge Cluster',
  },
  {
    category: 'INTERIOR',
    title: 'Nardi Steering Wheel',
    description:
      'Nardi Classic 350mm leather wheel on a Works Bell hub adapter. Reduces column reach and improves driving position for spirited use.',
    status: 'INSTALLED',
    imageAlt: 'Nardi Steering Wheel',
  },
]

const categoryColors: Record<string, { text: string; bg: string; border: string }> = {
  ENGINE:     { text: '#E8920A', bg: 'rgba(232,146,10,0.1)',  border: 'rgba(232,146,10,0.25)' },
  SUSPENSION: { text: '#60A5FA', bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.25)' },
  ELECTRICAL: { text: '#A78BFA', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.25)' },
  INTERIOR:   { text: '#34D399', bg: 'rgba(52,211,153,0.1)',  border: 'rgba(52,211,153,0.25)' },
}

export default function ModsSection() {
  return (
    <section className="py-28 px-6 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            label="BUILD · MODIFICATIONS"
            heading="Current Modifications"
            subtitle="Every change documented — what was done, why, and with what."
          />
        </motion.div>

        <div className="flex flex-col gap-10">
          {mods.map((mod, i) => {
            const isEven = i % 2 === 0
            const cat = categoryColors[mod.category]

            return (
              <motion.div
                key={mod.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                {/* Image placeholder */}
                <div className={isEven ? 'order-1' : 'order-1 md:order-2'}>
                  <div className="rounded-xl aspect-video flex flex-col items-center justify-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                      <span className="text-lg">📷</span>
                    </div>
                    <p className="text-[#555555] text-xs tracking-widest uppercase"
                      style={{ fontFamily: 'var(--font-mono)' }}>
                      {mod.imageAlt}
                    </p>
                  </div>
                </div>

                {/* Content card */}
                <div
                  className={`rounded-xl p-9 ${isEven ? 'order-2' : 'order-2 md:order-1'}`}
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.09)' }}
                >
                  <div className="flex items-center gap-3 mb-5">
                    <span
                      className="text-xs tracking-[0.2em] font-semibold px-3 py-1.5 rounded-md"
                      style={{ fontFamily: 'var(--font-mono)', color: cat.text, background: cat.bg, border: `1px solid ${cat.border}` }}
                    >
                      {mod.category}
                    </span>
                    <span
                      className="text-xs tracking-[0.15em] font-semibold px-3 py-1.5 rounded-md"
                      style={{ fontFamily: 'var(--font-mono)', color: '#34D399', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.25)' }}
                    >
                      {mod.status}
                    </span>
                  </div>

                  <h3
                    className="text-3xl font-bold uppercase text-white mb-4 leading-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {mod.title}
                  </h3>

                  <p
                    className="text-[#999999] text-base leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {mod.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
