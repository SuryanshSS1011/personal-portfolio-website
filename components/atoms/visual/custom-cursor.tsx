"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

let cursorInstanceCount = 0

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    cursorInstanceCount++
    setMounted(true)
    
    // Only activate the first instance to prevent conflicts
    if (cursorInstanceCount === 1) {
      setIsActive(true)
      
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }
      
      window.addEventListener("mousemove", handleMouseMove)
      
      return () => {
        window.removeEventListener("mousemove", handleMouseMove)
        cursorInstanceCount--
      }
    }
    
    return () => {
      cursorInstanceCount--
    }
  }, [])

  if (!mounted || !isActive) {
    return null
  }

  return (
    <motion.div
      className="fixed w-6 h-6 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
      suppressHydrationWarning
    />
  )
}