import React from 'react'

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, #d1fae5 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.5
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-emerald-200/40 blur-[120px] rounded-full" />
    </div>
  )
}
