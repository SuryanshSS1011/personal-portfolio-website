"use client"

import { motion } from "framer-motion"
import { FloatingParticles } from "@/components/atoms"

interface HeroBackgroundProps {
  style: {
    x: number
    y: any // MotionValue from framer-motion
    opacity: any // MotionValue from framer-motion
  }
}

export const HeroBackground = ({ style }: HeroBackgroundProps) => {
  return (
    <motion.div 
      style={style}
      className="absolute inset-0 z-0"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      
      {/* Floating particles */}
      <FloatingParticles />
    </motion.div>
  )
}