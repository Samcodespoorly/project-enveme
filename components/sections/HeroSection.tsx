'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ScrollIndicator from '@/components/ui/ScrollIndicator'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#0A0A0A] via-[#0D0D0D] to-[#111111] overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#E8920A]/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-[#6680ff]/5 rounded-full blur-[100px]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-6xl mx-auto">
        {/* Small label */}
        <motion.p
          className="text-[#E8920A] text-xs tracking-[0.3em] uppercase mb-6"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          PROJECT BUILD · NZ PLATE: ENVEME
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="text-[clamp(72px,15vw,160px)] font-black uppercase leading-none tracking-tight text-white"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow:
              '0 0 80px rgba(232, 146, 10, 0.3), 0 0 160px rgba(232, 146, 10, 0.1)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          ENVEME
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-5 text-xl text-[#CCCCCC] max-w-lg"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          1995 Toyota Soarer JZZ31 · 2JZ-GE · Active Build
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          className="mt-10 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/build"
            className="px-10 py-4 bg-[#E8920A] hover:bg-[#FBB940] text-black font-semibold text-sm tracking-widest uppercase rounded-lg transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Explore the Build
          </Link>
          <Link
            href="/specs"
            className="px-10 py-4 bg-white/10 hover:bg-white/15 border border-white/30 hover:border-white/50 text-white text-sm tracking-widest uppercase rounded-lg transition-colors duration-200"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            View Specs
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator at bottom */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <ScrollIndicator />
      </motion.div>
    </section>
  )
}
