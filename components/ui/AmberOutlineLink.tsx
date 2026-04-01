'use client'

import Link from 'next/link'
import React, { useState } from 'react'

interface AmberOutlineLinkProps {
  href: string
  children: React.ReactNode
  className?: string
}

// Uses Next.js Link so internal routes get client-side navigation.
// External URLs (starting with http) are passed through transparently by Link.
export default function AmberOutlineLink({
  href,
  children,
  className = '',
}: AmberOutlineLinkProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      href={href}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
        color: '#E8920A',
        border: `1px solid ${hovered ? 'rgba(232,146,10,0.6)' : 'rgba(232,146,10,0.3)'}`,
        borderRadius: '0.5rem',
        padding: '0.625rem 1.25rem',
        textDecoration: 'none',
        background: hovered ? 'rgba(232,146,10,0.08)' : 'transparent',
        transition: 'background 0.15s ease, border-color 0.15s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </Link>
  )
}
