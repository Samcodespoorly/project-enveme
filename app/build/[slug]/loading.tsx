export default function BuildEntryLoading() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        {/* Back link skeleton */}
        <div style={{
          height: '0.6875rem',
          width: '7rem',
          borderRadius: '0.25rem',
          background: 'rgba(255,255,255,0.06)',
          marginBottom: '2.5rem',
          animation: 'skeleton-pulse 1.6s ease-in-out infinite',
        }} />

        {/* Meta row: badge + date + read-time */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <div style={{ height: '1.25rem', width: '5rem', borderRadius: '9999px', background: 'rgba(232,146,10,0.18)', animation: 'skeleton-pulse 1.6s ease-in-out infinite' }} />
          <div style={{ height: '0.75rem', width: '4rem', borderRadius: '0.25rem', background: 'rgba(255,255,255,0.06)', animation: 'skeleton-pulse 1.6s ease-in-out 0.1s infinite' }} />
          <div style={{ height: '0.75rem', width: '3rem', borderRadius: '0.25rem', background: 'rgba(255,255,255,0.06)', animation: 'skeleton-pulse 1.6s ease-in-out 0.2s infinite' }} />
        </div>

        {/* Amber rule */}
        <div style={{ height: '1px', background: 'rgba(232,146,10,0.12)', marginBottom: '2rem' }} />

        {/* Title skeleton — large heading */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ height: 'clamp(2rem, 5vw, 3.5rem)', width: '80%', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.08)', marginBottom: '0.75rem', animation: 'skeleton-pulse 1.6s ease-in-out infinite' }} />
          <div style={{ height: 'clamp(2rem, 5vw, 3.5rem)', width: '55%', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', animation: 'skeleton-pulse 1.6s ease-in-out 0.1s infinite' }} />
        </div>

        {/* Separator */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginBottom: '2.5rem' }} />

        {/* Paragraph skeletons */}
        <div style={{ maxWidth: '720px' }}>
          {[
            { lines: [1, 0.95, 0.9, 0.7],  delay: 0 },
            { lines: [1, 0.98, 0.85, 0.92, 0.6], delay: 0.08 },
            { lines: [1, 0.88, 0.93],       delay: 0.16 },
            { lines: [1, 0.96, 0.82, 0.75], delay: 0.24 },
            { lines: [1, 0.9, 0.65],        delay: 0.32 },
          ].map((para, pi) => (
            <div key={pi} style={{ marginBottom: '1.75rem' }}>
              {para.lines.map((w, li) => (
                <div
                  key={li}
                  style={{
                    height: '0.9rem',
                    width: `${w * 100}%`,
                    borderRadius: '0.25rem',
                    background: 'rgba(255,255,255,0.06)',
                    marginBottom: li < para.lines.length - 1 ? '0.45rem' : 0,
                    animation: `skeleton-pulse 1.6s ease-in-out ${para.delay + li * 0.04}s infinite`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </main>
  )
}
