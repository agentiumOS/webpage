import React from 'react'
import { motion } from 'framer-motion'

export default function RadarPulseSVG({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute w-full h-full rounded-full border border-white/15"
        animate={{ scale: [0.8, 2], opacity: [0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-full h-full rounded-full border border-[#b7a7ff]/20"
        animate={{ scale: [0.8, 2], opacity: [0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
      <div className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_14px_4px_rgba(255,255,255,0.18)]" />
    </div>
  )
}
