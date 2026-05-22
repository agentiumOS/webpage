import React from 'react'
import { motion } from 'framer-motion'
import TeamNodesSVG from '../graphics/TeamNodesSVG'
import WorkflowFlowSVG from '../graphics/WorkflowFlowSVG'
import SectionHeader from '../ui/SectionHeader'
import GlassCard from '../ui/GlassCard'

const runtimeNodes = [
  { title: 'Prompt', detail: 'Typed input enters the runtime' },
  { title: 'Agent', detail: 'Instructions, tools, state' },
  { title: 'Memory', detail: 'Session, profile, entities' },
  { title: 'Tools', detail: 'APIs, browser, functions' },
  { title: 'Trace', detail: 'Every hop lands in Studio' },
]

const featureCards = [
  {
    title: 'Unified memory graph',
    description: 'Session history, user facts, summaries, entities, decisions, and vector-backed learnings move through one typed layer.',
    visual: 'memory',
  },
  {
    title: 'Provider-neutral models',
    description: 'Swap OpenAI, Anthropic, Google, or local providers without rewriting orchestration code.',
    visual: 'models',
  },
  {
    title: 'Deterministic workflows',
    description: 'Model calls live inside stateful flows with retries, branching, parallel steps, and typed transitions.',
    visual: 'workflow',
  },
  {
    title: 'Team topologies',
    description: 'Coordinate, route, broadcast, collaborate, or hand off across specialized agents without custom graph plumbing.',
    visual: 'teams',
  },
]

function RuntimeMap() {
  return (
    <GlassCard className="relative overflow-hidden p-6 lg:col-span-7">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(109,95,147,0.10),transparent_22rem)]" />
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.24em] text-slate-500">orchestration canvas</p>
          <h3 className="mt-2 text-xl font-semibold text-white md:text-2xl">One runtime, many intelligent loops.</h3>
        </div>
        <div className="hidden rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-slate-400 md:block">live topology</div>
      </div>

      <div className="relative z-10 grid gap-4 md:grid-cols-3">
        {runtimeNodes.slice(0, 3).map((node, index) => (
          <motion.div
            key={node.title}
            className="rounded-2xl border border-white/10 bg-slate-950/65 p-4 backdrop-blur"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.06 }}
          >
            <div className="mb-3 h-1.5 w-12 rounded-full bg-white/45" />
            <h4 className="font-mono text-sm font-bold text-white">{node.title}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-500">{node.detail}</p>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 my-10 flex items-center justify-center">
        <div className="absolute h-px w-full max-w-lg bg-white/10" />
        <div className="relative grid h-24 w-24 place-items-center rounded-[1.5rem] border border-white/15 bg-white/[0.055] shadow-[0_0_34px_rgba(255,255,255,0.08)] backdrop-blur">
          <div className="text-center">
            <div className="text-2xl font-semibold text-white">A</div>
            <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500">core</div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid gap-4 md:grid-cols-2">
        {runtimeNodes.slice(3).map((node, index) => (
          <motion.div
            key={node.title}
            className="rounded-2xl border border-white/10 bg-slate-950/65 p-4 backdrop-blur"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18 + index * 0.06 }}
          >
            <div className="mb-3 h-1.5 w-12 rounded-full bg-[#b7a7ff]/40" />
            <h4 className="font-mono text-sm font-bold text-white">{node.title}</h4>
            <p className="mt-1 text-xs leading-5 text-slate-500">{node.detail}</p>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  )
}

function FeatureVisual({ type }) {
  if (type === 'memory') {
    return (
      <div className="space-y-2">
        {['Session', 'Facts', 'Profile', 'Entities', 'Decisions', 'Learnings', 'Vectors'].map((item, index) => (
          <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-2">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-white/[0.06] font-mono text-xs text-slate-300">{index + 1}</span>
            <span className="text-sm text-slate-200">{item}</span>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'workflow') {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-slate-300">
        <WorkflowFlowSVG className="h-10 w-10" />
        <div className="flex-1">
          <div className="h-2 rounded-full bg-white/10"><motion.div className="h-full rounded-full bg-white/40" animate={{ width: ['25%', '100%', '55%'] }} transition={{ repeat: Infinity, duration: 4 }} /></div>
          <p className="mt-3 font-mono text-xs text-slate-400">state.retry.parallel()</p>
        </div>
      </div>
    )
  }

  if (type === 'teams') {
    return (
      <div className="grid place-items-center rounded-2xl border border-white/10 bg-white/[0.04] p-7 text-slate-300">
        <TeamNodesSVG />
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 font-mono text-sm text-slate-300">
      model: openai('gpt-4o')<br />
      model: anthropic('claude-3.5')<br />
      model: google('gemini-live')
    </div>
  )
}

export default function Features() {
  return (
    <section id="features" className="section-shell border-b border-white/10 bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(109,95,147,0.08),transparent_32rem)]" />
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader eyebrow="Runtime canvas" title="Memory, tools, browser actions, and traces in one runtime.">
          Agentium turns orchestration into visible, typed systems. You compose agents like application code, then watch every model call, tool hop, and memory write move through the same fabric.
        </SectionHeader>

        <div className="mt-16 grid gap-6 lg:grid-cols-12">
          <RuntimeMap />
          <div className="grid gap-6 lg:col-span-5">
            {featureCards.map((feature, index) => (
              <GlassCard
                key={feature.title}
                className="p-5 transition hover:-translate-y-1 hover:border-white/20"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <FeatureVisual type={feature.visual} />
                <h3 className="mt-5 text-xl font-bold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{feature.description}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
