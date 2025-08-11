import { useMemo } from "react"

interface SkillsAnimationOptions {
  currentIndex: number
  totalItems: number
  isMobile?: boolean
}

interface CardPosition {
  x: number
  y: number
  z: number
  scale: number
  rotateY: number
  opacity: number
  zIndex: number
}

export const useSkillsAnimation = ({ 
  currentIndex, 
  totalItems, 
  isMobile = false 
}: SkillsAnimationOptions) => {
  
  const getCardPosition = useMemo(() => {
    return (index: number): CardPosition => {
      if (isMobile) {
        // Mobile: Simple horizontal sliding
        const x = (index - currentIndex) * 300
        const scale = index === currentIndex ? 1 : 0.8
        const opacity = index === currentIndex ? 1 : 0.4
        const zIndex = index === currentIndex ? 10 : 1
        
        return { x, y: 0, z: 0, scale, rotateY: 0, opacity, zIndex }
      }
      
      // Desktop: 3D cylindrical rotation
      const angleStep = 360 / totalItems
      const currentAngle = (index - currentIndex) * angleStep
      const radius = 450
      const angleRad = (currentAngle * Math.PI) / 180
      
      const x = Math.sin(angleRad) * radius
      const z = Math.cos(angleRad) * radius
      const y = Math.sin(angleRad * 2) * 20
      const scale = 0.3 + (z + radius) / (radius * 2) * 1.4
      const rotateY = currentAngle * 0.8
      const opacity = 0.2 + (scale - 0.3) / 1.4 * 0.8
      const zIndex = Math.round(z + radius)
      
      return { x, y, z, scale, rotateY, opacity, zIndex }
    }
  }, [currentIndex, totalItems, isMobile])

  return {
    getCardPosition
  }
}