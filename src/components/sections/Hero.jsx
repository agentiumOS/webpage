import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GridBackground from '../graphics/GridBackground'

const TerminalWindow = () => {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 1000))
      setStep(1) // type command
      await new Promise(r => setTimeout(r, 1500))
      setStep(2) // start running
      await new Promise(r => setTimeout(r, 800))
      setStep(3) // tool call
      await new Promise(r => setTimeout(r, 1200))
      setStep(4) // memory extraction
      await new Promise(r => setTimeout(r, 1000))
      setStep(5) // done
      await new Promise(r => setTimeout(r, 4000))
      setStep(0) // reset
    }
    sequence()
  }, [step === 0])

  return (
    <div className="w-full max-w-lg bg-slate-950 border-2 border-red-400 shadow-[8px_8px_0px_#dc2626] overflow-hidden text-sm font-mono flex flex-col h-[360px]">
      <div className="bg-slate-900 border-b border-red-400/50 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-400"></div>
        <div className="w-3 h-3 bg-yellow-400"></div>
        <div className="w-3 h-3 bg-red-500"></div>
        <span className="text-slate-400 text-xs ml-4 font-mono">agent-runner.ts</span>
      </div>
      
      <div className="p-5 text-red-400 flex-1 overflow-hidden relative">
        <div className="flex flex-col gap-2">
          {step >= 0 && (
            <div className="flex items-center gap-2">
              <span className="text-red-600">&gt;</span>
              <span className="text-slate-200">ts-node</span>
              <span className="text-red-300">run.ts</span>
              {step === 0 && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-red-400 inline-block"></motion.span>}
            </div>
          )}

          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-slate-400">
              [Agentium] Initializing Agent 'ResearchBot'...
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400">
              [Agentium] Using Model: openai/gpt-4o
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 border-l-2 border-red-500 pl-3">
              <div className="text-red-300 font-semibold mb-1">Tool Call: web_search</div>
              <div className="text-slate-500 text-xs">{"{"} query: "latest advancements in multi-agent orchestration 2025" {"}"}</div>
            </motion.div>
          )}

          {step >= 4 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 border-l-2 border-indigo-500 pl-3">
              <div className="text-indigo-300 font-semibold mb-1">Memory Extraction</div>
              <div className="text-slate-500 text-xs">Stored Fact: User prefers typescript code examples.</div>
            </motion.div>
          )}

          {step >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <span className="text-red-400 font-bold">ResearchBot: </span>
              <span className="text-slate-200">I've searched the web. The most significant shift in multi-agent orchestration involves deterministic stateful workflows replacing raw graph structures, allowing for safer production deployments...</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @agentium/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-red-200">
      <GridBackground />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 border border-red-300 text-sm font-bold text-red-800 mb-6 shadow-sm">
              <span className="flex h-2 w-2 bg-red-500 animate-pulse"></span>
              Agentium v1.0.0 is live
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-slate-900">
              Ship AI agent systems with <span className="text-gradient">red-line precision</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              Agentium is a TypeScript-native orchestration framework for production AI teams. 
              Build multi-agent workflows, memory layers, browser automation, and observability without falling back to Python glue code.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a href="#packages" className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white font-bold hover:bg-red-700 transition-colors shadow-[4px_4px_0px_#991b1b] hover:shadow-[2px_2px_0px_#991b1b] hover:translate-y-[2px] hover:translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] text-center">
                Explore Packages
              </a>

              <div
                className="w-full sm:w-auto flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-2 border-red-300 cursor-pointer hover:border-red-500 transition-colors font-mono text-sm group shadow-[4px_4px_0px_#fecaca]"
                onClick={handleCopy}
              >
                <span className="text-slate-700">$ npm install @agentium/core</span>
                <button className="text-slate-400 group-hover:text-red-600 transition-colors" aria-label="Copy install command">
                  {copied ? (
                    <svg className="w-4 h-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 max-w-xl mx-auto lg:mx-0 mb-12">
              {[
                ['8', 'modular packages'],
                ['7', 'memory layers'],
                ['0', 'Python required'],
              ].map(([value, label]) => (
                <div key={label} className="bg-white/85 border border-red-200 px-4 py-3 shadow-[3px_3px_0px_#fecaca] text-left">
                  <div className="text-2xl font-black text-red-600">{value}</div>
                  <div className="text-[11px] uppercase tracking-wide text-slate-500 font-bold">{label}</div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-500 font-bold tracking-wide uppercase">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Zero Python
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                No Lock-in
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                MIT License
              </span>
            </div>
          </motion.div>

          <motion.div
            className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95, rotateY: 5 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
          >
            <TerminalWindow />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
