import React from 'react'
import { motion } from 'framer-motion'

export default function ArchDiagramSVG() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 py-12"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Top Layer */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 w-full">
        {['@radaros/studio', '@radaros/eval', '@radaros/observability'].map(pkg => (
          <div key={pkg} className="glass px-6 py-4 rounded-xl text-zinc-300 font-mono text-sm shadow-sm flex-1 min-w-[200px] text-center border-zinc-800 hover:border-zinc-600 transition-colors">
            {pkg}
          </div>
        ))}
      </motion.div>

      {/* Middle Layer */}
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 w-full">
        {['@radaros/transport', '@radaros/queue', '@radaros/browser'].map(pkg => (
          <div key={pkg} className="glass px-6 py-4 rounded-xl text-zinc-300 font-mono text-sm shadow-sm flex-1 min-w-[200px] text-center border-zinc-800 hover:border-zinc-600 transition-colors">
            {pkg}
          </div>
        ))}
      </motion.div>

      {/* Core Layer */}
      <motion.div variants={itemVariants} className="w-full relative mt-4">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-zinc-800"></div>
        <div className="absolute -top-4 left-[15%] w-[70%] h-px bg-zinc-800"></div>
        <div className="absolute -top-4 left-[15%] w-px h-4 bg-zinc-800"></div>
        <div className="absolute -top-4 right-[15%] w-px h-4 bg-zinc-800"></div>
        
        <div className="glass p-8 rounded-2xl border-primary/30 border-2 bg-primary/5 text-center shadow-[0_0_30px_-10px_rgba(34,211,238,0.2)]">
          <h3 className="text-xl font-bold text-primary font-mono mb-4">@radaros/core</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Agents', 'Teams', 'Workflows', 'Memory', 'Tools', 'Models', 'Knowledge'].map(module => (
              <span key={module} className="px-3 py-1 bg-zinc-900/50 rounded-lg text-sm text-zinc-400 border border-zinc-800">
                {module}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
