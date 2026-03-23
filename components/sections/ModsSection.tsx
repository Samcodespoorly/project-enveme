'use client'

import AnimatedText from '@/components/ui/AnimatedText'
import Badge from '@/components/ui/Badge'
import SectionHeading from '@/components/ui/SectionHeading'
import type { PublicMod } from '@/lib/publicData'

const CATEGORY_COLORS: Record<string, string> = {
  suspension: '#60A5FA',
  engine:     '#F97316',
  interior:   '#A78BFA',
  exterior:   '#34D399',
  electrical: '#FCD34D',
  drivetrain: '#FB7185',
  other:      '#E8920A',
  part:       '#E8920A',
  safety:     '#EF4444',
  consumable: '#F97316',
  tool:       '#8B5CF6',
}

type Props = { mods: PublicMod[] }

export default function ModsSection({ mods }: Props) {
  const displayMods = mods.map(mod => ({
    title: mod.name,
    description: mod.description ?? (mod.brand ? `${mod.brand} ${mod.name}` : mod.name),
    category: mod.category.toUpperCase(),
    tagColor: CATEGORY_COLORS[mod.category] ?? '#E8920A',
    status: 'INSTALLED',
  }))

  return (
    <section style={{ background: '#0A0A0A', padding: '7rem 0' }}>
      <div className="page-container">
        <AnimatedText>
          <SectionHeading
            label="BUILD · MODIFICATIONS"
            heading="Current Mods"
            subtitle="Every change documented — what was done, why, and with what."
          />
        </AnimatedText>

        {displayMods.length === 0 ? (
          <AnimatedText>
            <div className="card" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#E8920A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                BUILD IN PROGRESS
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#666' }}>
                Modifications coming soon — check back as the build progresses.
              </p>
            </div>
          </AnimatedText>
        ) : (
          /* 2-column grid on desktop */
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(1, 1fr)',
            gap: '1.25rem',
          }}
            className="md-grid-2"
          >
            {displayMods.map((mod, i) => (
              <AnimatedText key={mod.title + i} delay={i * 0.06}>
                <div
                  className="card"
                  style={{
                    borderLeft: `3px solid ${mod.tagColor}`,
                    borderRadius: '1.25rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                    <Badge label={mod.category} color={mod.tagColor} />
                    <Badge label={mod.status} color="#34D399" />
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
                    fontWeight: 700,
                    color: '#FFF',
                    textTransform: 'uppercase',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                  }}>
                    {mod.title}
                  </h3>

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9375rem',
                    color: '#AAAAAA',
                    lineHeight: 1.7,
                  }}>
                    {mod.description}
                  </p>
                </div>
              </AnimatedText>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
