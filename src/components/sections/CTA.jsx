import React from 'react'
import RadarPulseSVG from '../graphics/RadarPulseSVG'

export default function CTA() {
  return (
    <section className="py-32 relative z-10 overflow-hidden border-t border-border mt-12 bg-primary/5">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/90 z-0" />
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="flex justify-center mb-8">
          <RadarPulseSVG className="w-32 h-32" />
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Ready to orchestrate?
        </h2>
        
        <p className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto">
          Start building production-ready AI agents in minutes. No Python required.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="https://xhipment.mintlify.app/quickstart" className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_30px_-5px_rgba(34,211,238,0.5)]">
            Read the Docs
          </a>
          
          <a href="https://github.com/xhipment/radar-os" target="_blank" rel="noopener noreferrer" className="px-8 py-3 bg-surface border border-zinc-700 text-zinc-300 font-semibold rounded-lg hover:bg-zinc-800 transition-colors">
            View Source Code
          </a>
        </div>
      </div>
    </section>
  )
}
