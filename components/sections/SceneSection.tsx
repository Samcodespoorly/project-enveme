'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import type { PublicVehicle } from '@/lib/publicData'

gsap.registerPlugin(ScrollTrigger)

const SoarerScene = dynamic(() => import('@/components/three/SoarerScene'), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full"
      style={{
        background: 'var(--color-bg-primary)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          color: '#E8920A',
          fontSize: '0.6875rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        LOADING 3D SCENE...
      </p>
    </div>
  ),
})

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v))
}

type Props = { vehicle: PublicVehicle }

export default function SceneSection({ vehicle }: Props) {
  const heroSpecs = [
    { label: 'YEAR',    value: String(vehicle.year) },
    { label: 'MODEL',   value: vehicle.model.toUpperCase() },
    { label: 'CHASSIS', value: 'JZZ31' },
    { label: 'ENGINE',  value: '2JZ-GE' },
  ]
  const containerRef   = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<number>(0)
  const overlay1Ref    = useRef<HTMLDivElement>(null)
  const overlay2Ref    = useRef<HTMLDivElement>(null)
  const overlay3Ref    = useRef<HTMLDivElement>(null)
  const overlay4Ref    = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    setMounted(true)
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return
    const container = containerRef.current
    if (!container) return

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const p = self.progress
        scrollProgressRef.current = p

        // ── Overlay 1: Hero panel ──────────────────────────────────────
        // Stays fully visible until 15% scroll, then fades + rises out
        const el1 = overlay1Ref.current
        if (el1) {
          if (p < 0.15) {
            el1.style.opacity = '1'
            el1.style.transform = 'translateY(0px)'
            el1.style.pointerEvents = 'auto'
          } else {
            const t = clamp((p - 0.15) / 0.12)
            el1.style.opacity = String(1 - t)
            el1.style.transform = `translateY(${t * 32}px)`
            el1.style.pointerEvents = 'none'
          }
        }

        // ── Overlay 2: Engine specs panel (28–50%) ────────────────────
        const el2 = overlay2Ref.current
        if (el2) {
          const opacity = p < 0.28
            ? 0
            : p < 0.35
              ? clamp((p - 0.28) / 0.07)
              : p > 0.43
                ? clamp(1 - (p - 0.43) / 0.07)
                : 1
          const rawX = p < 0.35 ? (1 - clamp((p - 0.28) / 0.07)) * -40 : 0
          el2.style.opacity = String(opacity)
          el2.style.transform = `translateX(${rawX}px)`
        }

        // ── Overlay 3: Suspension panel (55–75%) ─────────────────────
        const el3 = overlay3Ref.current
        if (el3) {
          const opacity = p < 0.55
            ? 0
            : p < 0.62
              ? clamp((p - 0.55) / 0.07)
              : p > 0.68
                ? clamp(1 - (p - 0.68) / 0.07)
                : 1
          const rawX = p < 0.62 ? (1 - clamp((p - 0.55) / 0.07)) * 40 : 0
          el3.style.opacity = String(opacity)
          el3.style.transform = `translateX(${rawX}px)`
        }

        // ── Overlay 4: CTA (80–97%) ───────────────────────────────────
        const el4 = overlay4Ref.current
        if (el4) {
          const opacity = p < 0.8
            ? 0
            : p < 0.87
              ? clamp((p - 0.8) / 0.07)
              : p > 0.92
                ? clamp(1 - (p - 0.92) / 0.05)
                : 1
          const y = p < 0.87 ? (1 - clamp((p - 0.8) / 0.07)) * 20 : 0
          el4.style.opacity = String(opacity)
          el4.style.transform = `translateY(${y}px)`
        }
      },
    })

    return () => { trigger.kill() }
  }, [isMobile])

  // ── Mobile static hero (no canvas, no GSAP pin) ─────────────────────────
  if (!mounted) return null
  if (isMobile) {
    return (
      <section style={{
        minHeight: '100vh',
        background: 'var(--color-bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '7rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Ambient amber glow */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(232,146,10,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Label */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div style={{ width: '2.5rem', height: '1px', background: 'linear-gradient(to right, #E8920A, rgba(232,146,10,0.2))', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#E8920A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            PROJECT BUILD · NZ PLATE: ENVEME
          </span>
        </motion.div>

        {/* ENVEME heading */}
        <motion.h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(72px, 20vw, 120px)',
            fontWeight: 900,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            textShadow: '0 0 80px rgba(232,146,10,0.2)',
            marginBottom: '1.5rem',
          }}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          ENVEME
        </motion.h1>

        {/* Amber divider */}
        <motion.div
          style={{
            height: '2px',
            background: 'linear-gradient(to right, #E8920A 0%, rgba(232,146,10,0.1) 70%, transparent 100%)',
            marginBottom: '1.75rem',
            transformOrigin: 'left',
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Spec row */}
        <motion.div
          style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.5rem', marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {heroSpecs.map((spec, i) => (
            <div key={spec.label} style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {i > 0 && <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }} />}
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#E8920A', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.1rem' }}>
                  {spec.label}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#FFF', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {spec.value}
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#666', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '340px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Complete build documentation — mechanical, electrical, and chassis work tracked from acquisition to completion.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link href="/build" style={{
            fontFamily: 'var(--font-body)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: '#E8920A',
            color: '#000',
            fontWeight: 700,
            fontSize: '0.8125rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '0.875rem 2rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            Explore the Build
          </Link>
          <Link href="/specs" style={{
            fontFamily: 'var(--font-body)',
            display: 'inline-flex',
            alignItems: 'center',
            background: 'transparent',
            color: '#FFF',
            fontWeight: 600,
            fontSize: '0.8125rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            padding: '0.875rem 2rem',
            borderRadius: '0.5rem',
            border: '1px solid rgba(255,255,255,0.18)',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}>
            View Specs
          </Link>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(232,146,10,0.55), transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#444', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            Scroll to explore
          </span>
        </motion.div>
      </section>
    )
  }

  // ── Desktop: full 3D scroll-driven experience ─────────────────────────────
  return (
    <div
      ref={containerRef}
      style={{ height: '100vh', position: 'relative', background: 'var(--color-bg-primary)', overflow: 'hidden' }}
    >
      {/* Three.js canvas — full viewport */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <SoarerScene scrollProgressRef={scrollProgressRef} />
      </div>

      {/* ── Overlay 1: Hero panel (visible at load, exits on scroll) ── */}
      <div
        ref={overlay1Ref}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 10,
          pointerEvents: 'auto',
          opacity: 1,
        }}
      >
        {/* Constrain text to left ~50% of screen */}
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingLeft: 'clamp(2rem, 5vw, 5rem)',
            paddingRight: '2rem',
            maxWidth: 'min(58%, 640px)',
          }}
        >
          {/* Label with left amber rule */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.75rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div
              style={{
                width: '2.5rem',
                height: '1px',
                background: 'linear-gradient(to right, #E8920A, rgba(232,146,10,0.2))',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: '#E8920A',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              PROJECT BUILD · NZ PLATE: ENVEME
            </span>
          </motion.div>

          {/* ENVEME heading */}
          <motion.h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(60px, 11vw, 150px)',
              fontWeight: 900,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
              lineHeight: 0.88,
              textShadow: '0 0 80px rgba(232,146,10,0.2)',
              marginBottom: '1.5rem',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            ENVEME
          </motion.h1>

          {/* Amber divider line */}
          <motion.div
            style={{
              height: '2px',
              background: 'linear-gradient(to right, #E8920A 0%, rgba(232,146,10,0.1) 70%, transparent 100%)',
              marginBottom: '1.75rem',
              transformOrigin: 'left',
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Spec row */}
          <motion.div
            style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem 1.75rem', marginBottom: '1.5rem' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {heroSpecs.map((spec, i) => (
              <div key={spec.label} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                {i > 0 && (
                  <div
                    style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.1)', flexShrink: 0 }}
                  />
                )}
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.625rem',
                      color: '#E8920A',
                      letterSpacing: '0.25em',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.1rem',
                    }}
                  >
                    {spec.label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8125rem',
                      color: '#FFF',
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
              fontSize: 'clamp(0.875rem, 1.3vw, 1rem)',
              color: '#666',
              lineHeight: 1.65,
              maxWidth: '360px',
              marginBottom: '2.25rem',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Complete build documentation — mechanical, electrical, and chassis
            work tracked from acquisition to completion.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            style={{ display: 'flex', gap: '0.875rem', flexWrap: 'wrap' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
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
                padding: '0.875rem 2.25rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e =>
                ((e.currentTarget as HTMLAnchorElement).style.background = '#FBB940')
              }
              onMouseLeave={e =>
                ((e.currentTarget as HTMLAnchorElement).style.background = '#E8920A')
              }
            >
              Explore the Build
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2 6h8M6 2l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/specs"
              style={{
                fontFamily: 'var(--font-body)',
                display: 'inline-flex',
                alignItems: 'center',
                background: 'transparent',
                color: '#FFF',
                fontWeight: 600,
                fontSize: '0.8125rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                padding: '0.875rem 2.25rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.18)',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.2s ease, background 0.2s ease',
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

          {/* Scroll hint */}
          <motion.div
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '3rem' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div
              style={{
                width: '1px',
                height: '36px',
                background: 'linear-gradient(to bottom, rgba(232,146,10,0.55), transparent)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: '#444',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Overlay 2: Engine specs panel (28–50%, slides from left) ── */}
      <div
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          marginTop: '-6rem',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={overlay2Ref}
          className="glass"
          style={{
            opacity: 0,
            transform: 'translateX(-40px)',
            padding: '1.75rem 2rem',
            borderRadius: '1rem',
            maxWidth: '260px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: '#E8920A',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            ENGINE
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: '0.75rem',
            }}
          >
            2JZ-GE
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#AAAAAA',
              lineHeight: 1.7,
            }}
          >
            2997cc · 225 hp @ 6000 rpm
            <br />
            210 lb-ft @ 4800 rpm
            <br />
            Naturally aspirated
          </p>
        </div>
      </div>

      {/* ── Overlay 3: Suspension panel (55–75%, slides from right) ── */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          marginTop: '-6rem',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={overlay3Ref}
          className="glass"
          style={{
            opacity: 0,
            transform: 'translateX(40px)',
            padding: '1.75rem 2rem',
            borderRadius: '1rem',
            maxWidth: '260px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: 'var(--color-accent)',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            SUSPENSION
          </p>
          <p
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              lineHeight: 1.1,
              marginBottom: '0.75rem',
            }}
          >
            Tein Coilovers
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.8125rem',
              color: '#AAAAAA',
              lineHeight: 1.65,
            }}
          >
            Street Basis Z · −30mm drop
            <br />
            Four-wheel alignment set
          </p>
        </div>
      </div>

      {/* ── Overlay 4: CTA (80–97%) ── */}
      <div
        ref={overlay4Ref}
        style={{
          position: 'absolute',
          bottom: '4rem',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
          pointerEvents: 'none',
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6875rem',
            color: '#E8920A',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          SCROLL COMPLETE
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.01em',
          }}
        >
          Explore the Build ↓
        </p>
      </div>
    </div>
  )
}
