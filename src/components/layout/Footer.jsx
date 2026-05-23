import React from 'react'
import LogoSVG from '../graphics/LogoSVG'

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <LogoSVG className="h-6 w-6 text-slate-200" />
            <span className="text-lg font-bold text-white">Agentium</span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-xs text-slate-400">MIT License</span>
          </div>

          <div className="flex gap-6 text-sm text-slate-400">
            <a href="https://docs.agentium.in" className="transition-colors hover:text-white">Documentation</a>
            <a href="https://github.com/agentiumOS/agentium" className="transition-colors hover:text-white">GitHub</a>
            <a href="#packages" className="transition-colors hover:text-white">Packages</a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-center text-sm text-slate-500 md:text-left">
            &copy; {new Date().getFullYear()} Agentium. Built for production AI orchestration.
          </p>
          <a
            href="https://www.producthunt.com/products/agentium-typescript?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-agentium-ai-agent-runtime"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              alt="Agentium - AI Agent Runtime - Agentium brings models, memory, tools into one TS runtime. | Product Hunt"
              width="250"
              height="54"
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1153560&theme=dark&t=1779513937547"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
