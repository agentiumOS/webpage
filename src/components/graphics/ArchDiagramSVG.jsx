import React from 'react'
import { motion } from 'framer-motion'

const packages = [
  { name: '@agentium/studio', x: 50, y: 16 },
  { name: '@agentium/observability', x: 78, y: 32 },
  { name: '@agentium/browser', x: 78, y: 68 },
  { name: '@agentium/admin', x: 50, y: 84 },
  { name: '@agentium/queue', x: 22, y: 68 },
  { name: '@agentium/transport', x: 22, y: 32 },
]

const modules = ['Agents', 'Teams', 'Workflows', 'Memory', 'Tools', 'Models', 'Voice', 'Knowledge']

export default function ArchDiagramSVG() {
  return (
    <motion.div
      className="relative mx-auto mt-14 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 shadow-[0_0_70px_rgba(0,0,0,0.24)] backdrop-blur-xl"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ type: 'spring', stiffness: 80, damping: 18 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,95,147,0.08),transparent_24rem)]" />
      <div className="relative aspect-[16/9] min-h-[460px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="archLine" x1="0" x2="1" y1="0" y2="1">
              <stop stopColor="#ffffff" stopOpacity="0.18" />
              <stop offset="1" stopColor="#b7a7ff" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          {packages.map((pkg) => (
            <motion.path
              key={pkg.name}
              d={`M50 50 C50 50 ${pkg.x} ${pkg.y} ${pkg.x} ${pkg.y}`}
              fill="none"
              stroke="url(#archLine)"
              strokeWidth="0.28"
              strokeDasharray="1.2 1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.85 }}
              viewport={{ once: true }}
              transition={{ duration: 1.4, delay: 0.1 }}
            />
          ))}
        </svg>

        <div className="absolute left-1/2 top-1/2 z-20 w-64 -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/15 bg-slate-950/90 p-5 text-center shadow-[0_0_42px_rgba(255,255,255,0.08)] backdrop-blur">
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">core runtime</p>
          <h3 className="mt-2 font-mono text-xl font-black text-white">@agentium/core</h3>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {modules.map((module) => (
              <span key={module} className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs text-slate-300">
                {module}
              </span>
            ))}
          </div>
        </div>

        {packages.map((pkg, index) => (
          <motion.div
            key={pkg.name}
            className="absolute z-10 w-48 -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-center shadow-[0_0_26px_rgba(255,255,255,0.06)] backdrop-blur"
            style={{ left: `${pkg.x}%`, top: `${pkg.y}%` }}
            initial={{ opacity: 0, scale: 0.86 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.16 + index * 0.07, type: 'spring', stiffness: 90, damping: 16 }}
          >
            <div className="mx-auto mb-3 h-1.5 w-14 rounded-full bg-white/45" />
            <p className="font-mono text-sm font-bold text-white">{pkg.name}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
