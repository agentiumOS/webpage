import React from 'react'
import LogoSVG from '../graphics/LogoSVG'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30 mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <LogoSVG className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg">RadarOS</span>
            <span className="px-2 py-1 bg-zinc-800 text-xs rounded border border-zinc-700 font-mono text-zinc-400">MIT License</span>
          </div>
          
          <div className="flex gap-6 text-sm text-zinc-400">
            <a href="https://xhipment.mintlify.app/" className="hover:text-white transition-colors">Documentation</a>
            <a href="https://github.com/xhipment/agentOs" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/org/radaros" className="hover:text-white transition-colors">npm</a>
          </div>
        </div>
        
        <div className="mt-8 text-center md:text-left text-sm text-zinc-500 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} RadarOS. Built by <a href="https://lisa.xhipai.com" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white underline decoration-zinc-700 underline-offset-4">Xhip AI</a>.</p>
        </div>
      </div>
    </footer>
  )
}
