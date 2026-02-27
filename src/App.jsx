import React from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import Features from './components/sections/Features'
import CodeShowcase from './components/sections/CodeShowcase'
import Architecture from './components/sections/Architecture'
import Comparison from './components/sections/Comparison'
import Packages from './components/sections/Packages'
import CTA from './components/sections/CTA'

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans overflow-x-hidden relative selection:bg-primary/30">
      <Navbar />
      <main className="flex-1 flex flex-col w-full relative z-10">
        <Hero />
        <Features />
        <CodeShowcase />
        <Architecture />
        <Comparison />
        <Packages />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
