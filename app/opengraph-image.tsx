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
          backgroundColor: '#0A0A0A',
          backgroundImage:
            'radial-gradient(ellipse at 80% 20%, rgba(232,146,10,0.18) 0%, rgba(10,10,10,0) 55%)',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 14, height: 14, backgroundColor: '#E8920A' }} />
          <div style={{ color: '#9A9A9A', fontSize: 26, letterSpacing: 6 }}>
            LIVE ENGINEERING BUILD LOG
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 168,
              fontWeight: 800,
              letterSpacing: 2,
              lineHeight: 1,
            }}
          >
            ENVEME
          </div>
          <div style={{ color: '#E8920A', fontSize: 40, marginTop: 18 }}>
            1995 Toyota Soarer · JZZ31 · 2JZ-GE
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: 28,
          }}
        >
          <div style={{ color: '#9A9A9A', fontSize: 28 }}>
            Samuel Donovan — Mechanical Engineering, Auckland NZ
          </div>
          <div style={{ color: '#5A5A5A', fontSize: 28 }}>PROJECT ENVEME</div>
        </div>
      </div>
    ),
    size
  )
}
