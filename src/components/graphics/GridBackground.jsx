import React from 'react'

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)`,
          backgroundSize: '42px 42px',
          maskImage: 'linear-gradient(to bottom, black, transparent 85%)'
        }}
      />
      <div className="absolute left-1/2 top-0 h-[420px] w-full max-w-4xl -translate-x-1/2 rounded-full bg-[#6d5f93]/10 blur-[140px]" />
      <div className="absolute right-[-10%] top-24 h-[320px] w-[320px] rounded-full bg-[#36566b]/10 blur-[130px]" />
    </div>
  )
}
