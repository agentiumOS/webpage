import React from 'react'
import { motion } from 'framer-motion'

const capabilities = [
  { label: 'Typed agents', value: 'TS' },
  { label: 'Unified memory', value: '7L' },
  { label: 'Tool routing', value: 'API' },
  { label: 'Browser actions', value: 'DOM' },
  { label: 'Voice loops', value: 'RT' },
  { label: 'Trace studio', value: 'OBS' },
  { label: 'Workflow state', value: 'FSM' },
]

export default function ModelMarquee() {
  return (
    <section className="relative z-20 overflow-hidden border-y border-white/10 bg-slate-950/80 py-6 backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,95,147,0.06),transparent_35rem)]" />
      <div className="absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-slate-950 to-transparent" />

      <motion.div
        className="relative flex w-max items-center gap-4 px-6"
        animate={{ x: [0, -1180] }}
        transition={{ repeat: Infinity, repeatType: 'loop', duration: 32, ease: 'linear' }}
      >
        {[...capabilities, ...capabilities, ...capabilities].map((capability, index) => (
          <div key={`${capability.label}-${index}`} className="group flex items-center gap-4 rounded-full border border-white/10 bg-white/[0.035] px-4 py-3 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.06]">
            <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] font-mono text-xs font-black text-slate-300">
              {capability.value}
            </div>
            <div className="h-px w-12 bg-white/10" />
            <span className="whitespace-nowrap font-mono text-sm font-bold uppercase tracking-[0.2em] text-slate-300 transition group-hover:text-white">
              {capability.label}
            </span>
          </div>
        ))}
      </motion.div>
    </section>
  )
}
