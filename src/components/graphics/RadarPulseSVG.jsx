import React from 'react'
import { motion } from 'framer-motion'

export default function RadarPulseSVG({ className = "" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <motion.div
        className="absolute w-full h-full border border-primary/20 rounded-full"
        animate={{ scale: [0.8, 2], opacity: [0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut" }}
      />
      <motion.div
        className="absolute w-full h-full border border-primary/30 rounded-full"
        animate={{ scale: [0.8, 2], opacity: [0.8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeOut", delay: 1 }}
      />
      <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_2px_rgba(34,211,238,0.8)]" />
    </div>
  )
}
