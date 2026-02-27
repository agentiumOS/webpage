import React, { useState } from 'react'

export default function CTA() {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText('npm install @radaros/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section className="py-32 relative overflow-hidden bg-slate-950 text-white mt-12 border-t border-slate-800">
      {/* Soft glowing background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        <div className="w-16 h-16 bg-emerald-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
          <div className="w-6 h-6 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(52,211,153,0.8)]"></div>
        </div>

        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white max-w-4xl">
          Ready to Orchestrate?
        </h2>

        <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-2xl mx-auto font-light">
          Start building production-ready AI agents in minutes. <br className="hidden md:block"/>Zero Python required.
        </p>

        <div
          className="inline-flex items-center gap-4 px-5 py-3 bg-slate-900 border-2 border-emerald-500 hover:border-emerald-400 cursor-pointer transition-colors font-mono text-sm group shadow-[4px_4px_0px_#059669] mb-12 mx-auto"
          onClick={handleCopy}
        >
          <span className="text-emerald-500">$</span>
          <span className="text-slate-200">npm install @radaros/core</span>
          <button className="text-slate-500 group-hover:text-emerald-400 transition-colors" aria-label="Copy">
            {copied ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            )}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="https://xhipment.mintlify.app/quickstart" className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-lg transition-colors shadow-[4px_4px_0px_#10b981] hover:shadow-[2px_2px_0px_#10b981] hover:translate-y-[2px] hover:translate-x-[2px] text-center border border-emerald-400">
            Read the Docs
          </a>
          <a href="https://github.com/xhipment/radar-os" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-4 bg-slate-800 text-white border-2 border-slate-600 hover:border-slate-500 font-bold text-lg transition-colors shadow-[4px_4px_0px_#475569] hover:shadow-[2px_2px_0px_#475569] hover:translate-y-[2px] hover:translate-x-[2px] text-center flex items-center justify-center gap-2">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
            View Source Code
          </a>
        </div>
      </div>
    </section>
  )
}
