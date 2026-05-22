import React from 'react'
import { motion } from 'framer-motion'

export default function AgentOrbitSVG({ className = "" }) {
  return (
    <div className={`relative flex aspect-square w-full max-w-lg items-center justify-center ${className}`}>
      <motion.div
        className="absolute inset-0 rounded-full bg-[#6d5f93]/12 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-4 rounded-full border border-white/10 animate-orbit" />
      <motion.div className="absolute w-full h-full animate-orbit" style={{ animationDuration: '20s' }}>
        <div className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 shadow-[0_0_24px_rgba(255,255,255,0.08)] backdrop-blur">
          <svg className="h-7 w-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 shadow-[0_0_24px_rgba(255,255,255,0.08)] backdrop-blur">
          <svg className="h-7 w-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
          </svg>
        </div>
      </motion.div>

      <div className="absolute inset-20 rounded-full border border-white/10 animate-orbit" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
      <motion.div className="absolute w-full h-full" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}>
        <div className="absolute left-20 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 shadow-[0_0_22px_rgba(255,255,255,0.06)] backdrop-blur">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
          </svg>
        </div>

        <div className="absolute right-20 top-1/2 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-slate-950/80 shadow-[0_0_22px_rgba(255,255,255,0.06)] backdrop-blur">
          <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </motion.div>

      <div className="relative z-10 flex h-28 w-28 items-center justify-center rounded-[1.75rem] border border-white/15 bg-white/[0.06] shadow-[0_0_44px_rgba(255,255,255,0.08)] backdrop-blur-xl">
        <svg className="h-14 w-14 text-slate-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 12h20M12 12m-8 0a8 8 0 1 0 16 0 8 8 0 1 0 -16 0" />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      </div>
    </div>
  )
}
