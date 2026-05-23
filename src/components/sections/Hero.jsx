import React from 'react'
import { motion } from 'framer-motion'
import GridBackground from '../graphics/GridBackground'
import AgentOrbitSVG from '../graphics/AgentOrbitSVG'
import RadarPulseSVG from '../graphics/RadarPulseSVG'
import CopyCommand from '../ui/CopyCommand'
import GlassCard from '../ui/GlassCard'

const runEvents = [
  { label: 'Agent.Run', detail: 'ResearchTeam received typed state' },
  { label: 'Model.Call', detail: 'openai/gpt-4o routed with tools' },
  { label: 'Memory.Write', detail: 'User preference stored in profile' },
  { label: 'Browser.Act', detail: 'Playwright verified source pages' },
]

const LiveRunPanel = () => {
  return (
    <GlassCard className="relative overflow-hidden p-4 md:p-5">
      <div className="absolute inset-x-8 top-0 h-px bg-white/20" />
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-400">live run</p>
          <h3 className="mt-1 text-lg font-semibold text-white">orchestration trace</h3>
        </div>
        <div className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-bold text-slate-300">
          200 OK
        </div>
      </div>

      <div className="space-y-3">
        {runEvents.map((event, index) => (
          <motion.div
            key={event.label}
            className="relative rounded-2xl border border-white/10 bg-slate-950/55 p-3"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.16, type: 'spring', stiffness: 90, damping: 16 }}
          >
            <div className="absolute left-0 top-3 h-10 w-1 rounded-full bg-[#b7a7ff]/50" />
            <div className="flex items-center justify-between gap-4 pl-3">
              <div>
                <p className="font-mono text-sm font-bold text-white">{event.label}</p>
                <p className="mt-1 text-xs text-slate-400">{event.detail}</p>
              </div>
              <div className="h-2 w-16 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-white/45"
                  initial={{ width: '24%' }}
                  animate={{ width: ['24%', '100%', '48%'] }}
                  transition={{ duration: 4, repeat: Infinity, delay: index * 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 font-mono text-xs text-slate-300">
        await team.run(&quot;research, verify, summarize&quot;)
      </div>
    </GlassCard>
  )
}

const HeroVisual = () => (
  <motion.div
    className="relative mx-auto w-full max-w-md pb-28 lg:max-w-lg lg:pb-16"
    initial={{ opacity: 0, scale: 0.96, y: 24 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: 'spring', stiffness: 80, damping: 18, delay: 0.15 }}
  >
    <AgentOrbitSVG className="mx-auto opacity-95" />
    <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-md">
      <LiveRunPanel />
    </div>
  </motion.div>
)

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-white/10 pb-28 pt-32 lg:pb-36 lg:pt-44">
      <GridBackground />

      <div className="container relative z-10 mx-auto px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="mb-7 flex flex-col items-center gap-4 lg:items-start">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-sm font-bold text-slate-200 backdrop-blur">
                <RadarPulseSVG className="h-5 w-5" />
                Agentium v1.0.0 is live
              </div>
              <a
                href="https://www.producthunt.com/products/agentium-typescript?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-agentium-ai-agent-runtime"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  alt="Agentium - AI Agent Runtime - Agentium brings models, memory, tools into one TS runtime. | Product Hunt"
                  width="250"
                  height="54"
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1153560&theme=light&t=1779513937547"
                />
              </a>
            </div>

            <h1 className="mx-auto max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:mx-0 lg:text-6xl">
              The AI runtime for <span className="text-gradient">TypeScript agent teams</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl lg:mx-0">
              Run typed agent teams without graph sprawl. Agentium brings models, memory, tools, browser actions, workflows, and traces into one production runtime.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <a href="#features" className="w-full rounded-full bg-white px-8 py-4 text-center font-bold text-slate-950 transition hover:bg-slate-200 sm:w-auto">
                Explore the runtime
              </a>
              <CopyCommand className="w-full justify-center sm:w-auto" />
            </div>

            <div className="mx-auto mt-10 grid max-w-xl grid-cols-3 gap-3 lg:mx-0">
              {[
                ['8', 'runtime modules'],
                ['7', 'memory layers'],
                ['0', 'Python glue'],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur">
                  <div className="text-3xl font-black text-white">{value}</div>
                  <div className="mt-1 text-xs font-bold uppercase tracking-wide text-slate-400">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <HeroVisual />
        </div>
      </div>
    </section>
  )
}
