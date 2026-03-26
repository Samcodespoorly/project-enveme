'use client'

import AnimatedText from '@/components/ui/AnimatedText'
import SectionHeading from '@/components/ui/SectionHeading'
import { homepageSpecs } from '@/lib/vehicleData'

export default function SpecsSection() {
  return (
    <section style={{ background: 'var(--color-bg-secondary)', padding: '7rem 0' }}>
      <div className="wide-container">
        <AnimatedText>
          <SectionHeading
            label="PLATFORM · JZZ31 CHASSIS"
            heading="Technical Specs"
            subtitle="Factory figures for the 1995 JZZ31 — the foundation everything is built on."
          />
        </AnimatedText>

        {/* 2 cols mobile → 4 cols md+ */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {homepageSpecs.map((spec, i) => (
            <AnimatedText key={spec.label} delay={i * 0.05}>
              <div className="card spec-card" style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute', top: 0, left: '1.5rem', right: '1.5rem',
                  height: '1px',
                  background: 'linear-gradient(to right, rgba(232,146,10,0.7), rgba(232,146,10,0.2), transparent)',
                }} />
                <span
                  className="spec-value"
                  style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                    fontWeight: 700,
                    color: '#E8920A',
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}
                >
                  {spec.value}
                </span>
                <span style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  color: '#666',
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                }}>
                  {spec.label}
                </span>
              </div>
            </AnimatedText>
          ))}
        </div>
      </div>
    </section>
  )
}
