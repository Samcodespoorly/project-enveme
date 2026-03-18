'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#E8920A]/8 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col items-center text-center">
        {/* Label */}
        <motion.p
          className="text-[#E8920A] text-[11px] tracking-[0.35em] uppercase mb-8"
          style={{ fontFamily: 'var(--font-mono)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          PROJECT BUILD · NZ PLATE: ENVEME
        </motion.p>

        {/* Main heading */}
        <motion.h1
          className="text-[clamp(80px,16vw,180px)] font-black uppercase leading-none tracking-tight text-white"
          style={{
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 60px rgba(232,146,10,0.25)',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          ENVEME
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg md:text-xl text-[#C0C0C0] max-w-md"
          style={{ fontFamily: 'var(--font-body)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          1995 Toyota Soarer JZZ31 · 2JZ-GE · Active Build
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="mt-12 flex flex-col sm:flex-row items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/build"
            className="px-10 py-4 bg-[#E8920A] hover:bg-[#FBB940] text-black font-semibold text-sm tracking-widest uppercase rounded-xl transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            Explore the Build
          </Link>
          <Link
            href="/specs"
            className="px-10 py-4 bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/45 text-white text-sm tracking-widest uppercase rounded-xl transition-colors duration-200 whitespace-nowrap"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            View Specs
          </Link>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <span
          className="text-[#555] text-[10px] tracking-[0.3em] uppercase"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-[#E8920A]/60 to-transparent" />
      </motion.div>
    </section>
  )
}
