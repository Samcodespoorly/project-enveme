'use client'

import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

const mods = [
  {
    category: 'ENGINE',
    title: 'Cold Air Intake',
    description:
      'High-flow cold air intake system routed away from the engine bay heat soak. Improves throttle response and adds an aggressive induction note under load.',
    status: 'INSTALLED',
    imageAlt: 'Cold air intake installation',
  },
  {
    category: 'SUSPENSION',
    title: 'Coilover Suspension',
    description:
      'Tein street basis coilovers front and rear with adjustable ride height. Ride height lowered 30mm from standard, with a four-wheel alignment to factory spec.',
    status: 'INSTALLED',
    imageAlt: 'Coilover suspension',
  },
  {
    category: 'ELECTRICAL',
    title: 'Defi Gauge Cluster',
    description:
      'Defi-Link BF series oil pressure, oil temperature, and water temperature gauges mounted on an A-pillar pod. Integrated with the Defi control unit for data logging.',
    status: 'INSTALLED',
    imageAlt: 'Defi gauge cluster',
  },
  {
    category: 'INTERIOR',
    title: 'Custom Steering Wheel',
    description:
      'Nardi Classic 350mm leather steering wheel fitted with a Works Bell hub adapter. Reduces steering column reach and improves driving position for spirited driving.',
    status: 'INSTALLED',
    imageAlt: 'Custom steering wheel',
  },
]

const categoryColors: Record<string, string> = {
  ENGINE: '#E8920A',
  SUSPENSION: '#E8920A',
  ELECTRICAL: '#E8920A',
  INTERIOR: '#E8920A',
}

export default function ModsSection() {
  return (
    <section className="py-24 px-6 bg-[#111111]">
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
            subtitle="A documented record of every modification made to the JZZ31 platform."
          />
        </motion.div>

        <div className="flex flex-col gap-8">
          {mods.map((mod, i) => {
            const isEven = i % 2 === 0

            return (
              <motion.div
                key={mod.title}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Image placeholder — left on even, right on odd */}
                <div className={isEven ? 'order-1' : 'order-1 md:order-2'}>
                  <div className="bg-[#1A1A1A] border border-white/10 rounded-lg aspect-video flex items-center justify-center">
                    <p
                      className="text-[#444444] text-xs tracking-widest"
                      style={{ fontFamily: 'var(--font-mono)' }}
                    >
                      {mod.imageAlt.toUpperCase()}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className={`glass rounded-xl p-8 ${isEven ? 'order-2' : 'order-2 md:order-1'}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="text-xs tracking-[0.2em] font-medium px-2.5 py-1 rounded border"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: categoryColors[mod.category],
                        borderColor: `${categoryColors[mod.category]}40`,
                        background: `${categoryColors[mod.category]}10`,
                      }}
                    >
                      {mod.category}
                    </span>
                    <span
                      className="text-xs tracking-[0.15em] font-medium px-2.5 py-1 rounded border"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: '#22C55E',
                        borderColor: '#22C55E40',
                        background: '#22C55E10',
                      }}
                    >
                      {mod.status}
                    </span>
                  </div>

                  <h3
                    className="text-2xl font-bold uppercase text-white mb-3"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {mod.title}
                  </h3>

                  <p
                    className="text-[#A0A0A0] text-sm leading-relaxed"
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
