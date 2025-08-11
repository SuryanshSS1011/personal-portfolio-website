import { useState, useEffect, useCallback } from "react"

interface UseSkillsRotationOptions {
  totalItems: number
  autoRotateInterval?: number
  pauseOnInteraction?: number
}

export const useSkillsRotation = ({
  totalItems,
  autoRotateInterval = 3000,
  pauseOnInteraction = 5000
}: UseSkillsRotationOptions) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotating || totalItems <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalItems)
    }, autoRotateInterval)

    return () => clearInterval(interval)
  }, [isAutoRotating, totalItems, autoRotateInterval])

  const nextItem = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems)
    setIsAutoRotating(false)
    
    setTimeout(() => setIsAutoRotating(true), pauseOnInteraction)
  }, [totalItems, pauseOnInteraction])

  const prevItem = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems)
    setIsAutoRotating(false)
    
    setTimeout(() => setIsAutoRotating(true), pauseOnInteraction)
  }, [totalItems, pauseOnInteraction])

  const goToItem = useCallback((index: number) => {
    setCurrentIndex(index)
    setIsAutoRotating(false)
    
    setTimeout(() => setIsAutoRotating(true), pauseOnInteraction)
  }, [pauseOnInteraction])

  const pauseAutoRotation = useCallback(() => {
    setIsAutoRotating(false)
  }, [])

  const resumeAutoRotation = useCallback(() => {
    setIsAutoRotating(true)
  }, [])

  const temporarilyPause = useCallback((duration: number = pauseOnInteraction) => {
    setIsAutoRotating(false)
    setTimeout(() => setIsAutoRotating(true), duration)
  }, [pauseOnInteraction])

  return {
    currentIndex,
    isAutoRotating,
    nextItem,
    prevItem,
    goToItem,
    pauseAutoRotation,
    resumeAutoRotation,
    temporarilyPause
  }
}