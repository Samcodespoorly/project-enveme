import type { Metadata } from 'next'
import SectionHeading from '@/components/ui/SectionHeading'
import ContactButtons from '@/components/ui/ContactButtons'

export const metadata: Metadata = {
  title: 'About — ENVEME',
  description: 'Samuel Donovan — Mechatronics & Finance/Economics student. Project ENVEME is a live engineering portfolio.',
}

const skills = [
  { title: 'Mechanical Engineering', description: 'Thermodynamics, dynamics, materials science, and machine design applied to real-world automotive systems.' },
  { title: 'Electrical Systems', description: 'Vehicle wiring, CAN bus diagnostics, sensor integration, and embedded microcontroller projects.' },
  { title: 'Software Development', description: 'Full-stack web development with Next.js, TypeScript, Firebase. This site is a live demonstration.' },
  { title: 'Project Management', description: 'Budgeting, scheduling, and documentation of a long-running engineering project from acquisition through build.' },
  { title: 'Financial Analysis', description: 'Total cost of ownership modelling, build cost tracking, and depreciation analysis for the JZZ31 platform.' },
  { title: 'AI-Assisted Development', description: 'Leveraging AI tools for code generation, research, and documentation acceleration throughout the project.' },
]

const capabilities = [
  'End-to-end engineering project ownership — from concept to execution',
  'Integration of mechanical, electrical, and software systems',
  'Quantitative analysis of project cost and value',
  'Technical documentation and portfolio communication',
  'Iterative problem solving under real constraints',
  'Full-stack web application development with modern tooling',
]

export default function AboutPage() {
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
            Available · Auckland, NZ · 2026
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
          {[
            { label: 'Degree', value: 'Conjoint BE + BCom' },
            { label: 'Specialisation', value: 'Mechatronics · Finance' },
            { label: 'Year', value: 'Year 3 (in progress)' },
            { label: 'Location', value: 'Auckland, New Zealand' },
          ].map(stat => (
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
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#BBBBBB', lineHeight: 1.75, marginBottom: '1.25rem' }}>
            I&apos;m Samuel Donovan — a conjoint Mechatronics Engineering and Finance/Economics student in New Zealand. Project ENVEME is my platform to demonstrate full-stack engineering capability: from the mechanical knowledge to maintain and modify a 1995 Toyota Soarer, to the software skills to build this portfolio, to the financial analysis that underpins every build decision.
          </p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.0625rem', color: '#BBBBBB', lineHeight: 1.75 }}>
            The JZZ31 Soarer is the perfect project platform — a naturally aspirated inline-6, a sophisticated chassis, and a growing community. Every stage of the build is documented here as a living portfolio of applied engineering.
          </p>
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
              CONJOINT DEGREE · IN PROGRESS
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
              BE(Hons) Mechatronics · BCom Finance/Economics
            </h4>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#BBBBBB', lineHeight: 1.7 }}>
              A conjoint degree combining honours-level engineering with commerce. Covering control systems, embedded software, financial modelling, and economic analysis.
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
            {skills.map((skill) => (
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
              {capabilities.map((cap) => (
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
