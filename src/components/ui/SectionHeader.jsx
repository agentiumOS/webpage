import React from 'react'
import { motion } from 'framer-motion'

export default function SectionHeader({ eyebrow, title, children, align = 'center', className = '' }) {
  const alignment = align === 'left' ? 'text-left items-start' : 'text-center items-center mx-auto'

  return (
    <motion.div
      className={`flex max-w-3xl flex-col ${alignment} ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ type: 'spring', stiffness: 90, damping: 18 }}
    >
      {eyebrow && (
        <span className="mb-4 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold uppercase tracking-[0.24em] text-slate-400">
          {eyebrow}
        </span>
      )}
      <h2 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
        {title}
      </h2>
      {children && (
        <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
          {children}
        </p>
      )}
    </motion.div>
  )
}
