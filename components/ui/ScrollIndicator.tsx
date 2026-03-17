'use client'

import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Vertical line with animated dot */}
      <div className="relative w-px h-10 bg-white/20">
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E8920A]"
          initial={{ top: 0 }}
          animate={{ top: '100%' }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'linear',
          }}
          style={{ marginTop: '-3px' }}
        />
      </div>

      {/* SCROLL label */}
      <p
        className="text-[#666666] text-[10px] tracking-[0.3em] uppercase"
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        SCROLL
      </p>
    </div>
  )
}
