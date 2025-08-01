"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconTextListItemProps {
  icon: LucideIcon
  title?: string
  description?: string
  children?: React.ReactNode
  index?: number
  className?: string
  iconClassName?: string
  hoverable?: boolean
}

export const IconTextListItem = ({
  icon: Icon,
  title,
  description,
  children,
  index = 0,
  className,
  iconClassName,
  hoverable = true
}: IconTextListItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className={cn(
        "flex items-start gap-3",
        hoverable && "p-3 rounded-lg hover:bg-primary/5 transition-colors",
        className
      )}
    >
      <Icon className={cn(
        "h-4 w-4 text-primary mt-0.5 flex-shrink-0",
        iconClassName
      )} />
      {(title || description) ? (
        <div>
          {title && <h3 className="font-semibold">{title}</h3>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      ) : children}
    </motion.div>
  )
}