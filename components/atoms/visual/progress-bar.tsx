"use client"

import { motion, useScroll, useSpring, useTransform } from "framer-motion"
import { useIsMounted } from "@/hooks"

export const ProgressBar = () => {
  const { scrollYProgress } = useScroll()
  const isMounted = useIsMounted()
  
  // Add smooth spring animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  // Transform to ensure minimum visibility
  const width = useTransform(scaleX, [0, 1], ["0%", "100%"])

  if (!isMounted) return null

  return (
    <>
      {/* Progress bar with explicit width animation */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary z-[100] shadow-lg"
        style={{ width }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      {/* Background track for visibility */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/10 z-[99]" />
    </>
  )
}