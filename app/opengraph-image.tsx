import { ImageResponse } from 'next/og'

export const alt = 'ENVEME — 1995 Toyota Soarer JZZ31 Build'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#EBE2CF',
          backgroundImage:
            'radial-gradient(ellipse at 80% 20%, rgba(191,74,35,0.18) 0%, rgba(235,226,207,0) 55%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, backgroundColor: '#BF4A23' }} />
          <div style={{ color: '#6E5F4D', fontSize: 26, letterSpacing: 6 }}>
            LIVE ENGINEERING BUILD LOG
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#2A211A',
              fontSize: 168,
              fontWeight: 800,
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            ENVEME
          </div>
          <div style={{ color: '#BF4A23', fontSize: 40, marginTop: 18 }}>
            1995 Toyota Soarer · JZZ31 · 2JZ-GE
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(42,32,24,0.12)',
            paddingTop: 28,
          }}
        >
          <div style={{ color: '#6E5F4D', fontSize: 28 }}>
            Samuel Donovan — Mechanical Engineering, Auckland NZ
          </div>
          <div style={{ color: '#9A8B73', fontSize: 28 }}>PROJECT ENVEME</div>
        </div>
      </div>
    ),
    size
  )
}
