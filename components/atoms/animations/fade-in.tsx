"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode } from "react"
import { ANIMATION_DURATIONS, ANIMATION_DISTANCES } from "@/lib/animation-config"

interface FadeInProps extends Omit<MotionProps, 'initial' | 'whileInView' | 'transition'> {
  children: ReactNode
  direction?: "up" | "down" | "left" | "right" | "none"
  delay?: number
  duration?: number
  distance?: number
  className?: string
  viewport?: { once?: boolean; amount?: number }
}

export const FadeIn = ({
  children,
  direction = "up",
  delay = 0,
  duration = ANIMATION_DURATIONS.slow,
  distance = ANIMATION_DISTANCES.medium,
  className,
  viewport = { once: true },
  ...props
}: FadeInProps) => {
  const getInitialPosition = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance }
      case "down":
        return { opacity: 0, y: -distance }
      case "left":
        return { opacity: 0, x: distance }
      case "right":
        return { opacity: 0, x: -distance }
      case "none":
      default:
        return { opacity: 0 }
    }
  }

  return (
    <motion.div
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration, delay }}
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}