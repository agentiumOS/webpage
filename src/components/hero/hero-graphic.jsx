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
  // Start at -25 degrees on X-axis (3D tilt), gradually return to 0 as we scroll to 1000px
  const maxScroll = 1000
  const maxTilt = -25
  // const currentTilt = Math.max(10, maxTilt + (scrollY / maxScroll) * Math.abs(maxTilt))

  return (
    <div 
      className="relative w-[80%] max-w-[1500px] rounded-none mx-auto -top-[200px] transition-transform duration-100 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(10deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <img src={heroImage} alt="Hero Image" className="w-full h-full object-cover" />
    </div>
  )
}