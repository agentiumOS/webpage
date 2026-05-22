import React from 'react'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'
import GlassCard from '../ui/GlassCard'

const packages = [
  { name: '@agentium/core', group: 'runtime', icon: 'A', description: 'Agents, teams, workflows, models, tools, and memory. The gravitational center.', required: true },
  { name: '@agentium/transport', group: 'runtime', icon: 'IO', description: 'Express REST API, SSE streaming, and Socket.IO gateways for production surfaces.' },
  { name: '@agentium/queue', group: 'runtime', icon: 'Q', description: 'BullMQ background execution with progress, retries, and durable work queues.' },
  { name: '@agentium/browser', group: 'intelligence', icon: 'BR', description: 'Vision-based browser automation using Playwright and stealth mode.' },
  { name: '@agentium/admin', group: 'operations', icon: 'AD', description: 'Runtime CRUD API for dynamically managing agents, teams, and workflows.' },
  { name: '@agentium/eval', group: 'operations', icon: 'EV', description: 'Agent output testing, scoring, regression checks, and quality gates.' },
  { name: '@agentium/observability', group: 'operations', icon: 'OB', description: 'Tracing, metrics, structured logs, Langfuse, and OTel exporters.' },
  { name: '@agentium/studio', group: 'operations', icon: 'ST', description: 'Developer dashboard for testing, tracing, memory, and run inspection.' },
]

export default function Packages() {
  return (
    <section id="packages" className="section-shell bg-[#080B1D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(109,95,147,0.08),transparent_34rem)]" />
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader eyebrow="Package ecosystem" title="Install the orbit you need.">
          Agentium ships as a modular runtime. Start with core, then add transports, queues, browser automation, evaluation, observability, and Studio when the system needs them.
        </SectionHeader>

        <div className="mt-16 grid gap-6 lg:grid-cols-4">
          {packages.map((pkg, index) => (
            <GlassCard
              key={pkg.name}
              className={`p-5 transition hover:-translate-y-1 hover:border-white/20 ${pkg.required ? 'lg:col-span-2 lg:row-span-2' : ''}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className={`grid ${pkg.required ? 'h-16 w-16 text-lg' : 'h-12 w-12 text-sm'} place-items-center rounded-2xl border border-white/10 bg-white/[0.06] font-mono font-black text-white`}>
                  {pkg.icon}
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">
                  {pkg.required ? 'required' : pkg.group}
                </span>
              </div>
              <h3 className={`${pkg.required ? 'mt-8 text-2xl' : 'mt-5 text-base'} font-mono font-bold text-white`}>{pkg.name}</h3>
              <p className={`${pkg.required ? 'mt-4 text-base leading-7' : 'mt-3 text-sm leading-6'} text-slate-400`}>{pkg.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
