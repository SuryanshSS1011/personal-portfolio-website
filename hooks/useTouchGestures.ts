import { useState, useCallback } from "react"

interface TouchGestureOptions {
  minSwipeDistance?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  disabled?: boolean
}

export const useTouchGestures = ({
  minSwipeDistance = 50,
  onSwipeLeft,
  onSwipeRight,
  disabled = false
}: TouchGestureOptions) => {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (disabled) return
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }, [disabled])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (disabled) return
    setTouchEnd(e.targetTouches[0].clientX)
  }, [disabled])

  const onTouchEnd = useCallback(() => {
    if (disabled || !touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && onSwipeLeft) {
      onSwipeLeft()
    }
    if (isRightSwipe && onSwipeRight) {
      onSwipeRight()
    }
  }, [disabled, touchStart, touchEnd, minSwipeDistance, onSwipeLeft, onSwipeRight])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}