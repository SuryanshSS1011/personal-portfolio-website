"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/atoms"
import { cn } from "@/lib/utils"

interface AnimatedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: "lift" | "scale" | "shadow" | "none"
  animateIn?: boolean
  delay?: number
}

export const AnimatedCard = ({ 
  children,
  className,
  hoverEffect = "shadow",
  animateIn = true,
  delay = 0,
  ...props 
}: AnimatedCardProps) => {
  const hoverVariants = {
    lift: { y: -10 },
    scale: { scale: 1.02 },
    shadow: {},
    none: {}
  }

  const cardContent = (
    <Card 
      className={cn(
        "transition-all duration-300",
        hoverEffect === "shadow" && "hover:shadow-xl",
        "border-primary/20 hover:border-primary/50",
        className
      )} 
      {...props}
    >
      {children}
    </Card>
  )

  if (!animateIn && hoverEffect === "none") {
    return cardContent
  }

  return (
    <motion.div
      initial={animateIn ? { opacity: 0, y: 20 } : undefined}
      whileInView={animateIn ? { opacity: 1, y: 0 } : undefined}
      whileHover={hoverVariants[hoverEffect]}
      transition={{ 
        duration: 0.6, 
        delay,
        type: hoverEffect === "lift" || hoverEffect === "scale" ? "spring" : "tween",
        stiffness: 300
      }}
      viewport={{ once: true }}
    >
      {cardContent}
    </motion.div>
  )
}