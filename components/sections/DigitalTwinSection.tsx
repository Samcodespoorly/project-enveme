'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import type { PublicMod } from '@/lib/publicData'
import type { TwinHotspotDef } from '@/components/three/TwinCanvas'

const TwinCanvas = dynamic(() => import('@/components/three/TwinCanvas'), {
  ssr: false,
  loading: () => (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#E8920A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
        LOADING DIGITAL TWIN
      </p>
    </div>
  ),
})

// ── Hotspot anchors ─────────────────────────────────────────────────────────
// Positions are in the normalised model space produced by CarModel (car spans
// ~4 units along its long axis, centred at origin, ground ≈ y −0.55).
// Each anchor claims the first public mod whose name/category matches; an
// anchor with a fallback stays visible even when no matching mod is public.

type AnchorDef = {
  id: string
  label: string
  position: [number, number, number]
  match: RegExp
  fallback?: {
    name: string
    brand: string
    detail: string
    href: string
    hrefLabel: string
  }
}

const ANCHORS: AnchorDef[] = [
  {
    id: 'wheels',
    label: 'Wheels',
    position: [0.85, -0.25, 1.18],
    match: /wheel|rim|tyre|tire|emotion|workmeister/i,
  },
  {
    id: 'engine',
    label: 'Engine bay',
    position: [0.15, 0.2, 1.35],
    match: /filter|intake|engine|spark|ignition|2jz|exhaust|oil/i,
  },
  {
    id: 'suspension',
    label: 'Suspension',
    position: [0.85, -0.3, -1.15],
    match: /coilover|suspension|spring|damper|strut|sway|tein/i,
    fallback: {
      name: 'Tein Street Basis Z',
      brand: 'Tein',
      detail: 'JZZ31-specific coilover kit · −30 mm drop · four-wheel alignment set after install.',
      href: '/build/tein-coilover-install',
      hrefLabel: 'Read the install journal',
    },
  },
]

type ResolvedHotspot = TwinHotspotDef & {
  mod: PublicMod | null
  fallback?: AnchorDef['fallback']
}

function resolveHotspots(mods: PublicMod[]): ResolvedHotspot[] {
  const claimed = new Set<string>()
  return ANCHORS.map((anchor): ResolvedHotspot | null => {
    const mod = mods.find(m => !claimed.has(m.id) && anchor.match.test(`${m.name} ${m.category}`)) ?? null
    if (mod) claimed.add(mod.id)
    if (!mod && !anchor.fallback) return null
    return { id: anchor.id, label: anchor.label, position: anchor.position, mod, fallback: anchor.fallback }
  }).filter((h): h is ResolvedHotspot => h !== null)
}

// ── Detail panel ────────────────────────────────────────────────────────────

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: '#666', letterSpacing: '0.25em', textTransform: 'uppercase', display: 'block', marginBottom: '0.2rem' }}>
        {label}
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: '#DDD' }}>{value}</span>
    </div>
  )
}

