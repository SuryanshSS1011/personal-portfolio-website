"use client"

import { motion, MotionProps } from "framer-motion"
import { ReactNode } from "react"
import { ANIMATION_DELAYS, ANIMATION_DISTANCES } from "@/lib/animation-config"

interface StaggerContainerProps extends Omit<MotionProps, 'initial' | 'whileInView' | 'transition' | 'variants'> {
  children: ReactNode
  staggerDelay?: number
  className?: string
  viewport?: { once?: boolean; amount?: number }
}

export const StaggerContainer = ({
  children,
  staggerDelay = ANIMATION_DELAYS.short,
  className,
  viewport = { once: true },
  ...props
}: StaggerContainerProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export const StaggerItem = ({
  children,
  className,
  ...props
}: {
  children: ReactNode
  className?: string
} & MotionProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: ANIMATION_DISTANCES.small },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}