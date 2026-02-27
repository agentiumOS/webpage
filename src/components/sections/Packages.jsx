import React from 'react'
import { motion } from 'framer-motion'

const packages = [
  {
    name: '@radaros/core',
    description: 'Agents, Teams, Workflows, Models, Tools, and Memory. The only required package.',
    required: true,
    version: '0.3.14'
  },
  {
    name: '@radaros/transport',
    description: 'Express REST API, SSE streaming, and Socket.IO real-time gateways for agents.',
    required: false,
    version: '0.3.14'
  },
  {
    name: '@radaros/queue',
    description: 'BullMQ-based background job execution with progress tracking.',
    required: false,
    version: '0.3.14'
  },
  {
    name: '@radaros/browser',
    description: 'Vision-based browser automation using Playwright and stealth mode.',
    required: false,
    version: '0.3.14'
  },
  {
    name: '@radaros/eval',
    description: 'Agent output testing and scoring framework.',
    required: false,
    version: '0.1.0'
  },
  {
    name: '@radaros/observability',
    description: 'Tracing, metrics, structured logging with Langfuse & OTel exporters.',
    required: false,
    version: '0.1.0'
  },
  {
    name: '@radaros/studio',
    description: 'Full-stack developer UI dashboard for testing and tracking agents.',
    required: false,
    version: '0.1.0'
  }
]

export default function Packages() {
  return (
    <section id="packages" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">The RadarOS Ecosystem</h2>
          <p className="text-zinc-400 text-lg">
            A modular approach. Only install the dependencies you actually need.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg, i) => (
            <motion.div 
              key={pkg.name}
              className={`glass p-6 rounded-xl border transition-colors hover:bg-zinc-900/50 ${pkg.required ? 'border-primary/30' : 'border-zinc-800 hover:border-zinc-700'}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-mono text-zinc-200 font-semibold">{pkg.name}</h3>
                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${pkg.required ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-zinc-800 text-zinc-400 border border-zinc-700'}`}>
                  {pkg.required ? 'Required' : 'Optional'}
                </span>
              </div>
              <p className="text-sm text-zinc-400 mb-4 h-10">{pkg.description}</p>
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                v{pkg.version}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