function PanelContent({ hotspot, onClose }: { hotspot: ResolvedHotspot; onClose: () => void }) {
  const { mod, fallback } = hotspot

  const title = mod?.name ?? fallback?.name ?? hotspot.label
  const brand = mod?.brand ?? fallback?.brand ?? null
  const body = mod?.description ?? fallback?.detail ?? null
  const href = mod ? '/parts' : fallback?.href ?? '/parts'
  const hrefLabel = mod ? 'View in parts catalogue' : fallback?.hrefLabel ?? 'View parts catalogue'

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '0.875rem' }}>
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#E8920A', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.625rem' }}>
            {hotspot.label}
          </p>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', fontWeight: 700, color: '#FFF', textTransform: 'uppercase', letterSpacing: '0.02em', lineHeight: 1.15 }}>
            {title}
          </h3>
          {brand && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.8125rem', color: '#E8920A', marginTop: '0.3rem', fontWeight: 500 }}>{brand}</p>
          )}
        </div>
        <button
          onClick={onClose}
          aria-label="Close part details"
          style={{
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '0.5rem',
            color: '#999',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'color 0.2s ease-out, border-color 0.2s ease-out',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#FFF'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#999'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {body && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: '#AAA', lineHeight: 1.65, marginBottom: '1.25rem' }}>
          {body}
        </p>
      )}

      {(mod?.partNumber || mod?.oemPartNumber || mod?.fitmentNotes || mod?.installDate) && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '0.875rem 1.25rem',
          paddingTop: '1rem',
          borderTop: '1px solid rgba(255,255,255,0.07)',
          marginBottom: '1.5rem',
        }}>
          {mod?.partNumber && <FieldRow label="Part No." value={mod.partNumber} />}
          {mod?.oemPartNumber && <FieldRow label="OEM Cross-Ref" value={mod.oemPartNumber} />}
          {mod?.fitmentNotes && <FieldRow label="Fitment" value={mod.fitmentNotes} />}
          {mod?.installDate && (
            <FieldRow
              label="Installed"
              value={`${new Date(mod.installDate).toLocaleDateString('en-NZ', { month: 'short', year: 'numeric' })}${mod.installOdometer ? ` · ${mod.installOdometer.toLocaleString('en-NZ')} km` : ''}`}
            />
          )}
        </div>
      )}

      <Link
        href={href}
        style={{
          fontFamily: 'var(--font-body)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: '#E8920A',
          fontWeight: 600,
          fontSize: '0.75rem',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          textDecoration: 'none',
        }}
      >
        {hrefLabel}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </>
  )
}

// ── Section ─────────────────────────────────────────────────────────────────

type Props = { mods: PublicMod[] }

export default function DigitalTwinSection({ mods }: Props) {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reducedMotion, setReducedMotion] = useState(false)

  const hotspots = resolveHotspots(mods)
  const selected = hotspots.find(h => h.id === selectedId) ?? null

  useEffect(() => {
    setReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '400px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!selectedId) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setSelectedId(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId])

  return (
    <section
      ref={sectionRef}
      id="digital-twin"
      style={{ background: 'var(--color-bg-primary)', padding: '7rem 0 5rem', position: 'relative', overflow: 'hidden' }}
    >
      <div className="page-container" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ width: '2.5rem', height: '1px', background: 'linear-gradient(to right, #E8920A, rgba(232,146,10,0.2))', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: '#E8920A', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
            INTERACTIVE · LIVE PARTS DATA
          </span>
        </div>

        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
          fontWeight: 800,
          color: '#FFF',
          textTransform: 'uppercase',
          letterSpacing: '-0.02em',
          lineHeight: 0.95,
          marginBottom: '1rem',
        }}>
          Digital Twin
        </h2>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.9375rem', color: '#888', lineHeight: 1.65, maxWidth: '34rem', marginBottom: '0.5rem' }}>
          Drag to orbit. Tap a marker to pull that component&apos;s record — brand,
          part numbers, and fitment — straight from the GarageOS database.
        </p>
      </div>

      {/* Stage */}
      <div style={{ position: 'relative', height: 'clamp(420px, 72vh, 720px)', marginTop: '1rem' }}>
        {visible && (
          <TwinCanvas
            hotspots={hotspots}
            selectedId={selectedId}
            onSelect={setSelectedId}
            reducedMotion={reducedMotion}
          />
        )}

        {/* Part detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.aside
              key={selected.id}
              initial={{ opacity: 0, x: 32 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 24 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="glass"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: 'clamp(1rem, 4vw, 3rem)',
                width: 'min(360px, calc(100vw - 2rem))',
                padding: '1.75rem 1.875rem',
                borderRadius: '1rem',
                zIndex: 50,
              }}
              aria-live="polite"
            >
              <PanelContent hotspot={selected} onClose={() => setSelectedId(null)} />
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Hint chip */}
        {!selectedId && (
          <div style={{
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            background: 'rgba(10,10,10,0.7)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '2rem',
            padding: '0.5rem 1.125rem',
            pointerEvents: 'none',
            backdropFilter: 'blur(8px)',
          }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#E8920A', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5625rem', color: '#999', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              Drag to orbit · Tap a marker
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
