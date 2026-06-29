import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactButtons from '@/components/ui/ContactButtons'
import { fetchPublicProfile } from '@/lib/publicData'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'About — ENVEME',
  description: 'Samuel Donovan — Mechatronics & Finance/Economics student. Project ENVEME is a live engineering portfolio.',
}

export default async function AboutPage() {
  const profile = await fetchPublicProfile()

  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="SAMUEL DONOVAN · ENGINEER"
          heading="About the Engineer"
        />

        {/* Status badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.625rem',
          background: 'rgba(232,146,10,0.08)',
          border: '1px solid rgba(232,146,10,0.2)',
          borderRadius: '2rem',
          padding: '0.4375rem 1rem',
          marginBottom: '2rem',
        }}>
          <span className="status-dot-live" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#E8920A', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            {profile.availability}
          </span>
        </div>

        {/* Quick stats row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem 2.5rem',
          marginBottom: '3.5rem',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          {profile.stats.map(stat => (
            <div key={stat.label}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#666', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.25rem' }}>
                {stat.label}
              </span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#DDDDDD', fontWeight: 500 }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>

        {/* Intro */}
        <div style={{ marginBottom: '4rem', maxWidth: '44rem' }}>
          {profile.intro.map((para, i) => (
            <p
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1.0625rem',
                color: '#BBBBBB',
                lineHeight: 1.75,
                marginBottom: i < profile.intro.length - 1 ? '1.25rem' : undefined,
              }}
            >
              {para}
            </p>
          ))}
        </div>

        {/* Education */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#FFF',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            marginBottom: '1.25rem',
          }}>
            Education
          </h3>
          <div style={{
            borderRadius: '1.25rem',
            background: 'rgba(255,255,255,0.04)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            borderLeft: '3px solid #E8920A',
            padding: '2.5rem 3rem',
            transition: 'border-color 0.3s ease-out, transform 0.3s ease-out, box-shadow 0.3s ease-out',
          }}>
            <p style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: '#E8920A',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              marginBottom: '0.875rem',
            }}>
              {profile.education.status}
            </p>
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#FFF',
              textTransform: 'uppercase',
              letterSpacing: '0.03em',
              marginBottom: '1rem',
            }}>
              {profile.education.degree}
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#BBBBBB', lineHeight: 1.7 }}>
              {profile.education.description}
            </p>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '3.5rem' }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#FFF',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            marginBottom: '1.25rem',
          }}>
            Skill Areas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
            {profile.skills.map((skill) => (
              <div key={skill.title} className="card" style={{ padding: '2rem' }}>
                <h4 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  color: '#FFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.75rem',
                }}>
                  {skill.title}
                </h4>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#AAAAAA', lineHeight: 1.65 }}>
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Capabilities */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#FFF',
            textTransform: 'uppercase',
            letterSpacing: '0.03em',
            marginBottom: '1.25rem',
          }}>
            This Project Demonstrates
          </h3>
          <div className="card">
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {profile.capabilities.map((cap) => (
                <li key={cap} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ marginTop: '0.5rem', width: '6px', height: '6px', borderRadius: '50%', background: '#E8920A', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#BBBBBB', lineHeight: 1.65 }}>
                    {cap}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Get in Touch ─────────────────────────────────────────── */}
        <div style={{ marginTop: '5rem' }}>
          {/* Amber rule */}
          <div style={{
            height: '1px',
            background: 'linear-gradient(to right, #E8920A, rgba(232,146,10,0.1), transparent)',
            marginBottom: '3rem',
          }} />

          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: '#E8920A', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem' }}>
            CONTACT
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>
            Let&apos;s Connect
          </h2>

          {/* Status badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.625rem',
            background: 'rgba(232,146,10,0.1)',
            border: '1px solid rgba(232,146,10,0.25)',
            borderRadius: '2rem',
            padding: '0.5rem 1.25rem',
            marginBottom: '2rem',
          }}>
            <span className="status-dot-live" style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#34D399', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#E8920A', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Open to internships &amp; graduate roles · Auckland, NZ · 2026
            </span>
          </div>

          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: '#BBBBBB', lineHeight: 1.75, maxWidth: '38rem', marginBottom: '2.5rem' }}>
            Interested in working together, or just curious about the build? I&apos;m actively seeking engineering internships and graduate positions. Reach out on LinkedIn or browse the project code on GitHub.
          </p>

          <ContactButtons />
        </div>

      </div>
    </main>
  )
}
