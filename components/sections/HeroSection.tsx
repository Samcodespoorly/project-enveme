'use client'

import { motion } from 'framer-motion'
import type { Transition } from 'framer-motion'
import Link from 'next/link'

// ── Animation helpers ──────────────────────────────────────────────────────
const EASE = [0.22, 1, 0.36, 1] as Transition['ease']

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, delay, ease: EASE },
})

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.9, delay },
})

// ── Spec data ──────────────────────────────────────────────────────────────
const specs = [
  { label: 'YEAR',    value: '1995' },
  { label: 'MODEL',   value: 'SOARER' },
  { label: 'CHASSIS', value: 'JZZ31' },
  { label: 'ENGINE',  value: '2JZ-GE' },
]

export default function HeroSection() {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center bg-[#0A0A0A] overflow-hidden"
    >

      {/* ── Dot / grid texture ─────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* ── Amber radial glow ──────────────────────────────────────────── */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: '-5%',
          left: '-10%',
          width: '900px',
          height: '700px',
          background:
            'radial-gradient(ellipse at 30% 40%, rgba(232,146,10,0.08) 0%, transparent 65%)',
        }}
      />

      {/* ── Ghost chassis text ─────────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '-6%',
          right: '-1%',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(140px, 20vw, 300px)',
          fontWeight: 900,
          color: 'transparent',
          WebkitTextStroke: '1px rgba(232,146,10,0.055)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
        }}
        {...fadeIn(0.4)}
      >
        JZZ31
      </motion.div>

      {/* ── Left amber accent line ─────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute left-0 top-0 bottom-0 pointer-events-none"
        style={{
          width: '2px',
          background:
            'linear-gradient(to bottom, transparent 0%, #E8920A 18%, #E8920A 82%, transparent 100%)',
          opacity: 0.45,
          transformOrigin: 'top',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* ── HUD corner: top-left ───────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute top-8 left-6 sm:left-10 pointer-events-none"
        {...fadeIn(0.9)}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'rgba(232,146,10,0.45)',
            letterSpacing: '0.22em',
            lineHeight: 2,
            textTransform: 'uppercase',
          }}
        >
          <div>CHASSIS · JZZ31</div>
          <div>ENGINE · 2JZ-GE · 3.0L</div>
          <div>YEAR · 1995</div>
        </div>
      </motion.div>

      {/* ── HUD corner: top-right ─────────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute top-8 right-6 sm:right-10 pointer-events-none"
        {...fadeIn(1.0)}
      >
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
          <circle cx="22" cy="22" r="18" stroke="rgba(232,146,10,0.2)" strokeWidth="1" />
          <circle cx="22" cy="22" r="6"  stroke="rgba(232,146,10,0.45)" strokeWidth="1" />
          <circle cx="22" cy="22" r="2"  fill="rgba(232,146,10,0.5)" />
          <line x1="22" y1="0"  x2="22" y2="8"  stroke="rgba(232,146,10,0.35)" strokeWidth="1" />
          <line x1="22" y1="36" x2="22" y2="44" stroke="rgba(232,146,10,0.35)" strokeWidth="1" />
          <line x1="0"  y1="22" x2="8"  y2="22" stroke="rgba(232,146,10,0.35)" strokeWidth="1" />
          <line x1="36" y1="22" x2="44" y2="22" stroke="rgba(232,146,10,0.35)" strokeWidth="1" />
        </svg>
      </motion.div>

      {/* ── HUD corner: bottom-right ──────────────────────────────────── */}
      <motion.div
        aria-hidden
        className="absolute bottom-10 right-6 sm:right-10 pointer-events-none"
        {...fadeIn(1.1)}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: 'rgba(255,255,255,0.18)',
            letterSpacing: '0.22em',
            lineHeight: 2,
            textTransform: 'uppercase',
            textAlign: 'right',
          }}
        >
          <div>BUILD STATUS · ACTIVE</div>
          <div>LOCATION · AUCKLAND, NZ</div>
          <div>ODO · 102,000 KM</div>
        </div>
      </motion.div>

      {/* ── Main content ───────────────────────────────────────────────── */}
      <div className="relative z-10 w-full page-container" style={{ paddingTop: '7rem', paddingBottom: '7rem' }}>

        {/* Label with flanking rules */}
        <motion.div
          className="flex items-center gap-5 mb-10"
          {...fadeIn(0.25)}
        >
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(to right, rgba(232,146,10,0.6), rgba(232,146,10,0.05))',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: '#E8920A',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            PROJECT BUILD · NZ PLATE: ENVEME
          </span>
          <div
            style={{
              flex: 1,
              height: '1px',
              background:
                'linear-gradient(to left, rgba(232,146,10,0.6), rgba(232,146,10,0.05))',
            }}
          />
        </motion.div>

        {/* Giant heading */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 16vw, 196px)',
            fontWeight: 900,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.9,
            textShadow: '0 0 100px rgba(232,146,10,0.18)',
            marginBottom: '1.75rem',
          }}
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          ENVEME
        </motion.h1>

        {/* Amber divider line */}
        <motion.div
          style={{
            height: '2px',
            background:
              'linear-gradient(to right, #E8920A 0%, rgba(232,146,10,0.12) 60%, transparent 100%)',
            marginBottom: '2.25rem',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Spec row */}
        <motion.div
          className="flex flex-wrap items-start gap-x-8 gap-y-3 mb-8"
          {...fadeUp(0.5)}
        >
          {specs.map((spec, i) => (
            <div key={spec.label} className="flex items-center gap-5">
              {i > 0 && (
                <div
                  style={{
                    width: '1px',
                    height: '22px',
                    background: 'rgba(255,255,255,0.1)',
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.4375rem',
                    color: '#E8920A',
                    letterSpacing: '0.25em',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.15rem',
                  }}
                >
                  {spec.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    color: '#FFFFFF',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.9375rem, 1.5vw, 1.125rem)',
            color: '#777',
            lineHeight: 1.65,
            maxWidth: '420px',
            marginBottom: '3rem',
          }}
          {...fadeUp(0.6)}
        >
          Complete build documentation — mechanical, electrical, and chassis
          work tracked from acquisition to completion.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-start gap-4"
          {...fadeUp(0.7)}
        >
          {/* Primary */}
          <Link
            href="/build"
            style={{
              fontFamily: 'var(--font-body)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              background: '#E8920A',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.8125rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              borderRadius: '0.5rem',
              transition: 'background 0.2s ease, transform 0.2s ease',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e =>
              ((e.currentTarget as HTMLAnchorElement).style.background = '#FBB940')
            }
            onMouseLeave={e =>
              ((e.currentTarget as HTMLAnchorElement).style.background = '#E8920A')
            }
          >
            Explore the Build
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path
                d="M2.5 6.5h8M7 2.5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          {/* Secondary */}
          <Link
            href="/specs"
            style={{
              fontFamily: 'var(--font-body)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.625rem',
              background: 'transparent',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.8125rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '1rem 2.5rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,255,255,0.18)',
              transition: 'border-color 0.2s ease, background 0.2s ease',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.4)'
              el.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement
              el.style.borderColor = 'rgba(255,255,255,0.18)'
              el.style.background = 'transparent'
            }}
          >
            View Specs
          </Link>
        </motion.div>
      </div>

      {/* ── Scroll hint ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.4 }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.5rem',
            color: '#444',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: '1px',
            height: '40px',
            background: 'linear-gradient(to bottom, rgba(232,146,10,0.55), transparent)',
          }}
        />
      </motion.div>
    </section>
  )
}
