import React from 'react'

export default function WorkflowFlowSVG({ className = "w-8 h-8" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="6" height="6" rx="1" />
      <rect x="15" y="3" width="6" height="6" rx="1" />
      <rect x="9" y="15" width="6" height="6" rx="1" />
      <path d="M9 6h6M18 9v3a3 3 0 0 1-3 3h-1M6 9v3a3 3 0 0 0 3 3h1" />
    </svg>
  )
}
