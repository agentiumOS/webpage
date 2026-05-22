import React, { useEffect, useState } from 'react'
import LogoSVG from '../graphics/LogoSVG'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#architecture', label: 'Architecture' },
    { href: '#packages', label: 'Packages' },
  ]

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-red-200 py-3 shadow-sm' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <LogoSVG className="w-8 h-8 text-red-600 group-hover:text-red-700 transition-colors" />
          <span className="font-bold text-xl tracking-tight text-slate-900">Agentium</span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500">
          {navLinks.map(l => (
            <a key={l.href} href={l.href} className="hover:text-slate-900 transition-colors">{l.label}</a>
          ))}
          <a href="https://github.com/agentiumOS/webpage#readme" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors flex items-center gap-1">
            Docs
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a href="https://github.com/agentiumOS/webpage" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
          </a>
          <a href="#packages" className="hidden sm:inline-flex bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm font-medium transition-all shadow-[2px_2px_0px_#991b1b] hover:translate-y-[1px] hover:translate-x-[1px] hover:shadow-none">
            Get Started
          </a>
          <button
            className="md:hidden p-2 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-red-200 bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-slate-600 hover:text-slate-900 py-2 text-sm font-medium">{l.label}</a>
            ))}
            <a href="https://github.com/agentiumOS/webpage#readme" target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-slate-900 py-2 text-sm font-medium">Docs</a>
            <a href="#packages" className="bg-red-600 text-white px-4 py-2 text-sm font-medium text-center mt-2">Get Started</a>
          </div>
        </div>
      )}
    </header>
  )
}
