'use client'

import AnimatedText from '@/components/ui/AnimatedText'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section style={{ background: 'var(--color-bg-primary)', padding: '7rem 0', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '500px', height: '300px',
          background: 'rgba(232,146,10,0.07)',
          borderRadius: '50%',
          filter: 'blur(100px)',
        }} />
      </div>

      <div className="page-container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <AnimatedText>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: '#E8920A',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1.25rem',
          }}>
            PROJECT ENVEME
          </p>
        </AnimatedText>

        <AnimatedText delay={0.08}>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: 700,
            color: '#FFF',
            textTransform: 'uppercase',
            lineHeight: 1,
            letterSpacing: '-0.02em',
          }}>
            Explore the Full Build
          </h2>
        </AnimatedText>

        <AnimatedText delay={0.15}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1.0625rem',
            color: '#AAAAAA',
            maxWidth: '36rem',
            margin: '1.5rem auto 0',
          }}>
            Every modification, service record, and project decision — documented in detail.
          </p>
        </AnimatedText>

        <AnimatedText delay={0.22}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginTop: '2.5rem',
          }}>
            <Link href="/build" style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#000',
              background: '#E8920A',
              padding: '1rem 2.5rem',
              borderRadius: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'transform 0.2s ease-out, background 0.2s',
            }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              Build Journal
            </Link>
            <Link href="/about" style={{
              display: 'inline-block',
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#FFF',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.2)',
              padding: '1rem 2.5rem',
              borderRadius: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.15em',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s ease-out',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              About the Engineer
            </Link>
          </div>
        </AnimatedText>

        <AnimatedText delay={0.28}>
          <p style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: '#555',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '1.75rem',
          }}>
            Or connect directly:{' '}
            <a
              href="https://www.linkedin.com/in/samuel-donovan-293470275/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#E8920A',
                textDecoration: 'none',
                letterSpacing: '0.2em',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#FBB940')}
              onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#E8920A')}
            >
              linkedin.com/in/samuel-donovan →
            </a>
          </p>
        </AnimatedText>
      </div>
    </section>
  )
}
