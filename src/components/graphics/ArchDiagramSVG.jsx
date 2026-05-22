import React from 'react'
import { motion } from 'framer-motion'

export default function ArchDiagramSVG() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
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
      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 w-full">
        {['@agentium/studio', '@agentium/eval', '@agentium/observability'].map(pkg => (
          <div key={pkg} className="bg-white px-6 py-4 border-2 border-red-200 text-slate-700 font-mono text-sm shadow-[4px_4px_0px_#fecaca] flex-1 min-w-[200px] text-center hover:border-red-400 hover:shadow-[4px_4px_0px_#ef4444] hover:-translate-y-1 transition-all">
            {pkg}
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 w-full">
        {['@agentium/transport', '@agentium/queue', '@agentium/browser', '@agentium/admin'].map(pkg => (
          <div key={pkg} className="bg-white px-6 py-4 border-2 border-red-200 text-slate-700 font-mono text-sm shadow-[4px_4px_0px_#fecaca] flex-1 min-w-[160px] text-center hover:border-red-400 hover:shadow-[4px_4px_0px_#ef4444] hover:-translate-y-1 transition-all">
            {pkg}
          </div>
        ))}
      </motion.div>

      <motion.div variants={itemVariants} className="w-full relative mt-4">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-px h-4 bg-red-300"></div>
        <div className="absolute -top-4 left-[10%] w-[80%] h-px bg-red-300"></div>
        <div className="absolute -top-4 left-[10%] w-px h-4 bg-red-300"></div>
        <div className="absolute -top-4 right-[10%] w-px h-4 bg-red-300"></div>

        <div className="bg-red-50 p-8 border-2 border-red-400 text-center shadow-[4px_4px_0px_#ef4444]">
          <h3 className="text-xl font-bold text-red-700 font-mono mb-4">@agentium/core</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {['Agents', 'Teams', 'Workflows', 'Memory', 'Tools', 'Models', 'Knowledge', 'Voice'].map(m => (
              <span key={m} className="px-3 py-1 bg-white text-sm text-slate-600 border border-red-200">{m}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
