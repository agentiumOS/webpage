import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AgentOrbitSVG from '../graphics/AgentOrbitSVG'
import GridBackground from '../graphics/GridBackground'

export default function Hero() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @radaros/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <GridBackground />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
              v0.3.14 Now Available
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              Build Intelligent Agent Systems in <span className="text-gradient">TypeScript</span>
            </h1>
            
            <p className="text-lg md:text-xl text-zinc-400 mb-8 max-w-2xl mx-auto lg:mx-0">
              Model-agnostic orchestration framework for Node.js. Multi-agent teams, stateful workflows, RAG, voice, and browser automation — batteries included.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
              <a href="https://xhipment.mintlify.app/quickstart" className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)] text-center">
                Get Started
              </a>
              
              <div 
                className="w-full sm:w-auto flex items-center justify-between gap-4 px-4 py-3 bg-surface border border-zinc-800 rounded-lg cursor-pointer hover:border-zinc-700 transition-colors font-mono text-sm group"
                onClick={handleCopy}
              >
                <span className="text-zinc-300">npm install @radaros/core</span>
                <button className="text-zinc-500 group-hover:text-zinc-300 transition-colors" aria-label="Copy install command">
                  {copied ? (
                    <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start gap-6 text-sm text-zinc-500 font-medium">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                Zero Python
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4 text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                No Framework Lock-in
              </span>
            </div>
          </motion.div>

          {/* Graphic Content */}
          <motion.div 
            className="flex-1 w-full max-w-lg lg:max-w-none flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <AgentOrbitSVG />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
