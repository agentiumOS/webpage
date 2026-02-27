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
    <div className="w-full max-w-lg bg-slate-900 border-2 border-emerald-400 shadow-[8px_8px_0px_#059669] overflow-hidden text-sm font-mono flex flex-col h-[340px]">
      <div className="bg-slate-800 border-b border-emerald-400/50 px-4 py-2 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-400"></div>
        <div className="w-3 h-3 bg-yellow-400"></div>
        <div className="w-3 h-3 bg-emerald-400"></div>
        <span className="text-slate-400 text-xs ml-4 font-mono">agent-runner.ts</span>
      </div>
      
      <div className="p-5 text-emerald-400 flex-1 overflow-hidden relative">
        <div className="flex flex-col gap-2">
          {step >= 0 && (
            <div className="flex items-center gap-2">
              <span className="text-emerald-600">➜</span>
              <span className="text-slate-200">ts-node</span>
              <span className="text-emerald-300">run.ts</span>
              {step === 0 && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-2 h-4 bg-emerald-400 inline-block"></motion.span>}
            </div>
          )}

          {step >= 1 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2 text-slate-400">
              [RadarOS] Initializing Agent 'ResearchBot'...
            </motion.div>
          )}

          {step >= 2 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-slate-400">
              [RadarOS] Using Model: openai/gpt-4o
            </motion.div>
          )}

          {step >= 3 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 border-l-2 border-emerald-500 pl-3">
              <div className="text-emerald-300 font-semibold mb-1">🛠️ Tool Call: web_search</div>
              <div className="text-slate-500 text-xs">{"{"} query: "latest advancements in multi-agent orchestration 2025" {"}"}</div>
            </motion.div>
          )}

          {step >= 4 && (
            <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="mt-2 border-l-2 border-indigo-500 pl-3">
              <div className="text-indigo-300 font-semibold mb-1">🧠 Memory Extraction</div>
              <div className="text-slate-500 text-xs">Stored Fact: User prefers typescript code examples.</div>
            </motion.div>
          )}

          {step >= 5 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4">
              <span className="text-emerald-400 font-bold">ResearchBot: </span>
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
    navigator.clipboard.writeText('npm install @radaros/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden border-b border-emerald-200">
      <GridBackground />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          <motion.div
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-300 text-sm font-bold text-emerald-800 mb-6 shadow-sm">
              <span className="flex h-2 w-2 bg-emerald-500 animate-pulse"></span>
              v0.3.14 Now Available
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight text-slate-900">
              Build Intelligent Agent Systems in <span className="text-gradient">TypeScript</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
              The model-agnostic orchestration framework for Node.js. 
              Deploy multi-agent teams, stateful workflows, memory layers, and browser automation—without writing a single line of Python.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
              <a href="https://xhipment.mintlify.app/quickstart" className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-[4px_4px_0px_#065f46] hover:shadow-[2px_2px_0px_#065f46] hover:translate-y-[2px] hover:translate-x-[2px] active:shadow-none active:translate-y-[4px] active:translate-x-[4px] text-center">
                Get Started
              </a>

              <div
                className="w-full sm:w-auto flex items-center justify-between gap-4 px-6 py-3.5 bg-white border-2 border-emerald-300 cursor-pointer hover:border-emerald-500 transition-colors font-mono text-sm group shadow-[4px_4px_0px_#d1fae5]"
                onClick={handleCopy}
              >
                <span className="text-slate-700">$ npm install @radaros/core</span>
                <button className="text-slate-400 group-hover:text-emerald-600 transition-colors" aria-label="Copy install command">
                  {copied ? (
                    <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-3 text-sm text-slate-500 font-bold tracking-wide uppercase">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                Zero Python
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                No Lock-in
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
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
