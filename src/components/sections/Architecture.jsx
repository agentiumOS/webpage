import React from 'react'
import ArchDiagramSVG from '../graphics/ArchDiagramSVG'
import SectionHeader from '../ui/SectionHeader'

export default function Architecture() {
  return (
    <section id="architecture" className="section-shell border-b border-white/10 bg-[#080B1D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(109,95,147,0.08),transparent_36rem)]" />
      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader eyebrow="Architecture graph" title="Composable packages orbit one typed core.">
          Install only the runtime pieces you need. Agentium keeps agents, memory, workflows, transports, browser automation, and Studio traces connected through the same core contract.
        </SectionHeader>
        <ArchDiagramSVG />
      </div>
    </section>
  )
}
