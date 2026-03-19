import SectionHeading from '@/components/ui/SectionHeading'

const placeholderPhotos = [
  { id: 1, label: 'Exterior — Front 3/4' },
  { id: 2, label: 'Engine Bay' },
  { id: 3, label: 'Interior' },
  { id: 4, label: 'Exterior — Rear 3/4' },
  { id: 5, label: 'Wheel Detail' },
  { id: 6, label: 'Suspension' },
]

export default function GalleryPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#0A0A0A', paddingTop: '9rem', paddingBottom: '6rem' }}>
      <div className="page-container">

        <SectionHeading
          label="PHOTOGRAPHY"
          heading="Gallery"
          subtitle="High-resolution build photography — added as the project progresses."
        />

        {/* 3×2 placeholder grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ marginBottom: '2rem' }}>
          {placeholderPhotos.map((photo) => (
            <div
              key={photo.id}
              style={{
                borderRadius: '1rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px dashed rgba(255,255,255,0.10)',
                aspectRatio: '4/3',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              {/* Camera icon placeholder */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ color: '#333', marginBottom: '0.25rem' }}
              >
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              <p style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5625rem',
                color: '#444',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
              }}>
                COMING SOON
              </p>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.75rem',
                color: '#555',
              }}>
                {photo.label}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          borderRadius: '1.25rem',
          background: 'rgba(255,255,255,0.02)',
          border: '1px solid rgba(255,255,255,0.06)',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#555', lineHeight: 1.7 }}>
            High-resolution build photography will be added as the project progresses.
          </p>
        </div>

      </div>
    </main>
  )
}
