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
    { name: 'Developer Studio / Dashboard', radar: true, others: 'No' },
    { name: 'Runtime Admin CRUD API', radar: true, others: 'No' },
  ]

  return (
    <section className="py-24 relative z-10 bg-slate-50 border-t border-emerald-200">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Why RadarOS?</h2>
          <p className="text-slate-500 text-lg">
            We built RadarOS to solve the gaps left by other orchestration frameworks.
          </p>
        </div>

        <motion.div
          className="bg-white border-2 border-emerald-200 overflow-hidden shadow-[8px_8px_0px_#d1fae5]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid grid-cols-12 text-sm font-semibold border-b border-emerald-200 bg-emerald-50/60">
            <div className="col-span-6 p-4 md:p-6 text-slate-700">Capability</div>
            <div className="col-span-3 p-4 md:p-6 text-emerald-700 border-l border-emerald-200 flex items-center justify-center">RadarOS</div>
            <div className="col-span-3 p-4 md:p-6 text-slate-400 border-l border-emerald-200 flex items-center justify-center text-center">Other Frameworks</div>
          </div>

          <div className="divide-y divide-emerald-100">
            {criteria.map((c, i) => (
              <div key={i} className="grid grid-cols-12 text-sm hover:bg-emerald-50/50 transition-colors">
                <div className="col-span-6 p-4 md:p-6 text-slate-700 flex items-center">{c.name}</div>
                <div className="col-span-3 p-4 md:p-6 border-l border-emerald-100 flex items-center justify-center">
                  {c.radar && (
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                </div>
                <div className="col-span-3 p-4 md:p-6 text-slate-400 border-l border-emerald-100 flex items-center justify-center text-center">
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
