import React from 'react'
import AgentOrbitSVG from '../graphics/AgentOrbitSVG'
import RadarPulseSVG from '../graphics/RadarPulseSVG'
import CopyCommand from '../ui/CopyCommand'
import GlassCard from '../ui/GlassCard'

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-[#070A1A] px-6 py-28 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(109,95,147,0.08),transparent_34rem)]" />
      <div className="container relative z-10 mx-auto">
        <GlassCard className="relative overflow-hidden p-8 text-center md:p-14">
          <div className="absolute -right-28 -top-36 hidden w-96 opacity-40 lg:block">
            <AgentOrbitSVG />
          </div>
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center">
            <div className="mb-8 grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04]">
              <RadarPulseSVG className="h-8 w-8" />
            </div>
            <h2 className="max-w-4xl text-4xl font-semibold tracking-[-0.04em] text-white md:text-6xl">
              Launch your first typed agent team.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
              Start with the core runtime, add the modules you need, and inspect every run from day one.
            </p>
            <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
              <CopyCommand className="w-full justify-center sm:w-auto" />
              <a href="https://github.com/agentiumOS/agentium" target="_blank" rel="noopener noreferrer" className="w-full rounded-full border border-white/10 bg-white/[0.06] px-8 py-4 text-center font-bold text-white transition hover:border-white/20 hover:bg-white/[0.09] sm:w-auto">
                View source code
              </a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  )
}
