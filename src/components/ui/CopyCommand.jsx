import React, { useState } from 'react'

export default function CopyCommand({ command = 'npm install @agentium/core', className = '' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-sm text-slate-200 backdrop-blur transition hover:border-white/20 hover:bg-white/[0.07] ${className}`}
      aria-label="Copy install command"
    >
      <span className="text-slate-500">$</span>
      <span>{command}</span>
      <span className="text-slate-500 transition group-hover:text-slate-200">
        {copied ? 'copied' : 'copy'}
      </span>
    </button>
  )
}
