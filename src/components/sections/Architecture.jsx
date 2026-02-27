import React from 'react'
import ArchDiagramSVG from '../graphics/ArchDiagramSVG'

export default function Architecture() {
  return (
    <section className="py-24 relative z-10 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">Modular by Design</h2>
          <p className="text-slate-500 text-lg">
            Install only what you need. RadarOS is built as a set of composable packages — bring your own models, DB, and UI.
          </p>
        </div>
        <ArchDiagramSVG />
      </div>
    </section>
  )
}
