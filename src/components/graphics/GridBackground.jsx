import React from 'react'

export default function GridBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at center, #27272a 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          opacity: 0.3
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-primary/10 blur-[120px] rounded-full" />
    </div>
  )
}
