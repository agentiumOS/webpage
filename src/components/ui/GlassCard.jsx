import React from 'react'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', as: Component = motion.div, ...props }) {
  return (
    <Component
      className={`glass ai-border rounded-3xl ${className}`}
      {...props}
    >
      {children}
    </Component>
  )
}
