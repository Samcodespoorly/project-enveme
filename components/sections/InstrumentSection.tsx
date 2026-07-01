'use client'

import { useRef, useEffect, Fragment } from 'react'

const CX = 100, CY = 96, R = 76, A0 = 135, A1 = 405
const ARC_LEN = 2 * Math.PI * R * (270 / 360)
const DIGIT_H = 46

function toRad(d: number) { return (d - 90) * Math.PI / 180 }
function pt(ang: number, r: number): [number, number] {
  return [CX + r * Math.cos(toRad(ang)), CY + r * Math.sin(toRad(ang))]
}
function arc(r: number, d0: number, d1: number): string {
  const [x0, y0] = pt(d0, r), [x1, y1] = pt(d1, r)
  return `M ${x0.toFixed(2)} ${y0.toFixed(2)} A ${r} ${r} 0 ${(d1 - d0) > 180 ? 1 : 0} 1 ${x1.toFixed(2)} ${y1.toFixed(2)}`
}

interface Tick { x1: number; y1: number; x2: number; y2: number; maj: boolean; num?: number | string; lx?: number; ly?: number }

function buildTicks(count: number, labels: (string | number)[]): Tick[] {
  const out: Tick[] = []
  for (let i = 0; i <= count; i++) {
    const ang = A0 + (A1 - A0) * (i / count)
    const maj = i % 2 === 0
    const [ox, oy] = pt(ang, R + 2), [ix, iy] = pt(ang, R - (maj ? 11 : 6))
    const t: Tick = { x1: ox, y1: oy, x2: ix, y2: iy, maj }
    if (maj && labels[i / 2] !== undefined) {
      const [lx, ly] = pt(ang, R - 23)
      t.num = labels[i / 2]; t.lx = lx; t.ly = ly
    }
    out.push(t)
  }
  return out
}

interface GaugeProps {
  label: string
  sublabel: string
  max: number
  tickLabels: (string | number)[]
  unit: string
  redFrom?: number
  needleRef: React.RefObject<SVGLineElement | null>
  arcRef: React.RefObject<SVGPathElement | null>
  valRef: React.RefObject<HTMLSpanElement | null>
}

function GaugeSVG({ label, sublabel, max, tickLabels, unit, redFrom, needleRef, arcRef, valRef }: GaugeProps) {
  const [nx, ny] = pt(A0, R - 18)
  const ticks = buildTicks(10, tickLabels)
  const mainArc = arc(R, A0, A1)
  const redPath = redFrom != null ? arc(R, A0 + (A1 - A0) * (redFrom / max), A1) : null

  return (
    <div style={{ width: '100%', maxWidth: '320px', margin: '0 auto' }}>
      {/* SVG contains only arc geometry, ticks, and needle — no text */}
      <svg viewBox="0 0 200 175" style={{ width: '100%', overflow: 'visible' }}>
        {/* Track arc */}
        <path d={mainArc} stroke="var(--line)" strokeWidth={5.5} fill="none" />
        {/* Animated fill arc */}
        <path
          ref={arcRef} d={mainArc} stroke="var(--accent)" strokeWidth={5.5} fill="none"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN.toFixed(2)}
          strokeDashoffset={ARC_LEN.toFixed(2)}
        />
        {redPath && <path d={redPath} stroke="var(--accent-2)" strokeWidth={5.5} fill="none" opacity={0.55} />}

        {/* Ticks */}
        {ticks.map((t, i) => (
          <line key={i}
            x1={t.x1.toFixed(1)} y1={t.y1.toFixed(1)}
            x2={t.x2.toFixed(1)} y2={t.y2.toFixed(1)}
            stroke={t.maj ? 'var(--ink-soft)' : 'var(--line)'}
            strokeWidth={t.maj ? 1.8 : 1.2}
          />
        ))}

        {/* Tick labels */}
        {ticks.filter(t => t.maj && t.lx != null).map((t, i) => (
          <text key={i}
            x={t.lx!.toFixed(1)} y={t.ly!.toFixed(1)}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-mono)" fontSize={9.5} fill="var(--ink-soft)"
          >
            {t.num}
          </text>
        ))}

        {/* Needle */}
        <line
          ref={needleRef}
          x1={CX} y1={CY} x2={nx.toFixed(1)} y2={ny.toFixed(1)}
          stroke="var(--ink)" strokeWidth={3} strokeLinecap="round"
          transform="rotate(0 100 96)"
        />
        <circle cx={CX} cy={CY} r={8.5} fill="var(--ink)" />
        <circle cx={CX} cy={CY} r={3} fill="var(--accent)" />
      </svg>

      {/* Value + label in HTML below the SVG — no overlap possible */}
      <div style={{ textAlign: 'center', marginTop: '-0.25rem' }}>
        <div>
          <span
            ref={valRef}
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.6rem', color: 'var(--ink)' }}
          >0</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.18em',
            color: 'var(--accent)', textTransform: 'uppercase', marginLeft: '0.4rem',
          }}>{unit}</span>
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.55rem', letterSpacing: '0.28em',
          color: 'var(--ink-faint)', textTransform: 'uppercase', marginTop: '0.3rem',
        }}>{label}</div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.5rem', letterSpacing: '0.15em',
          color: 'var(--ink-faint)', opacity: 0.6, textTransform: 'uppercase',
        }}>{sublabel}</div>
      </div>
    </div>
  )
}

