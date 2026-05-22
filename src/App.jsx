import React from 'react'
import { ReactLenis } from 'lenis/react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import ModelMarquee from './components/sections/ModelMarquee'
import Features from './components/sections/Features'
import CodeShowcase from './components/sections/CodeShowcase'
import StudioSection from './components/sections/StudioSection'
import Architecture from './components/sections/Architecture'
import Comparison from './components/sections/Comparison'
import Packages from './components/sections/Packages'
import CTA from './components/sections/CTA'

function App() {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative bg-ai-ink text-slate-100 selection:bg-white selection:text-slate-950">
        <Navbar />
        <main className="flex-1 flex flex-col w-full relative z-10">
          <Hero />
          <ModelMarquee />
          <Features />
          <CodeShowcase />
          <StudioSection />
          <Architecture />
          <Comparison />
          <Packages />
          <CTA />
        </main>
        <Footer />
      </div>
    </ReactLenis>
  )
}

export default App
