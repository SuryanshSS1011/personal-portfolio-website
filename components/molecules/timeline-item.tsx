"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/atoms"

interface TimelineItemProps {
  title: string
  description: string
  date: string
  isLeft?: boolean
}

export const TimelineItem = ({
  title,
  description,
  date,
  isLeft = false,
}: TimelineItemProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-4 ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : ""}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{description}</p>
          </CardContent>
        </Card>
      </div>
      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
      <div className="flex-1" />
    </motion.div>
  )
}