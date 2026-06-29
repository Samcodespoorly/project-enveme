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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.5rem',
      }}
    >
      <div style={{ position: 'relative', width: '48px', height: '48px' }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '1px solid rgba(232,146,10,0.15)',
          animation: 'scene-ping 1.8s cubic-bezier(0,0,0.2,1) infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '10px',
          borderRadius: '50%',
          border: '1px solid rgba(232,146,10,0.4)',
          animation: 'scene-ping 1.8s cubic-bezier(0,0,0.2,1) 0.4s infinite',
        }} />
        <div style={{
          position: 'absolute',
          inset: '20px',
          borderRadius: '50%',
          background: '#E8920A',
          opacity: 0.7,
        }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem' }}>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#E8920A',
          fontSize: '0.625rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
        }}>
          INITIALISING SCENE
        </p>
        <p style={{
          fontFamily: 'var(--font-mono)',
          color: '#444',
          fontSize: '0.5625rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
        }}>
          JZZ31 · 3D MODEL
        </p>
      </div>
    </div>
  ),
})

const BEATS = [
  { id: 'hero',      base: 'translateY(-50%)', in0: 0,    in1: 0,    out0: 0.09, out1: 0.16, enter: [0, 0]   as [number, number], exit: [0, -48] as [number, number], blur: 6 },
  { id: 'engine',    base: 'translateY(-50%)', in0: 0.20, in1: 0.29, out0: 0.34, out1: 0.41, enter: [-60, 0] as [number, number], exit: [0, -28] as [number, number], blur: 9 },
  { id: 'chassis',   base: 'translateY(-50%)', in0: 0.45, in1: 0.54, out0: 0.59, out1: 0.66, enter: [60, 0]  as [number, number], exit: [0, -28] as [number, number], blur: 9 },
  { id: 'telemetry', base: 'translateX(-50%)', in0: 0.62, in1: 0.70, out0: 0.78, out1: 0.84, enter: [0, 34]  as [number, number], exit: [0, -18] as [number, number], blur: 7 },
  { id: 'cta',       base: '',                 in0: 0.86, in1: 0.94, out0: 1.1,  out1: 1.2,  enter: [0, 26]  as [number, number], exit: [0, 0]   as [number, number], blur: 8 },
] as const

type Beat = typeof BEATS[number]

function paintBeat(beat: Beat, progress: number) {
  let op: number, ox: number, oy: number, bl: number
  if (progress < beat.in0)        { op=0; ox=beat.enter[0]; oy=beat.enter[1]; bl=beat.blur }
  else if (progress < beat.in1)   { const t=(progress-beat.in0)/(beat.in1-beat.in0||1); op=t; ox=beat.enter[0]*(1-t); oy=beat.enter[1]*(1-t); bl=beat.blur*(1-t) }
  else if (progress < beat.out0)  { op=1; ox=0; oy=0; bl=0 }
  else if (progress < beat.out1)  { const t=(progress-beat.out0)/(beat.out1-beat.out0); op=1-t; ox=beat.exit[0]*t; oy=beat.exit[1]*t; bl=beat.blur*t }
  else                            { op=0; ox=beat.exit[0]; oy=beat.exit[1]; bl=beat.blur }
  return {
    opacity: op,
    transform: `${beat.base} translate(${ox.toFixed(1)}px,${oy.toFixed(1)}px)`,
    filter: bl > 0.05 ? `blur(${bl.toFixed(1)}px)` : 'none',
  }
}

type Props = { vehicle: PublicVehicle }

