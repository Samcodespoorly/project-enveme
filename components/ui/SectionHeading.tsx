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
          className="text-[#E8920A] text-[11px] tracking-[0.3em] uppercase mb-5"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {label}
        </p>
      )}
      <h2
        className="text-5xl sm:text-6xl lg:text-7xl font-bold uppercase text-white tracking-tight leading-[0.92]"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {heading}
      </h2>
      {subtitle && (
        <p
          className="mt-6 text-[#AAAAAA] text-base md:text-lg max-w-2xl leading-relaxed"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
