"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TypingAnimation } from "./typing-animation"

interface CyclingRolesProps {
  roles: string[]
  className?: string
  duration?: number
  pauseDuration?: number
}

export const CyclingRoles = ({ 
  roles, 
  className = "", 
  duration = 4000, 
  pauseDuration = 1000 
}: CyclingRolesProps) => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      setKey(prev => prev + 1) // Force TypingAnimation to restart
    }, duration + pauseDuration)

    return () => clearInterval(interval)
  }, [roles.length, duration, pauseDuration])

  return (
    <div className={`relative ${className}`}>
      <TypingAnimation
        key={key}
        text={roles[currentRoleIndex]}
        className="inline-block font-medium bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
        speed={80}
        cursorSize="lg"
      />
    </div>
  )
}