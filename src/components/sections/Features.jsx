import React from 'react'
import { motion } from 'framer-motion'
import TeamNodesSVG from '../graphics/TeamNodesSVG'
import WorkflowFlowSVG from '../graphics/WorkflowFlowSVG'

function GlowCard({ title, description, icon: Icon }) {
  return (
    <motion.div 
      className="glass p-6 rounded-2xl border border-zinc-800 hover:border-primary/50 transition-all duration-300 group relative overflow-hidden"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center border border-zinc-800 text-zinc-300 group-hover:text-primary group-hover:border-primary/30 transition-colors mb-4 relative z-10">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2 relative z-10 text-zinc-100">{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed relative z-10">{description}</p>
    </motion.div>
  )
}

const ModelAgnosticIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" />
  </svg>
)

const RAGIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="10" cy="13" r="2" />
    <line x1="11.4" y1="14.4" x2="15" y2="18" />
  </svg>
)

const VoiceIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
)

const BrowserIcon = () => (
  <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <path d="M9 21V9" />
  </svg>
)

export default function Features() {
  const features = [
    {
      title: "Multi-Agent Teams",
      description: "Coordinate, route, broadcast, and collaborate across multiple agents with a single config object. Build sophisticated hierarchies easily.",
      icon: TeamNodesSVG
    },
    {
      title: "Stateful Workflows",
      description: "Define deterministic agent steps, conditions, and parallel execution. Orchestrate complex multi-step pipelines with typed state.",
      icon: WorkflowFlowSVG
    },
    {
      title: "RAG & Knowledge Base",
      description: "Hybrid search with vector stores and BM25 embeddings. Build context-aware agents with your own documents instantly.",
      icon: RAGIcon
    },
    {
      title: "Voice & Realtime",
      description: "Speech-to-speech conversations via OpenAI Realtime and Google Gemini Live. Same tools, same memory, real-time audio.",
      icon: VoiceIcon
    },
    {
      title: "Browser Automation",
      description: "Vision-based autonomous browser automation. Let your agent see screenshots, decide actions, and operate web pages via Playwright.",
      icon: BrowserIcon
    },
    {
      title: "Model Agnostic",
      description: "Use OpenAI, Anthropic, Google, Ollama, or custom providers with a unified interface. Switch models with one line of code.",
      icon: ModelAgnosticIcon
    }
  ]

  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to build agents</h2>
          <p className="text-zinc-400 text-lg">
            RadarOS includes production-ready components that usually require stringing together multiple libraries.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
        >
          {features.map((feature, i) => (
            <GlowCard key={i} {...feature} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
