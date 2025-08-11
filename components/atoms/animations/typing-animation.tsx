"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useIsMounted } from "@/hooks"

interface TypingAnimationProps {
  text: string
  className?: string
  speed?: number
  cursorSize?: "sm" | "md" | "lg" | "xl"
}

export const TypingAnimation = ({ text, className = "", speed = 100, cursorSize = "md" }: TypingAnimationProps) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const isMounted = useIsMounted()

  useEffect(() => {
    if (isMounted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, isMounted, speed])
  
  // Reset when text changes
  useEffect(() => {
    setDisplayText("")
    setCurrentIndex(0)
  }, [text])

  return (
    <span className={className} suppressHydrationWarning>
      {isMounted ? displayText : text}
      {isMounted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className={`inline-block w-0.5 bg-primary ml-1 ${
            cursorSize === "sm" ? "h-4" :
            cursorSize === "md" ? "h-6" :
            cursorSize === "lg" ? "h-8" :
            cursorSize === "xl" ? "h-10" : "h-6"
          }`}
        />
      )}
    </span>
  )
}