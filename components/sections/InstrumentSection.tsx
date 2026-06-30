'use client'

import { useRef, useEffect, Fragment } from 'react'

const CX = 100, CY = 100, R = 78, A0 = 135, A1 = 405
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

interface Tick { x1: number; y1: number; x2: number; y2: number; maj: boolean; num?: number; lx?: number; ly?: number }

function buildTicks(max: number): Tick[] {
  const out: Tick[] = []
  for (let i = 0; i <= 10; i++) {
    const ang = A0 + (A1 - A0) * (i / 10)
    const maj = i % 2 === 0
    const [ox, oy] = pt(ang, R + 2), [ix, iy] = pt(ang, R - (maj ? 12 : 7))
    const t: Tick = { x1: ox, y1: oy, x2: ix, y2: iy, maj }
    if (maj) {
      const [lx, ly] = pt(ang, R - 24)
      t.num = Math.round(max * i / 10); t.lx = lx; t.ly = ly
    }
    out.push(t)
  }
  return out
}

interface GaugeProps {
  max: number; unit: string; label: string; redFrom?: number
  needleRef: React.RefObject<SVGLineElement | null>
  arcRef: React.RefObject<SVGPathElement | null>
  valRef: React.RefObject<SVGTSpanElement | null>
}

function GaugeSVG({ max, unit, label, redFrom, needleRef, arcRef, valRef }: GaugeProps) {
  const [nx, ny] = pt(A0, R - 18)
  const ticks = buildTicks(max)
  const mainArc = arc(R, A0, A1)
  const redPath = redFrom != null ? arc(R, A0 + (A1 - A0) * (redFrom / max), A1) : null

  return (
    <div style={{ position: 'relative', aspectRatio: '1', maxWidth: '340px', margin: '0 auto', width: '100%' }}>
      <svg viewBox="0 0 200 200" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
        <path d={mainArc} stroke="var(--line)" strokeWidth={6} fill="none" />
        <path
          ref={arcRef} d={mainArc} stroke="var(--accent)" strokeWidth={6} fill="none"
          strokeLinecap="round"
          strokeDasharray={ARC_LEN.toFixed(2)}
          strokeDashoffset={ARC_LEN.toFixed(2)}
        />
        {redPath && <path d={redPath} stroke="var(--accent-2)" strokeWidth={6} fill="none" opacity={0.7} />}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1.toFixed(1)} y1={t.y1.toFixed(1)}
            x2={t.x2.toFixed(1)} y2={t.y2.toFixed(1)}
            stroke={t.maj ? 'var(--ink-soft)' : 'var(--line)'}
            strokeWidth={t.maj ? 2 : 1.4}
          />
        ))}
        {ticks.filter(t => t.maj && t.lx != null).map((t, i) => (
          <text
            key={i} x={t.lx!.toFixed(1)} y={t.ly!.toFixed(1)}
            textAnchor="middle" dominantBaseline="middle"
            fontFamily="var(--font-mono)" fontSize={11} fill="var(--ink-soft)"
          >
            {t.num}
          </text>
        ))}
        <line
          ref={needleRef}
          x1={CX} y1={CY} x2={nx.toFixed(1)} y2={ny.toFixed(1)}
          stroke="var(--ink)" strokeWidth={3.2} strokeLinecap="round"
          transform="rotate(0 100 100)"
        />
        <circle cx={CX} cy={CY} r={9} fill="var(--ink)" />
        <circle cx={CX} cy={CY} r={3.5} fill="var(--accent)" />
        <text x={CX} y={CY + 30} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={8.5} letterSpacing="0.24em" fill="var(--ink-faint)">
          {label.toUpperCase()}
        </text>
        <text x={CX} y={CY + 56} textAnchor="middle" fontFamily="var(--font-display)" fontWeight={800} fontSize={22} fill="var(--ink)">
          <tspan ref={valRef}>0</tspan>
          <tspan fontFamily="var(--font-mono)" fontSize={11} fill="var(--accent)"> {unit}</tspan>
        </text>
      </svg>
    </div>
  )
}

function animateGauge(
  needle: SVGLineElement | null,
  arcEl: SVGPathElement | null,
  valEl: SVGTSpanElement | null,
  target: number,
  max: number,
) {
  if (!needle || !arcEl || !valEl) return
  const frac = target / max
  const targetDeg = A0 + (A1 - A0) * frac
  const dur = 1700
  const t0 = performance.now()
  const ease = (t: number) => 1 - Math.pow(1 - t, 3)
  const overshoot = (t: number) => { const c = 1.4; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2) }
  const frame = (now: number) => {
    const p = Math.min(1, (now - t0) / dur)
    const e = ease(p)
    const swing = overshoot(p)
    needle.setAttribute('transform', `rotate(${((targetDeg - A0) * Math.min(1, swing)).toFixed(2)} 100 100)`)
    arcEl.style.strokeDashoffset = String(ARC_LEN * (1 - frac * e))
    valEl.textContent = Math.round(target * e).toLocaleString('en-NZ')
    if (p < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export default function InstrumentSection({ odometer }: { odometer: number }) {
  const clusterRef = useRef<HTMLDivElement>(null)
  const tachNeedle = useRef<SVGLineElement>(null)
  const tachArc = useRef<SVGPathElement>(null)
  const tachVal = useRef<SVGTSpanElement>(null)
  const torqNeedle = useRef<SVGLineElement>(null)
  const torqArc = useRef<SVGPathElement>(null)
  const torqVal = useRef<SVGTSpanElement>(null)
  const stripRefs = useRef<(HTMLDivElement | null)[]>([])

  const digits = String(odometer).padStart(6, '0').split('').map(Number)

  useEffect(() => {
    const el = clusterRef.current
    if (!el) return
    const digs = String(odometer).padStart(6, '0').split('').map(Number)
    let fired = false
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || fired) return
      fired = true
      io.disconnect()
      animateGauge(tachNeedle.current, tachArc.current, tachVal.current, 6, 8)
      animateGauge(torqNeedle.current, torqArc.current, torqVal.current, 285, 350)
      digs.forEach((d, i) => {
        setTimeout(() => {
          const strip = stripRefs.current[i]
          if (strip) strip.style.transform = `translateY(${-d * DIGIT_H}px)`
        }, i * 130)
      })
    }, { threshold: 0.18 })
    io.observe(el)
    return () => io.disconnect()
  }, [odometer])

  return (
    <section style={{ position: 'relative', zIndex: 5, background: 'var(--bg)', padding: 'clamp(4.5rem,11vh,8rem) clamp(1.25rem,5vw,5rem)', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
            Instrumentation · live readout
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem,5.5vw,4rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-.02em', color: 'var(--ink)', marginTop: '.4rem' }}>
            The<br />Numbers
          </h2>
        </div>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '330px', fontSize: '1rem', lineHeight: 1.6 }}>
          The 2JZ-GE&apos;s naturally-aspirated figures, read straight off the spec — needle-swept from zero. The odometer is the current reading, synced from GarageOS.
        </p>
      </div>

      <div
        ref={clusterRef}
        style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr 1.1fr', gap: 'clamp(1rem,3vw,3rem)', alignItems: 'center' }}
      >
        <GaugeSVG max={8} unit="×1k rpm" label="Power · RPM ×1000" redFrom={6.8} needleRef={tachNeedle} arcRef={tachArc} valRef={tachVal} />

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

        <GaugeSVG max={350} unit="Nm" label="Peak Torque" needleRef={torqNeedle} arcRef={torqArc} valRef={torqVal} />
      </div>
    </section>
  )
}
