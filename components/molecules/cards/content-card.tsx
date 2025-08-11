"use client"

import { ReactNode, memo } from "react"
import { motion, TargetAndTransition, Transition } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { IconTextListItem } from "@/components/molecules"
import { LucideIcon } from "lucide-react"
import { CARD_STYLES, getCardAnimation } from "@/lib/shared-animations"

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
    initial?: TargetAndTransition
    animate?: TargetAndTransition
    transition?: Transition
    whileHover?: TargetAndTransition
    viewport?: { once?: boolean; amount?: number }
  }
  className?: string
}

export const ContentCard = memo(({
  id,
  title,
  subtitle,
  date,
  badge,
  items,
  icon: ItemIcon,
  index = 0,
  animation = getCardAnimation(index),
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
        className={CARD_STYLES.interactive}
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
})

ContentCard.displayName = "ContentCard"