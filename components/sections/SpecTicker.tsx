const ITEMS: [string, string][] = [
  ['Engine', '2JZ-GE'], ['Disp', '2997 cc'], ['Power', '168 kW'], ['Torque', '285 Nm'],
  ['Redline', '6800 rpm'], ['Gearbox', 'R154'], ['Layout', 'RWD'], ['Weight', '1590 kg'],
  ['Chassis', 'JZZ31'], ['Colour', '1A0'], ['Plate', 'ENVEME'],
]

const itemStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '.66rem',
  letterSpacing: '.2em',
  textTransform: 'uppercase',
  padding: '0 1.4rem',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '.6rem',
}

const dotStyle: React.CSSProperties = {
  width: '4px',
  height: '4px',
  background: 'var(--on-accent)',
  borderRadius: '50%',
  display: 'inline-block',
  opacity: 0.6,
  fontStyle: 'normal',
}

function Segment() {
  return (
    <>
      {ITEMS.map(([k, v], i) => (
        <span key={i} style={itemStyle}>
          {k}&nbsp;<b style={{ fontWeight: 700 }}>{v}</b>
          <i style={dotStyle} />
        </span>
      ))}
    </>
  )
}

export default function SpecTicker() {
  return (
    <div
      className="ticker-outer sec-reveal"
      style={{
        position: 'relative',
        zIndex: 5,
        overflow: 'hidden',
        background: 'var(--accent)',
        color: 'var(--on-accent)',
        borderTop: '1px solid rgba(0,0,0,.18)',
        borderBottom: '1px solid rgba(0,0,0,.18)',
        padding: '.55rem 0',
      }}
    >
      <div
        className="ticker-inner"
        style={{
          display: 'inline-flex',
          gap: 0,
          whiteSpace: 'nowrap',
          animation: 'tickerscroll 34s linear infinite',
          willChange: 'transform',
        }}
      >
        <Segment />
        <Segment />
      </div>
    </div>
  )
}
