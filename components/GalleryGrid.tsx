'use client'

import { useState, useEffect, useCallback } from 'react'
import type { PublicGallery, PublicGallerySet } from '@/lib/publicData'

function statusStyle(status: PublicGallerySet['status']) {
  if (status === 'PUBLISHED') return { color: '#34D399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' }
  if (status === 'SHOOTING')  return { color: '#FCD34D', bg: 'rgba(252,211,77,0.1)',  border: 'rgba(252,211,77,0.2)' }
  return                               { color: '#9CA3AF', bg: 'rgba(156,163,175,0.1)', border: 'rgba(156,163,175,0.2)' }
}

function Lightbox({
  set, initialIndex, onClose,
}: {
  set: PublicGallerySet
  initialIndex: number
  onClose: () => void
}) {
  const [idx, setIdx] = useState(initialIndex)
  const images = set.images

  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, prev, next])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.92)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        backdropFilter: 'blur(8px)',
      }}
    >
      {/* header */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.25rem 1.5rem',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)',
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.5rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            {set.label}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'rgba(255,255,255,0.7)', letterSpacing: '0.1em' }}>
            {idx + 1} / {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '0.5rem', color: '#fff', cursor: 'pointer',
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* main image */}
      <div
        onClick={e => e.stopPropagation()}
        style={{ position: 'relative', maxWidth: '90vw', maxHeight: '80vh', display: 'flex', alignItems: 'center' }}
      >
        <img
          key={images[idx].url}
          src={images[idx].url}
          alt={images[idx].caption ?? ''}
          style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', borderRadius: '0.5rem' }}
        />

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              style={{
                position: 'absolute', left: '-3rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '40px', height: '40px',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M8 2L4 6l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              style={{
                position: 'absolute', right: '-3rem', top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '50%', width: '40px', height: '40px',
                color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* caption */}
      {images[idx].caption && (
        <p
          onClick={e => e.stopPropagation()}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
            color: 'rgba(255,255,255,0.5)', letterSpacing: '0.1em',
            marginTop: '1rem', textAlign: 'center',
          }}
        >
          {images[idx].caption}
        </p>
      )}

      {/* thumbnail strip */}
      {images.length > 1 && (
        <div
          onClick={e => e.stopPropagation()}
          style={{
            position: 'fixed', bottom: 0, left: 0, right: 0,
            display: 'flex', gap: '6px', justifyContent: 'center',
            padding: '1rem 1.5rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            overflowX: 'auto',
          }}
        >
          {images.map((img, i) => (
            <button
              key={img.url}
              onClick={() => setIdx(i)}
              style={{
                flexShrink: 0, width: '48px', height: '36px',
                borderRadius: '4px', overflow: 'hidden',
                border: `2px solid ${i === idx ? 'var(--accent)' : 'transparent'}`,
                padding: 0, cursor: 'pointer', background: 'none',
                opacity: i === idx ? 1 : 0.5,
                transition: 'opacity 0.15s, border-color 0.15s',
              }}
            >
              <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function GalleryGrid({ gallery }: { gallery: PublicGallery }) {
  const [lightbox, setLightbox] = useState<{ set: PublicGallerySet; idx: number } | null>(null)

  return (
    <>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
        gap: '1rem',
        marginBottom: '4rem',
      }}>
        {gallery.sets.map((set) => {
          const badge = statusStyle(set.status)
          const coverUrl = set.coverUrl ?? set.images[0]?.url
          const hasImages = set.images.length > 0
          const clickable = hasImages

          return (
            <div
              key={set.id}
              className="card"
              onClick={() => clickable && setLightbox({ set, idx: 0 })}
              style={{
                display: 'flex', flexDirection: 'column', gap: '0.75rem',
                minHeight: '140px', justifyContent: 'space-between',
                opacity: hasImages ? 1.0 : 0.7,
                cursor: clickable ? 'pointer' : 'default',
              }}
            >
              {coverUrl ? (
                <div style={{
                  width: '100%', height: '160px',
                  borderRadius: '0.75rem', overflow: 'hidden', position: 'relative',
                }}>
                  <img
                    src={coverUrl}
                    alt={set.label}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  {set.images.length > 0 && (
                    <span style={{
                      position: 'absolute', bottom: '0.5rem', right: '0.5rem',
                      fontFamily: 'var(--font-mono)', fontSize: '0.5rem',
                      color: '#fff', background: 'rgba(0,0,0,0.6)',
                      padding: '0.2rem 0.5rem', borderRadius: '0.25rem', letterSpacing: '0.1em',
                    }}>
                      {set.images.length} PHOTOS
                    </span>
                  )}
                  {clickable && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 0.2s',
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.25)')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0)')}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ opacity: 0, transition: 'opacity 0.2s' }}
                        ref={el => {
                          if (!el) return
                          const parent = el.parentElement!
                          const show = () => (el.style.opacity = '1')
                          const hide = () => (el.style.opacity = '0')
                          parent.addEventListener('mouseenter', show)
                          parent.addEventListener('mouseleave', hide)
                        }}
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              ) : (
                <div style={{
                  width: '100%', height: '80px', borderRadius: '0.75rem',
                  background: 'repeating-linear-gradient(45deg, var(--surface) 0px, var(--surface) 4px, transparent 4px, transparent 12px)',
                  border: '1px dashed var(--line)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.25 }}>
                    <rect x="3" y="3" width="18" height="18" rx="2" stroke="var(--accent)" strokeWidth="1.5" />
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="var(--accent)" strokeWidth="1.5" />
                    <path d="M21 15l-5-5L5 21" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}

              <div>
                <p style={{
                  fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700,
                  color: 'var(--ink)', textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '0.25rem',
                }}>
                  {set.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.625rem',
                  color: 'var(--ink-faint)', letterSpacing: '0.1em',
                }}>
                  {set.note}
                </p>
              </div>

              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.5625rem',
                color: badge.color, background: badge.bg,
                border: `1px solid ${badge.border}`,
                padding: '0.2rem 0.625rem', borderRadius: '0.375rem',
                letterSpacing: '0.15em', textTransform: 'uppercase', alignSelf: 'flex-start',
              }}>
                {set.status}
              </span>
            </div>
          )
        })}
      </div>

      {lightbox && (
        <Lightbox
          set={lightbox.set}
          initialIndex={lightbox.idx}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  )
}
