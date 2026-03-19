interface BadgeProps {
  label: string
  color: string
}

export default function Badge({ label, color }: BadgeProps) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.625rem',
        fontWeight: 600,
        letterSpacing: '0.2em',
        color,
        background: `${color}18`,
        border: `1px solid ${color}40`,
        padding: '0.3rem 0.75rem',
        borderRadius: '0.5rem',
        textTransform: 'uppercase' as const,
        whiteSpace: 'nowrap' as const,
      }}
    >
      {label}
    </span>
  )
}
