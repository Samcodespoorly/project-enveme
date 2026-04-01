// Shimmer skeleton components for Firebase-backed sections
// These match the dark aesthetic: near-black bg + subtle amber-tinted shimmer

export function SkeletonShimmer({ style }: { style?: React.CSSProperties }) {
  return (
    <>
      <style>{`
        @keyframes skeleton-shimmer {
          0%   { background-position: -600px 0; }
          100% { background-position: 600px 0; }
        }
        .skeleton-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255,255,255,0.03) 0%,
            rgba(232,146,10,0.07) 40%,
            rgba(255,255,255,0.03) 80%
          );
          background-size: 600px 100%;
          animation: skeleton-shimmer 1.8s ease-in-out infinite;
        }
      `}</style>
      <div className="skeleton-shimmer" style={{ borderRadius: '0.5rem', ...style }} />
    </>
  )
}

// Skeleton for ModsSection — two card placeholders in a grid
export function ModsSectionSkeleton() {
  return (
    <section style={{ background: 'var(--color-bg-primary)', padding: '7rem 0' }}>
      <div className="page-container">
        {/* Section heading skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <SkeletonShimmer style={{ height: '0.625rem', width: '8rem', marginBottom: '1rem' }} />
          <SkeletonShimmer style={{ height: '2rem', width: '14rem', marginBottom: '0.75rem' }} />
          <SkeletonShimmer style={{ height: '0.875rem', width: '22rem', maxWidth: '100%' }} />
        </div>
        {/* Two card skeletons */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1.25rem' }} className="md-grid-2">
          {[0, 1].map(i => (
            <div
              key={i}
              style={{
                borderRadius: '1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderLeft: '3px solid rgba(232,146,10,0.2)',
                padding: '2.5rem',
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <SkeletonShimmer style={{ height: '1.5rem', width: '5rem', borderRadius: '0.375rem' }} />
                <SkeletonShimmer style={{ height: '1.5rem', width: '5rem', borderRadius: '0.375rem' }} />
              </div>
              <SkeletonShimmer style={{ height: '1.5rem', width: '70%', marginBottom: '1rem' }} />
              <SkeletonShimmer style={{ height: '0.875rem', width: '100%', marginBottom: '0.5rem' }} />
              <SkeletonShimmer style={{ height: '0.875rem', width: '85%' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Skeleton for TimelineSection — three timeline entry placeholders
export function TimelineSectionSkeleton() {
  return (
    <section style={{ background: 'var(--color-bg-secondary)', padding: '7rem 0' }}>
      <div className="page-container">
        {/* Section heading skeleton */}
        <div style={{ marginBottom: '3rem' }}>
          <SkeletonShimmer style={{ height: '0.625rem', width: '10rem', marginBottom: '1rem' }} />
          <SkeletonShimmer style={{ height: '2rem', width: '14rem', marginBottom: '0.75rem' }} />
          <SkeletonShimmer style={{ height: '0.875rem', width: '20rem', maxWidth: '100%' }} />
        </div>
        {/* Timeline entries */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '0.75rem',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'linear-gradient(to bottom, transparent, rgba(232,146,10,0.2) 8%, rgba(232,146,10,0.2) 92%, transparent)',
          }} />
          {[0, 1, 2].map(i => (
            <div key={i} style={{ paddingLeft: '2.5rem', marginBottom: '2.5rem' }}>
              {/* Node placeholder */}
              <div style={{
                position: 'absolute',
                left: '0.75rem',
                marginTop: '1.5rem',
                transform: 'translateX(-50%)',
                width: '0.75rem',
                height: '0.75rem',
                borderRadius: '50%',
                background: 'rgba(232,146,10,0.2)',
              }} />
              <div style={{
                borderRadius: '1.25rem',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                padding: '2.5rem',
              }}>
                <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '1.25rem' }}>
                  <SkeletonShimmer style={{ height: '0.75rem', width: '4rem' }} />
                  <SkeletonShimmer style={{ height: '1.5rem', width: '5rem', borderRadius: '0.375rem' }} />
                </div>
                <SkeletonShimmer style={{ height: '1.5rem', width: '60%', marginBottom: '1rem' }} />
                <SkeletonShimmer style={{ height: '0.875rem', width: '100%', marginBottom: '0.5rem' }} />
                <SkeletonShimmer style={{ height: '0.875rem', width: '80%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
