import React from 'react'
import LogoSVG from '../graphics/LogoSVG'

export default function Footer() {
  return (
    <footer className="border-t border-emerald-200 bg-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <LogoSVG className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-lg text-slate-900">RadarOS</span>
            <span className="px-2 py-1 bg-emerald-50 text-xs border border-emerald-200 font-mono text-emerald-700">MIT License</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500">
            <a href="https://docs.xhipai.com" className="hover:text-slate-900 transition-colors">Documentation</a>
            <a href="https://github.com/xhipment/radar-os" className="hover:text-slate-900 transition-colors">GitHub</a>
            <a href="https://www.npmjs.com/org/radaros" className="hover:text-slate-900 transition-colors">npm</a>
          </div>
        </div>

        <div className="mt-8 text-center md:text-left text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} RadarOS. Built by <a href="https://xhipai.com" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 underline decoration-emerald-300 underline-offset-4">Xhip AI</a>.</p>
        </div>
      </div>
    </footer>
  )
}