function animateGauge(
  needle: SVGLineElement | null,
  arcEl: SVGPathElement | null,
  valEl: HTMLSpanElement | null,
  target: number,
  max: number,
  fmt?: (n: number) => string,
) {
  if (!needle || !arcEl || !valEl) return
  const frac = Math.min(target / max, 1)
  const targetDeg = A0 + (A1 - A0) * frac
  const dur = 1700
  const t0 = performance.now()
  const ease = (t: number) => 1 - Math.pow(1 - t, 3)
  const overshoot = (t: number) => { const c = 1.3; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) }
  const frame = (now: number) => {
    const p = Math.min(1, (now - t0) / dur)
    const swing = overshoot(p)
    needle.setAttribute('transform', `rotate(${((targetDeg - A0) * Math.min(1, swing)).toFixed(2)} ${CX} ${CY})`)
    arcEl.style.strokeDashoffset = String(ARC_LEN * (1 - frac * ease(p)))
    const v = Math.round(target * ease(p))
    valEl.textContent = fmt ? fmt(v) : String(v)
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

interface Props {
  odometer: number
  completedProjects: number
  totalProjects: number
  partsInstalled: number
}

export default function InstrumentSection({ odometer, completedProjects, totalProjects, partsInstalled }: Props) {
  const clusterRef = useRef<HTMLDivElement>(null)
  const buildNeedle  = useRef<SVGLineElement>(null)
  const buildArc     = useRef<SVGPathElement>(null)
  const buildVal     = useRef<HTMLSpanElement>(null)
  const modsNeedle   = useRef<SVGLineElement>(null)
  const modsArc      = useRef<SVGPathElement>(null)
  const modsVal      = useRef<HTMLSpanElement>(null)
  const stripRefs    = useRef<(HTMLDivElement | null)[]>([])

  const digits = String(odometer).padStart(6, '0').split('').map(Number)

  const buildPct = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0
  const modsMax = Math.max(20, Math.ceil(partsInstalled / 10) * 10 + 10)

  useEffect(() => {
    const el = clusterRef.current
    if (!el) return
    const digs = String(odometer).padStart(6, '0').split('').map(Number)
    let fired = false
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired) return
      fired = true
      io.disconnect()
      animateGauge(buildNeedle.current, buildArc.current, buildVal.current, buildPct, 100, v => `${v}%`)
      animateGauge(modsNeedle.current, modsArc.current, modsVal.current, partsInstalled, modsMax)
      digs.forEach((d, i) => {
        setTimeout(() => {
          const strip = stripRefs.current[i]
          if (strip) strip.style.transform = `translateY(${-d * DIGIT_H}px)`
        }, i * 130)
      })
    }, { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [odometer, buildPct, partsInstalled, modsMax])

  const buildLabels = [0, 10, 20, 30, 40, 50].map(v => `${v}%`)
  const modsLabels  = Array.from({ length: 6 }, (_, i) => Math.round(modsMax * i / 10))

  return (
    <section style={{ position: 'relative', zIndex: 5, background: 'var(--bg)', padding: 'clamp(4.5rem,11vh,8rem) clamp(1.25rem,5vw,5rem)', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
            Build Status · live readout
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem,5.5vw,4rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-.02em', color: 'var(--ink)', marginTop: '.4rem' }}>
            The<br />Build
          </h2>
        </div>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '330px', fontSize: '1rem', lineHeight: 1.6 }}>
          Build completion tracks finished timeline stages. Parts count is synced live from GarageOS. The odometer is the current reading.
        </p>
      </div>

      <div
        ref={clusterRef}
        style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.1fr', gap: 'clamp(1rem,3vw,3rem)', alignItems: 'center' }}
      >
        <GaugeSVG
          label="Build Completion"
          sublabel={`${completedProjects} of ${totalProjects} stages`}
          max={100}
          tickLabels={buildLabels}
          unit="complete"
          redFrom={90}
          needleRef={buildNeedle} arcRef={buildArc} valRef={buildVal}
        />

        {/* Centre — odometer */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.1rem' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>
            Odometer · current
          </span>
          <div style={{ display: 'inline-flex', gap: '4px', padding: '.7rem .8rem', background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 'var(--radius)' }}>
            {digits.map((_, i) => (
              <Fragment key={i}>
                {i === 3 && (
                  <span style={{ alignSelf: 'center', color: 'var(--ink-faint)', fontFamily: 'var(--font-mono)' }}>,</span>
                )}
                <div style={{
                  position: 'relative', width: '30px', height: `${DIGIT_H}px`, overflow: 'hidden',
                  background: i === digits.length - 1 ? 'var(--accent)' : 'var(--bg2)',
                  borderRadius: '2px', boxShadow: 'inset 0 2px 6px rgba(0,0,0,.28)',
                }}>
                  <div
                    ref={el => { stripRefs.current[i] = el }}
                    style={{ position: 'absolute', left: 0, top: 0, width: '100%', transition: 'transform 1.6s cubic-bezier(.22,1,.36,1)' }}
                  >
                    {Array.from({ length: 11 }, (_, n) => (
                      <span key={n} style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        height: `${DIGIT_H}px`,
                        fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: '1.5rem',
                        color: i === digits.length - 1 ? 'var(--on-accent)' : 'var(--ink)',
                      }}>
                        {n % 10}
                      </span>
                    ))}
                  </div>
                </div>
              </Fragment>
            ))}
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.62rem', letterSpacing: '.14em', color: 'var(--ink-soft)', textTransform: 'uppercase' }}>
            kilometres · synced from GarageOS
          </span>
        </div>

        <GaugeSVG
          label="Parts Installed"
          sublabel="synced from GarageOS"
          max={modsMax}
          tickLabels={modsLabels}
          unit="parts"
          needleRef={modsNeedle} arcRef={modsArc} valRef={modsVal}
        />
      </div>
    </section>
  )
}
