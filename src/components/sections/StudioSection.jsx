import React from 'react'
import { motion } from 'framer-motion'

export default function StudioSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden border-y-4 border-emerald-500">
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `radial-gradient(#059669 1px, transparent 1px)`, backgroundSize: '24px 24px' }}></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-600 rounded-full blur-[150px] opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="flex-1 lg:max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900 border border-emerald-700 text-sm font-bold text-emerald-300 mb-6 shadow-[2px_2px_0px_#059669]">
              @radaros/studio
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              Production-grade <br/><span className="text-emerald-400">observability.</span>
            </h2>
            
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Trace every token, monitor multi-agent routing decisions, and manage state in real-time. The built-in Studio UI gives you complete visibility into your agent architectures.
            </p>
            
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 shrink-0 bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">1</div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Full Trace Trees</h4>
                  <p className="text-slate-400 text-sm">Visualize step-by-step agent execution, tool calls, and handoffs.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 shrink-0 bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">2</div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Token & Cost Metrics</h4>
                  <p className="text-slate-400 text-sm">Track LLM spend across OpenAI, Anthropic, and Vertex instantly.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 shrink-0 bg-slate-800 border border-slate-700 flex items-center justify-center text-emerald-400 font-bold">3</div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Runtime Admin API</h4>
                  <p className="text-slate-400 text-sm">Dynamically CRUD your agents, teams, and workflows without redeploying via <code>@radaros/admin</code>.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full">
            <motion.div 
              className="bg-slate-800 border-2 border-emerald-500 shadow-[8px_8px_0px_#059669] p-1 flex flex-col h-[450px]"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              {/* Studio Mockup Header */}
              <div className="bg-slate-900 border-b border-emerald-900/50 p-3 flex justify-between items-center">
                <div className="flex gap-4">
                  <span className="text-emerald-400 font-mono text-sm font-bold border-b-2 border-emerald-400 pb-1">Traces</span>
                  <span className="text-slate-500 font-mono text-sm pb-1">Analytics</span>
                  <span className="text-slate-500 font-mono text-sm pb-1">Memory</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-slate-700"></div>
                  <div className="w-3 h-3 bg-slate-700"></div>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="p-4 flex-1 flex gap-4 overflow-hidden">
                {/* Sidebar list */}
                <div className="w-1/3 flex flex-col gap-2 border-r border-slate-700 pr-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`p-2 border ${i === 1 ? 'bg-emerald-900/30 border-emerald-500/50' : 'bg-slate-900 border-slate-800'}`}>
                      <div className="text-xs text-slate-300 font-bold mb-1 truncate">POST /api/agents/run</div>
                      <div className="text-[10px] text-slate-500 flex justify-between">
                        <span>{i === 1 ? '340ms' : '1.2s'}</span>
                        <span className="text-emerald-400">200 OK</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Main trace view */}
                <div className="w-2/3 flex flex-col gap-3">
                  <div className="flex justify-between items-end border-b border-slate-700 pb-2">
                    <span className="text-lg font-bold text-white">Trace Details</span>
                    <span className="text-xs text-emerald-400 font-mono">ID: tr_8f92bd...</span>
                  </div>

                  {/* Trace Waterfall Mock */}
                  <div className="flex flex-col gap-1 mt-2">
                    <div className="flex items-center gap-2">
                      <div className="h-4 bg-emerald-500 w-full opacity-80"></div>
                      <span className="text-[10px] text-slate-400 font-mono">Agent.Run</span>
                    </div>
                    <div className="flex items-center gap-2 pl-4">
                      <div className="h-4 bg-emerald-600 w-1/4 opacity-60"></div>
                      <span className="text-[10px] text-slate-400 font-mono">LLM.Call</span>
                    </div>
                    <div className="flex items-center gap-2 pl-8">
                      <div className="h-4 bg-emerald-700 w-1/2 opacity-40"></div>
                      <span className="text-[10px] text-slate-400 font-mono">Tool.webSearch</span>
                    </div>
                    <div className="flex items-center gap-2 pl-4">
                      <div className="h-4 bg-emerald-600 w-1/3 opacity-60"></div>
                      <span className="text-[10px] text-slate-400 font-mono">LLM.Synthesize</span>
                    </div>
                  </div>

                  <div className="mt-auto bg-slate-900 border border-slate-700 p-3">
                    <div className="text-xs text-slate-400 mb-1">Tokens Used</div>
                    <div className="flex justify-between font-mono text-sm">
                      <span className="text-emerald-300">Prompt: 1,402</span>
                      <span className="text-emerald-500">Comp: 340</span>
                      <span className="text-white font-bold">$0.012</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
