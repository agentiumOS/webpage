import { useState, useEffect } from 'react'
import heroImage from '@/assets/hero.png'

export default function HeroGraphic() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Calculate tilt angle based on scroll position
  // Start at 15 degrees, reduce by 1 degree every 20px scroll until 0
  const scrollStep = 20 // pixels per degree
  const initialTilt = 15
  const tiltReduction = Math.floor(scrollY / scrollStep)
  const currentTilt = Math.max(0, initialTilt - tiltReduction)
  
  // Calculate parallax effect once tilt reaches 0
  const tiltEndScroll = initialTilt * scrollStep // 300px - when tilt reaches 0
  const parallaxStarted = scrollY > tiltEndScroll
  const parallaxOffset = parallaxStarted ? (scrollY - tiltEndScroll) * -0.4 : 0

  return (
    <div 
      className="relative w-[80%] max-w-[1100px] rounded-none mx-auto xl:-top-[150px] -top-[200px] transition-transform duration-100 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${currentTilt}deg) translateY(${parallaxOffset}px)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <img src={heroImage} alt="Hero Image" className="w-full h-full object-cover" />
    </div>
  )
}