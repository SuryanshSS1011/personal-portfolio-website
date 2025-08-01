"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"

interface StaggeredListProps {
  children: ReactNode[]
  className?: string
  staggerDelay?: number
}

export const StaggeredList = ({ 
  children, 
  className = "space-y-2",
  staggerDelay = 0.1 
}: StaggeredListProps) => {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * staggerDelay }}
          viewport={{ once: true }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}