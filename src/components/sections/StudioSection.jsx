import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import GlassCard from '../ui/GlassCard'

const traceRows = [
  { name: 'Agent.Run', time: '340ms', width: '92%', color: 'bg-white/55' },
  { name: 'Model.Call', time: '181ms', width: '52%', color: 'bg-white/40' },
  { name: 'Tool.webSearch', time: '87ms', width: '38%', color: 'bg-[#b7a7ff]/35' },
  { name: 'Memory.Write', time: '22ms', width: '28%', color: 'bg-white/30' },
]

const metrics = [
  ['tokens', '1,742'],
  ['latency', '340ms'],
  ['cost', '$0.012'],
]

function StudioMock() {
  return (
    <GlassCard className="overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-white/25" />
          <div className="h-3 w-3 rounded-full bg-white/15" />
          <div className="h-3 w-3 rounded-full bg-[#b7a7ff]/35" />
        </div>
        <div className="font-mono text-xs font-bold text-slate-400">studio.agentium.dev</div>
      </div>

      <div className="grid min-h-[500px] gap-0 md:grid-cols-[220px_1fr]">
        <aside className="border-b border-white/10 bg-slate-950/60 p-4 md:border-b-0 md:border-r">
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-slate-500">runs</p>
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={`mb-3 rounded-2xl border p-3 ${item === 1 ? 'border-white/15 bg-white/[0.055]' : 'border-white/10 bg-white/[0.03]'}`}>
              <div className="truncate text-xs font-bold text-slate-200">POST /api/agents/run</div>
              <div className="mt-2 flex justify-between font-mono text-[10px] text-slate-500">
                <span>{item === 1 ? '340ms' : '1.2s'}</span>
                <span className={item === 1 ? 'text-slate-300' : ''}>200 OK</span>
              </div>
            </div>
          ))}
        </aside>

        <main className="p-5">
          <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">Trace tr_8f92bd</p>
              <h3 className="mt-2 text-2xl font-bold text-white">ResearchTeam execution</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {metrics.map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2 text-center">
                  <div className="font-mono text-sm font-bold text-white">{value}</div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-slate-500">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {traceRows.map((row, index) => (
              <div key={row.name} className="grid grid-cols-[110px_1fr_52px] items-center gap-3 text-xs md:grid-cols-[140px_1fr_64px]">
                <span className="font-mono text-slate-300">{row.name}</span>
                <div className="h-5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${row.color}`}
                    initial={{ width: '12%' }}
                    whileInView={{ width: row.width }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.8 }}
                  />
                </div>
                <span className="text-right font-mono text-slate-500">{row.time}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">memory extraction</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">Stored user preference, summarized sources, and attached vector learnings to the run context.</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400">tool output</p>
              <p className="mt-3 text-sm leading-6 text-slate-200">Fetched 6 pages, verified timestamps, and returned source citations to the agent.</p>
            </div>
          </div>
        </main>
      </div>
    </GlassCard>
  )
}

export default function StudioSection() {
  return (
    <section className="section-shell border-b border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(109,95,147,0.08),transparent_34rem)]" />
      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader eyebrow="Studio observability" title="See every model call, tool hop, and memory write as it happens." align="left">
            The built-in Studio UI turns agent runs into inspectable traces. Debug cost, latency, tool output, memory changes, and routing decisions without wiring up logging dashboards by hand.
          </SectionHeader>
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          >
            <StudioMock />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
