'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface AnimatedTextProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedText({
  children,
  className = '',
  delay = 0,
}: AnimatedTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
