import React from 'react'
import LogoSVG from '../graphics/LogoSVG'

export default function Footer() {
  return (
    <footer className="border-t border-red-200 bg-white mt-20">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <LogoSVG className="w-6 h-6 text-red-600" />
            <span className="font-bold text-lg text-slate-900">Agentium</span>
            <span className="px-2 py-1 bg-red-50 text-xs border border-red-200 font-mono text-red-700">MIT License</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-500">
            <a href="https://github.com/agentiumOS/webpage#readme" className="hover:text-slate-900 transition-colors">Documentation</a>
            <a href="https://github.com/agentiumOS/webpage" className="hover:text-slate-900 transition-colors">GitHub</a>
            <a href="#packages" className="hover:text-slate-900 transition-colors">Packages</a>
          </div>
        </div>

        <div className="mt-8 text-center md:text-left text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Agentium. Built for production AI orchestration.</p>
        </div>
      </div>
    </footer>
  )
}
