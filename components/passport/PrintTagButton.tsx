'use client'

export default function PrintTagButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-block px-6 py-3 uppercase tracking-[0.15em] text-xs font-semibold transition-colors"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'var(--accent)',
        color: 'var(--on-accent)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--accent)',
        cursor: 'pointer',
      }}
    >
      Print Tag
    </button>
  )
}
