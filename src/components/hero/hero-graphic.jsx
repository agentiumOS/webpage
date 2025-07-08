import { useState, useEffect, useCallback } from 'react'
import heroImage from '@/assets/hero.png'
import bgGrid from '@/assets/zig-zag-bg-grid.svg'

export default function HeroGraphic() {
  const [scrollY, setScrollY] = useState(0)

  // Throttle scroll events for smoother performance
  const throttle = useCallback((func, delay) => {
    let timeoutId
    let lastExecTime = 0
    return function (...args) {
      const currentTime = Date.now()
      
      if (currentTime - lastExecTime > delay) {
        func.apply(this, args)
        lastExecTime = currentTime
      } else {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
          func.apply(this, args)
          lastExecTime = Date.now()
        }, delay - (currentTime - lastExecTime))
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollY(window.scrollY)
    }, 16) // ~60fps

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [throttle])

  // Calculate tilt angle based on scroll position with smooth transitions
  // Start at 15 degrees, reduce smoothly every 20px scroll until 0
  const scrollStep = 20 // pixels per degree
  const initialTilt = 15
  const tiltReduction = scrollY / scrollStep // Remove Math.floor for smooth transition
  const currentTilt = Math.max(0, initialTilt - tiltReduction)
  
  // Calculate parallax effect once tilt reaches 0
  const tiltEndScroll = initialTilt * scrollStep // 300px - when tilt reaches 0
  const parallaxStarted = scrollY > tiltEndScroll
  const parallaxOffset = parallaxStarted ? (scrollY - tiltEndScroll) * -0.2 : 0

  return (
    <div 
      className="relative w-full rounded-none mx-auto duration-100 ease-out flex justify-center items-center"
    >
      <img
        src={heroImage}
        alt="Hero Image"
        className="relative w-[80%] max-w-[1100px] object-cover xl:-top-[150px] -top-[200px] z-10"
        style={{
          transform: `perspective(1000px) rotateX(${currentTilt}deg) translateY(${parallaxOffset}px)`,
          transformStyle: 'preserve-3d',
          willChange: 'transform' // Optimize for animations
        }}
      />

      {/* Zig-zag background grid - top left */}
      <div className="absolute top-0 left-0 h-64 opacity-40 -z-10">
        <img src={bgGrid} alt="" className="w-full h-full object-cover" />
      </div>

      {/* Zig-zag background grid - bottom right */}
      <div className="absolute bottom-[100px] right-0 h-64 opacity-40 -z-10 rotate-180">
        <img src={bgGrid} alt="" className="w-full h-full object-cover" />
      </div>

      <div className="absolute top-0 left-[50%] translate-x-[-50%] w-full h-full opacity-70 -z-10 container bg-transparent border-x border-slate-300"></div>
    </div>
  )
}