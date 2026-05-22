import React from 'react'
import { motion } from 'framer-motion'

const usps = [
  "Declarative TypeScript",
  "Zero Python Required",
  "7-Layer Unified Memory",
  "Built-in Observability",
  "Browser Automation",
  "Realtime Voice Agents",
  "Provider Agnostic",
  "No Graph Theory"
]

export default function ModelMarquee() {
  return (
    <div className="w-full overflow-hidden bg-slate-950 border-y-4 border-red-500 py-6 relative z-20">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none"></div>
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none"></div>
      
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex items-center gap-16 px-6"
          animate={{ x: [0, -1400] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 35,
              ease: "linear",
            },
          }}
        >
          {/* Double the array for seamless looping */}
          {[...usps, ...usps].map((usp, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div className="w-2 h-2 bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.8)] group-hover:scale-150 transition-transform"></div>
              <span className="font-mono text-lg font-bold text-white tracking-widest group-hover:text-red-400 transition-colors uppercase">{usp}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
