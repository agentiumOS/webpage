import React from 'react'
import { motion } from 'framer-motion'
import TeamNodesSVG from '../graphics/TeamNodesSVG'
import WorkflowFlowSVG from '../graphics/WorkflowFlowSVG'

function BentoBox({ title, description, children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={`bg-white border-2 border-emerald-200 p-8 shadow-[4px_4px_0px_#d1fae5] hover:shadow-[4px_4px_0px_#059669] hover:-translate-y-[4px] hover:border-emerald-500 transition-all duration-300 relative overflow-hidden group flex flex-col ${className}`}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay }}
    >
      <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(#059669 1px, transparent 1px), linear-gradient(90deg, #059669 1px, transparent 1px)`, backgroundSize: '20px 20px' }}></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="relative z-10 flex-1">
        {children}
      </div>
      
      <div className="relative z-10 mt-8 pt-6 border-t border-emerald-100 group-hover:border-emerald-200 transition-colors">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  )
}

const ModelAgnosticIcon = () => (
  <svg className="w-8 h-8 text-emerald-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
)

const VoiceIcon = () => (
  <svg className="w-8 h-8 text-emerald-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
)

const BrowserIcon = () => (
  <svg className="w-8 h-8 text-emerald-600 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M9 21V9" />
  </svg>
)

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10 bg-slate-50 border-t border-emerald-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Complex systems,<br/>made declarative.</h2>
          <p className="text-slate-600 text-lg md:text-xl">
            RadarOS abstracts away graph theory and raw API calls, giving you clean, typed primitives for memory, reasoning, and orchestration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Memory Bento */}
          <BentoBox 
            title="7-Layer Unified Memory" 
            description="Built-in persistent intelligence. RadarOS tracks context, extracts user facts, logs agent decisions, and builds vector-backed learnings automatically."
            className="lg:col-span-8 lg:row-span-2 md:col-span-12"
            delay={0.1}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 h-full content-center">
              {['Session', 'Summaries', 'User Facts', 'Profile', 'Entities', 'Decisions', 'Learnings'].map((mem, i) => (
                <div key={mem} className="bg-emerald-50 border-2 border-emerald-200 p-3 text-sm font-semibold text-emerald-800 flex items-center justify-center text-center shadow-[2px_2px_0px_#d1fae5] hover:shadow-[2px_2px_0px_#10b981] hover:translate-y-[1px] hover:translate-x-[1px] transition-all cursor-default">
                  {mem}
                </div>
              ))}
              <div className="bg-slate-900 border-2 border-emerald-500 p-3 text-sm font-bold text-emerald-400 flex items-center justify-center text-center shadow-[4px_4px_0px_#059669] sm:col-span-4 mt-2">
                Hybrid Search RAG (Vector + BM25)
              </div>
            </div>
          </BentoBox>

          {/* Model Agnostic Bento */}
          <BentoBox 
            title="Provider Agnostic" 
            description="Swap between top-tier models with a single line of code. No vendor lock-in."
            className="lg:col-span-4 md:col-span-6"
            delay={0.2}
          >
            <div className="flex flex-col h-full justify-center gap-6">
              <ModelAgnosticIcon />
              <div className="font-mono text-xs md:text-sm text-emerald-400 bg-slate-900 p-3 border-2 border-emerald-500 shadow-[4px_4px_0px_#059669]">
                <span className="text-pink-400">model</span>: <span className="text-blue-300">openai</span>('gpt-4o')<br/>
                <span className="text-slate-500 line-through"><span className="text-pink-400/50">model</span>: <span className="text-blue-300/50">anthropic</span>('claude-3.5')</span>
              </div>
            </div>
          </BentoBox>

          {/* Workflows Bento */}
          <BentoBox 
            title="Stateful Workflows" 
            description="Define deterministic, multi-step pipelines with typed state transitions, retry policies, and parallel execution."
            className="lg:col-span-4 md:col-span-6"
            delay={0.3}
          >
            <div className="flex flex-col h-full justify-center gap-6">
              <WorkflowFlowSVG className="w-8 h-8 text-emerald-600" />
              <div className="flex items-center gap-2 bg-emerald-50 p-2 border-2 border-emerald-200 shadow-[2px_2px_0px_#d1fae5]">
                <div className="w-6 h-6 bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center shadow-[2px_2px_0px_#059669]">1</div>
                <div className="flex-1 h-1 bg-emerald-200">
                  <div className="w-full h-full bg-emerald-500"></div>
                </div>
                <div className="w-6 h-6 bg-slate-900 text-emerald-400 font-bold text-xs flex items-center justify-center shadow-[2px_2px_0px_#059669]">2</div>
                <div className="flex-1 h-1 bg-emerald-200">
                  <div className="w-1/2 h-full bg-emerald-500 animate-pulse"></div>
                </div>
                <div className="w-6 h-6 bg-white border-2 border-emerald-200 text-slate-400 font-bold text-xs flex items-center justify-center">3</div>
              </div>
            </div>
          </BentoBox>

          {/* Team Topologies Bento */}
          <BentoBox 
            title="5 Team Topologies" 
            description="Coordinate, Route, Broadcast, Collaborate, or Handoff. Group agents easily to solve complex multi-step reasoning tasks."
            className="lg:col-span-6 lg:row-span-2 md:col-span-12"
            delay={0.4}
          >
            <div className="flex flex-col gap-3 h-full justify-center">
              {['Coordinate', 'Route', 'Broadcast', 'Collaborate', 'Handoff'].map((mode, i) => (
                <div key={mode} className="flex items-center gap-3 bg-white p-2 border-2 border-emerald-100 shadow-[2px_2px_0px_#d1fae5] hover:border-emerald-300 transition-colors">
                  <span className="font-mono text-sm font-bold text-emerald-700 bg-emerald-50 px-2 py-1 border border-emerald-200">{mode}</span>
                  <span className="text-xs text-slate-600 font-medium">
                    {i === 0 && 'Leader synthesizes team outputs'}
                    {i === 1 && 'Pick best agent for the job'}
                    {i === 2 && 'Parallel execution across all'}
                    {i === 3 && 'Iterative consensus rounds'}
                    {i === 4 && 'Mid-conversation transfers'}
                  </span>
                </div>
              ))}
            </div>
          </BentoBox>

          {/* Voice Bento */}
          <BentoBox 
            title="Realtime Voice" 
            description="Speech-to-speech via OpenAI Realtime & Gemini Live over WebSockets."
            className="lg:col-span-6 md:col-span-6"
            delay={0.5}
          >
            <div className="flex flex-col h-full justify-center gap-6">
              <VoiceIcon />
              <div className="flex gap-1.5 items-end h-10 mt-4 bg-emerald-50 p-2 border-2 border-emerald-200 shadow-[2px_2px_0px_#d1fae5]">
                 <div className="w-full bg-emerald-300 animate-pulse" style={{ height: '40%' }}></div>
                 <div className="w-full bg-emerald-500 animate-pulse delay-75" style={{ height: '100%' }}></div>
                 <div className="w-full bg-emerald-400 animate-pulse delay-150" style={{ height: '70%' }}></div>
                 <div className="w-full bg-emerald-600 animate-pulse delay-200" style={{ height: '85%' }}></div>
                 <div className="w-full bg-emerald-200 animate-pulse delay-300" style={{ height: '30%' }}></div>
              </div>
            </div>
          </BentoBox>

          {/* Browser Bento */}
          <BentoBox 
            title="Browser Agents" 
            description="Vision-based Playwright automation with stealth mode."
            className="lg:col-span-6 md:col-span-6"
            delay={0.6}
          >
            <div className="flex flex-col h-full justify-center gap-6">
               <BrowserIcon />
               <div className="w-full h-20 border-2 border-emerald-300 bg-white shadow-[4px_4px_0px_#d1fae5] flex flex-col mt-4">
                  <div className="w-full h-5 bg-emerald-50 border-b-2 border-emerald-200 flex items-center px-1.5 gap-1">
                    <div className="w-2 h-2 bg-red-400 border border-red-500"></div>
                    <div className="w-2 h-2 bg-yellow-400 border border-yellow-500"></div>
                    <div className="w-2 h-2 bg-emerald-400 border border-emerald-500"></div>
                  </div>
                  <div className="p-2 flex-1 flex flex-col gap-1.5 relative">
                    <div className="w-3/4 h-1.5 bg-slate-200"></div>
                    <div className="w-1/2 h-1.5 bg-slate-200"></div>
                    <div className="absolute bottom-2 right-2 w-3 h-3 bg-emerald-500 animate-ping shadow-[0_0_5px_#10b981]"></div>
                  </div>
               </div>
            </div>
          </BentoBox>

        </div>
      </div>
    </section>
  )
}
