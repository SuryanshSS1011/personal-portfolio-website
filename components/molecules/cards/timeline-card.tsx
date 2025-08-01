"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/atoms"

interface TimelineCardProps {
  title: string
  date: string
  animation?: {
    initial?: object
    whileInView?: object
    transition?: object
    viewport?: object
    whileHover?: object
  }
  className?: string
}

export const TimelineCard = ({
  title,
  date,
  animation = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    transition: { duration: 0.6 },
    viewport: { once: true },
    whileHover: { scale: 1.02 }
  },
  className = ""
}: TimelineCardProps) => {
  return (
    <motion.div
      initial={animation.initial}
      whileInView={animation.whileInView}
      transition={animation.transition}
      viewport={animation.viewport}
      whileHover={animation.whileHover}
      className={`flex items-center gap-4 ${className}`}
    >
      <div className="flex-1 text-right">
        <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
          <CardContent className="p-4">
            <h3 className="text-primary font-semibold text-left">{title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{date}</p>
          </CardContent>
        </Card>
      </div>
      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg" />
      <div className="flex-1" />
    </motion.div>
  )
}