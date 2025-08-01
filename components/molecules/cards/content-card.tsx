"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { IconTextListItem } from "@/components/molecules"
import { LucideIcon } from "lucide-react"

interface ContentCardProps {
  id?: string
  title: string
  subtitle?: string
  date?: string
  badge?: {
    text: string
    variant?: "default" | "secondary" | "destructive" | "outline"
    className?: string
  }
  items: (string | ReactNode)[]
  icon: LucideIcon
  index?: number
  animation?: {
    initial?: object
    animate?: object
    transition?: object
    whileHover?: object
    viewport?: object
  }
  className?: string
}

export const ContentCard = ({
  id,
  title,
  subtitle,
  date,
  badge,
  items,
  icon: ItemIcon,
  index = 0,
  animation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: index * 0.1 },
    whileHover: { scale: 1.02 }
  },
  className = ""
}: ContentCardProps) => {
  const displayText = subtitle && date ? `${subtitle} • ${date}` : subtitle || date || ""

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      transition={animation.transition}
      whileHover={animation.whileHover}
      viewport={animation.viewport}
      className={className}
    >
      <Card 
        id={id}
        className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50"
      >
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-primary">{title}</CardTitle>
              {displayText && <CardDescription>{displayText}</CardDescription>}
            </div>
            {badge && (
              <Badge variant={badge.variant || "default"} className={badge.className}>
                {badge.text}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {items.map((item, itemIndex) => (
              <IconTextListItem
                key={itemIndex}
                icon={ItemIcon}
                title={typeof item === 'string' ? item : undefined}
                index={itemIndex}
                className="text-sm text-muted-foreground"
              >
                {typeof item === 'string' ? undefined : item}
              </IconTextListItem>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}