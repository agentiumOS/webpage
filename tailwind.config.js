/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070A1A',
        surface: '#0B1026',
        border: 'rgba(148, 163, 184, 0.18)',
        primary: '#b7a7ff',
        secondary: '#9cc9e8',
        muted: '#94a3b8',
        ai: {
          ink: '#070A1A',
          panel: '#0B1026',
          violet: '#b7a7ff',
          indigo: '#6f6aa8',
          blue: '#6f8dab',
          cyan: '#9cc9e8',
          glow: '#d6ccff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'sm': '0.5rem',
        DEFAULT: '0.875rem',
        'md': '1rem',
        'lg': '1.25rem',
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '2.5rem',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit': 'orbit 20s linear infinite',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'mesh-drift': 'meshDrift 16s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        meshDrift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0) scale(1)' },
          '50%': { transform: 'translate3d(24px, -18px, 0) scale(1.05)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
}
