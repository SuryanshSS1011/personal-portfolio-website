"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode } from "react"
import { ANIMATION_DURATIONS } from "@/lib/animation-config"

interface ScaleInProps extends Omit<MotionProps, 'initial' | 'whileInView' | 'transition'> {
  children: ReactNode
  delay?: number
  duration?: number
  scale?: number
  className?: string
  viewport?: { once?: boolean; amount?: number }
}

export const ScaleIn = ({
  children,
  delay = 0,
  duration = ANIMATION_DURATIONS.slow,
  scale = 0,
  className,
  viewport = { once: true },
  ...props
}: ScaleInProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration, delay }}
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}