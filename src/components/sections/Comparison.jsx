import React from 'react'
import { motion } from 'framer-motion'

export default function Comparison() {
  const criteria = [
    { name: 'TypeScript Native', radar: true, others: 'Partial / Python' },
    { name: 'Declarative API (No Graph needed)', radar: true, others: 'Varies' },
    { name: 'Built-in Teams & Workflows', radar: true, others: 'Requires Custom Wiring' },
    { name: 'Express & Socket.IO Transports', radar: true, others: 'Paid / External' },
    { name: 'Playwright Browser Agents', radar: true, others: 'No' },
    { name: 'OpenAI & Google Voice Agents', radar: true, others: 'No' },
    { name: 'BullMQ Background Jobs', radar: true, others: 'No' },
  ]

  return (
    <section className="py-24 relative z-10 bg-surface/10 border-t border-border">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why RadarOS?</h2>
          <p className="text-zinc-400 text-lg">
            We built RadarOS to solve the gaps left by other orchestration frameworks.
          </p>
        </div>

        <motion.div 
          className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 text-sm font-semibold border-b border-zinc-800 bg-zinc-900">
            <div className="col-span-6 p-4 md:p-6 text-zinc-300">Capability</div>
            <div className="col-span-3 p-4 md:p-6 text-primary border-l border-zinc-800 flex items-center justify-center">RadarOS</div>
            <div className="col-span-3 p-4 md:p-6 text-zinc-500 border-l border-zinc-800 flex items-center justify-center text-center">Other Frameworks</div>
          </div>
          
          <div className="divide-y divide-zinc-800/50">
            {criteria.map((c, i) => (
              <div key={i} className="grid grid-cols-12 text-sm hover:bg-zinc-800/30 transition-colors">
                <div className="col-span-6 p-4 md:p-6 text-zinc-300 flex items-center">{c.name}</div>
                <div className="col-span-3 p-4 md:p-6 border-l border-zinc-800 flex items-center justify-center">
                  {c.radar && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
                <div className="col-span-3 p-4 md:p-6 text-zinc-500 border-l border-zinc-800 flex items-center justify-center text-center">
                  <span className="text-xs md:text-sm">{c.others}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
