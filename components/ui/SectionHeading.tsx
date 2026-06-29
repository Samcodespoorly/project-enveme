interface SectionHeadingProps {
  label?: string
  heading: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({
  label,
  heading,
  subtitle,
  className = '',
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${className}`}>
      {label && (
        <p
          className="text-[11px] tracking-[0.3em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
        >
          {label}
        </p>
      )}
      <h2
        className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-[0.92]"
        style={{ fontFamily: 'var(--font-display)', color: 'var(--ink)' }}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className="mt-6 text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--ink-soft)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
