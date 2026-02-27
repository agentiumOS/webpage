import React from 'react'

export default function LogoSVG({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 12h20M12 12m-8 0a8 8 0 1 0 16 0 8 8 0 1 0 -16 0" />
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  )
}
