import { DerivedSpecs } from '@/lib/publicData'

const PROVENANCE = [
  { k: 'Acquired',     v: 'Browns Bay, NZ',      sub: 'July 2025' },
  { k: 'On the clock', v: '≈49,000 km',           sub: 'at purchase' },
  { k: 'Gearbox',      v: 'R154 manual swap',     sub: 'Kaspa Transmissions · 2020' },
  { k: 'Engine spec',  v: 'Early non-VVT-i',      sub: 'thicker rods · distributor' },
  { k: 'Finish',       v: 'Bluish Silver',         sub: 'metallic 1A0' },
  { k: 'NZ plate',     v: 'ENVEME',               sub: 'street registered' },
]

const MODS = [
  { name: 'R154 Manual Conversion',    brand: 'Kaspa Transmissions', cat: 'Drivetrain', col: '#34D399', note: '5-speed manual swap · 2020' },
  { name: 'Street Basis Z Coilovers',  brand: 'Tein',                cat: 'Suspension', col: '#E8920A', note: '−30 mm ride height' },
  { name: 'Drop-in Performance Filter', brand: 'K&N',                cat: 'Intake',     col: '#60A5FA', note: 'Factory airbox panel' },
  { name: '5308L Alarm & Security',    brand: 'Avital',              cat: 'Electrical', col: '#A78BFA', note: 'Two-way · hard-wired' },
  { name: 'FH-P040 Bluetooth Retrofit', brand: 'Carrozzeria',        cat: 'Audio',      col: '#22D3EE', note: 'Soldered into OE head unit' },
  { name: 'Drive Belt & Tensioner',    brand: 'Gates',               cat: 'Engine',     col: '#F87171', note: 'Belt + aftermarket tensioner' },
  { name: 'Harmonic Damper',           brand: 'OEM-equivalent',      cat: 'Engine',     col: '#F87171', note: 'Crankshaft pulley renewal' },
  { name: 'Valve Cover Gaskets',       brand: 'Amayama',             cat: 'Engine',     col: '#F87171', note: 'Both cam covers · oil leak' },
]

export default function ProvenanceSection({ specs }: { specs: DerivedSpecs }) {
  return (
    <section style={{ position: 'relative', zIndex: 5, background: 'var(--bg)', padding: 'clamp(4.5rem,11vh,8rem) clamp(1.25rem,5vw,5rem)', borderTop: '1px solid var(--line-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
        <div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
            Provenance · single source of truth
          </span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.1rem,5.5vw,4rem)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.9, letterSpacing: '-.02em', color: 'var(--ink)', marginTop: '.4rem' }}>
            The<br />Specification
          </h2>
        </div>
        <p style={{ color: 'var(--ink-soft)', maxWidth: '330px', fontSize: '1rem', lineHeight: 1.6 }}>
          Pulled from the GarageOS backend that runs the car — never lorem ipsum, always the current recorded state.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1px', background: 'var(--line-soft)', border: '1px solid var(--line-soft)', marginBottom: '3.5rem' }}>
        {PROVENANCE.map((p) => (
          <div key={p.k} style={{ background: 'var(--bg)', padding: '1.5rem 1.6rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.56rem', letterSpacing: '.24em', textTransform: 'uppercase', color: 'var(--accent)' }}>{p.k}</div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.45rem', fontWeight: 700, color: 'var(--ink)', lineHeight: 1.05, margin: '.5rem 0 .2rem', textTransform: 'uppercase' }}>{p.v}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.64rem', letterSpacing: '.06em', color: 'var(--ink-soft)' }}>{p.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ columns: 2, columnGap: '3.5rem' }}>
        {specs.keySpecs.map((s) => (
          <div key={s.label} style={{ breakInside: 'avoid', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '1rem', padding: '.72rem 0', borderBottom: '1px solid var(--line-soft)' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.66rem', letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--ink-faint)' }}>{s.label}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.82rem', color: 'var(--ink)', textAlign: 'right', letterSpacing: '.02em' }}>{s.value}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '3.5rem' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.6rem', letterSpacing: '.3em', color: 'var(--ink-faint)', textTransform: 'uppercase' }}>
          Fitment-verified · {MODS.length} parts
        </span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.6rem,4vw,2.6rem)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '-.01em', marginTop: '.6rem', color: 'var(--ink)' }}>
          Parts Fitted
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1px', background: 'var(--line-soft)', border: '1px solid var(--line-soft)', marginTop: '1.5rem' }}>
        {MODS.map((m) => (
          <div key={m.name} style={{ background: 'var(--bg)', padding: '1.4rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '.7rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.58rem', letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)' }}>{m.brand}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '.52rem', letterSpacing: '.18em', textTransform: 'uppercase', padding: '.22rem .5rem', borderRadius: '999px', border: '1px solid currentColor', color: m.col }}>{m.cat}</span>
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 700, color: 'var(--ink)', textTransform: 'uppercase', lineHeight: 1.05, letterSpacing: '.01em' }}>{m.name}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '.66rem', color: 'var(--ink-soft)', letterSpacing: '.04em' }}>{m.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
