'use client'

import { useSkin } from '@/contexts/SkinContext'
import { SKINS, SKIN_ORDER } from '@/lib/skins'

export default function SkinDock() {
  const { skinKey, setSkin } = useSkin()

  return (
    <div style={{
      position: 'fixed',
      bottom: '1.5rem',
      right: '1.5rem',
      zIndex: 9000,
      display: 'flex',
      gap: '0.375rem',
      background: 'var(--glass-bg)',
      border: '1px solid var(--glass-bd)',
      backdropFilter: 'blur(var(--blur))',
      borderRadius: '999px',
      padding: '0.375rem',
    }}>
      {SKIN_ORDER.map(key => {
        const s = SKINS[key]
        const active = skinKey === key
        return (
          <button
            key={key}
            onClick={() => setSkin(key)}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.5rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '0.3rem 0.75rem',
              borderRadius: '999px',
              border: active ? '1px solid var(--accent)' : '1px solid transparent',
              background: active ? 'var(--accent)' : 'transparent',
              color: active ? 'var(--on-accent)' : 'var(--ink-soft)',
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            }}
          >
            {s.name}
          </button>
        )
      })}
    </div>
  )
}
