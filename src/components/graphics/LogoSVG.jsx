import React from 'react'

export default function LogoSVG({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M3 12h18" opacity="0.65" />
      <path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" />
      <path d="M12 12m-4.2 0a4.2 4.2 0 1 0 8.4 0a4.2 4.2 0 1 0 -8.4 0" opacity="0.35" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  )
}
