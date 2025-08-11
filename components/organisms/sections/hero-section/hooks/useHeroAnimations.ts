import { useTransform, useScroll, MotionValue } from "framer-motion"

interface UseHeroAnimationsOptions {
  mousePosition: { x: number; y: number }
}

export const useHeroAnimations = ({ mousePosition }: UseHeroAnimationsOptions) => {
  const { scrollYProgress } = useScroll()
  
  // Parallax transformations
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // Mouse-based transformations
  const getParallaxStyle = (intensity: number = 1) => ({
    x: mousePosition.x * 10 * intensity,
    y: mousePosition.y * 5 * intensity,
  })
  
  const getBackgroundParallax = () => ({
    x: mousePosition.x * 10,
    y,
    opacity,
  })
  
  const getMainContentParallax = () => ({
    x: mousePosition.x * 5,
    opacity: 1,
    y: 0,
  })

  return {
    scrollYProgress,
    y,
    opacity,
    getParallaxStyle,
    getBackgroundParallax,
    getMainContentParallax,
  }
}