export default function SceneSection({ vehicle }: Props) {
  const heroSpecs = [
    { label: 'YEAR',    value: String(vehicle.year) },
    { label: 'MODEL',   value: vehicle.model.toUpperCase() },
    { label: 'CHASSIS', value: 'JZZ31' },
    { label: 'ENGINE',  value: '2JZ-GE' },
  ]
  const containerRef      = useRef<HTMLDivElement>(null)
  const scrollProgressRef = useRef<number>(0)
  const overlay1Ref       = useRef<HTMLDivElement>(null)
  const overlay2Ref       = useRef<HTMLDivElement>(null)
  const overlay3Ref       = useRef<HTMLDivElement>(null)
  const overlay4Ref       = useRef<HTMLDivElement>(null)
  const overlay5Ref       = useRef<HTMLDivElement>(null)
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

    const beatRefs = [overlay1Ref, overlay2Ref, overlay3Ref, overlay4Ref, overlay5Ref]

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: '+=200%',
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const p = self.progress
        scrollProgressRef.current = p

        BEATS.forEach((beat, i) => {
          const el = beatRefs[i].current
          if (!el) return
          const s = paintBeat(beat, p)
          el.style.opacity = String(s.opacity)
          el.style.transform = s.transform
          el.style.filter = s.filter
          if (i === 0) el.style.pointerEvents = s.opacity > 0.05 ? 'auto' : 'none'
        })
      },
    })

    return () => { trigger.kill() }
  }, [isMobile, mounted])

  // ── Mobile static hero (no canvas, no GSAP pin) ─────────────────────────
  if (!mounted) {
    return (
      <div
        style={{ height: '100vh', visibility: 'hidden' }}
        aria-hidden="true"
      />
    )
  }
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

        <motion.p
          style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#888', lineHeight: 1.65, marginBottom: '2rem', maxWidth: '340px' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Complete build documentation — mechanical, electrical, and chassis work tracked from acquisition to completion.
        </motion.p>

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

        <motion.div
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '2.5rem' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(232,146,10,0.55), transparent)' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#777', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
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

      {/* ── Beat 0: Hero panel — visible at load, exits on scroll ── */}
      <div
        ref={overlay1Ref}
        data-beat="hero"
        style={{
          position: 'absolute',
          left: 0,
          top: '50%',
          zIndex: 10,
          paddingLeft: 'clamp(2rem, 5vw, 5rem)',
          paddingRight: '2rem',
          maxWidth: 'min(58%, 640px)',
          opacity: 1,
          transform: 'translateY(-50%)',
          pointerEvents: 'auto',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
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
              color: '#888',
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
                color: '#777',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
              }}
            >
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </div>

      {/* ── Beat 1: Engine specs panel (slides from left) ── */}
      <div
        style={{
          position: 'absolute',
          left: '2rem',
          top: '50%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={overlay2Ref}
          data-beat="engine"
          className="glass"
          style={{
            opacity: 0,
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

      {/* ── Beat 2: Chassis panel (slides from right) ── */}
      <div
        style={{
          position: 'absolute',
          right: '2rem',
          top: '50%',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={overlay3Ref}
          data-beat="chassis"
          className="glass"
          style={{
            opacity: 0,
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
            CHASSIS
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

      {/* ── Beat 3: Telemetry panel (centered, slides from below) ── */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '8rem',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <div
          ref={overlay4Ref}
          data-beat="telemetry"
          className="glass"
          style={{
            opacity: 0,
            padding: '1.5rem 2rem',
            borderRadius: '1rem',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5625rem',
              color: '#E8920A',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
            }}
          >
            ODOMETER
          </p>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1,
              letterSpacing: '0.05em',
            }}
          >
            {vehicle.odometer.toLocaleString()} km
          </p>
        </div>
      </div>

      {/* ── Beat 4: CTA (enters from below, stays) ── */}
      <div
        ref={overlay5Ref}
        data-beat="cta"
        style={{
          position: 'absolute',
          bottom: '4rem',
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          zIndex: 10,
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.625rem',
            color: '#E8920A',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            pointerEvents: 'none',
          }}
        >
          PROJECT ENVEME · JZZ31
        </p>
        <p
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4.5vw, 3rem)',
            fontWeight: 800,
            color: '#FFFFFF',
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            marginBottom: '1.75rem',
            textShadow: '0 0 60px rgba(232,146,10,0.25)',
            pointerEvents: 'none',
          }}
        >
          Ready to Explore?
        </p>
        <Link
          href="/build"
          style={{
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
            padding: '0.9rem 2.25rem',
            borderRadius: '0.5rem',
            textDecoration: 'none',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e =>
            ((e.currentTarget as HTMLAnchorElement).style.background = '#FBB940')
          }
          onMouseLeave={e =>
            ((e.currentTarget as HTMLAnchorElement).style.background = '#E8920A')
          }
        >
          SCROLL TO EXPLORE →
        </Link>
      </div>
    </div>
  )
}
