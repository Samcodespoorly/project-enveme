import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
}

export default function GlassCard({ children, className = '' }: GlassCardProps) {
  return (
    <div
      className={`rounded-2xl bg-white/[0.04] border border-white/[0.08] p-10 ${className}`}
    >
      {children}
    </div>
  )
}
