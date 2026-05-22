import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import GlassCard from '../ui/GlassCard'

const shifts = [
  {
    pain: 'Graph sprawl',
    old: 'Manual nodes, conditional edges, and state channels just to make one agent call a tool.',
    agentium: 'Declarative agents and workflows read like product code while still exposing typed state transitions.',
  },
  {
    pain: 'Fragmented memory',
    old: 'Conversation history, user facts, summaries, and retrieval often live in separate adapters.',
    agentium: 'Seven memory layers travel with the runtime so agents can recall, learn, and cite context consistently.',
  },
  {
    pain: 'Black-box runs',
    old: 'Debugging means logging every model call, tool result, token count, and handoff manually.',
    agentium: 'Studio traces every model call, tool hop, browser action, and memory write from the first run.',
  },
]

export default function Comparison() {
  return (
    <section className="section-shell border-b border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_80%,rgba(109,95,147,0.08),transparent_36rem)]" />
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader eyebrow="Why Agentium" title="Less framework ceremony. More runtime signal.">
          Agentium replaces the usual orchestration overhead with primitives that keep code readable and production behavior observable.
        </SectionHeader>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {shifts.map((shift, index) => (
            <GlassCard
              key={shift.pain}
              className="p-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                {shift.pain}
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-500">typical stack</p>
                  <p className="text-sm leading-6 text-slate-400">{shift.old}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
                  <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-slate-300">with Agentium</p>
                  <p className="text-sm leading-6 text-slate-100">{shift.agentium}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
