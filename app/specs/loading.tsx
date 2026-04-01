export default function SpecsLoading() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: '#E8920A',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
        }}
      >
        Loading Specs...
      </p>
    </main>
  )
}
