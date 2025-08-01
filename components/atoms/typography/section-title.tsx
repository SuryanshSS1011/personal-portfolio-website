"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  children: React.ReactNode
  className?: string
  animate?: boolean
}

export const SectionTitle = ({ 
  children, 
  className,
  animate = true 
}: SectionTitleProps) => {
  const content = (
    <h2 className={cn(
      "text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
      className
    )}>
      {children}
    </h2>
  )

  if (!animate) return content

  return (
    <motion.h2
      className={cn(
        "text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
        className
      )}
      whileInView={{ scale: [0.8, 1.1, 1] }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  )
}