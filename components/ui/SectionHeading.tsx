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
    <div className={`mb-12 ${className}`}>
      {label && (
        <p
          className="text-[#E8920A] text-xs tracking-[0.2em] uppercase mb-3"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          {label}
        </p>
      )}
      <div className="accent-line">
        <h2
          className="text-4xl md:text-5xl font-bold uppercase text-white tracking-wide"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {heading}
        </h2>
      </div>
      {subtitle && (
        <p
          className="mt-4 text-[#A0A0A0] text-base max-w-xl"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
