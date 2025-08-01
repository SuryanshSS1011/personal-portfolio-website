"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionWrapperProps {
  id: string
  title: string
  children: ReactNode
  className?: string
  maxWidth?: "4xl" | "6xl"
  background?: boolean
}

export const SectionWrapper = ({ 
  id, 
  title, 
  children, 
  className,
  maxWidth = "6xl",
  background = false 
}: SectionWrapperProps) => {
  return (
    <section 
      id={id} 
      className={cn(
        "py-20",
        background && "bg-muted/50",
        className
      )}
      aria-labelledby={`${id}-heading`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={cn(
            "mx-auto",
            maxWidth === "4xl" ? "max-w-4xl" : "max-w-6xl"
          )}
        >
          <motion.h2
            id={`${id}-heading`}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            whileInView={{ scale: [0.8, 1.1, 1] }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {title}
          </motion.h2>
          {children}
        </motion.div>
      </div>
    </section>
  )
}