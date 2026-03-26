import React from 'react'

interface AmberOutlineLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

export default function AmberOutlineLink({
  href,
  children,
  className = '',
}: AmberOutlineLinkProps) {
  return (
    <>
      <style>{`
        .amber-outline-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-mono);
          font-size: 0.75rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #E8920A;
          border: 1px solid rgba(232, 146, 10, 0.3);
          border-radius: 0.5rem;
          padding: 0.625rem 1.25rem;
          text-decoration: none;
          transition: background 0.15s, border-color 0.15s;
          background: transparent;
        }
        .amber-outline-link:hover {
          background: rgba(232, 146, 10, 0.08);
          border-color: rgba(232, 146, 10, 0.6);
        }
      `}</style>
      <a
        href={href}
        className={`amber-outline-link${className ? ` ${className}` : ''}`}
      >
        {children}
      </a>
    </>
  )
}
