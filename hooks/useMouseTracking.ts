import { useState, useEffect, useRef } from "react"

interface MousePosition {
  x: number
  y: number
}

interface UseMouseTrackingOptions {
  enabled?: boolean
  normalize?: boolean // Normalize values to -1 to 1 range
}

export const useMouseTracking = ({ 
  enabled = true, 
  normalize = true 
}: UseMouseTrackingOptions = {}) => {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 })
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!enabled) return

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        let x = e.clientX - centerX
        let y = e.clientY - centerY
        
        if (normalize) {
          // Normalize to -1 to 1 range based on container size
          x = x / (rect.width / 2)
          y = y / (rect.height / 2)
          
          // Clamp values
          x = Math.max(-1, Math.min(1, x))
          y = Math.max(-1, Math.min(1, y))
        }
        
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [enabled, normalize])

  // Reset position when disabled
  useEffect(() => {
    if (!enabled) {
      setMousePosition({ x: 0, y: 0 })
    }
  }, [enabled])

  return {
    mousePosition,
    containerRef
  }
}