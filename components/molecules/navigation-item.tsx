"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface NavigationItemProps {
  id: string
  label: string
  icon: LucideIcon
  isActive: boolean
  onClick: (id: string) => void
  isMobile?: boolean
}

export const NavigationItem = ({ 
  id, 
  label, 
  icon: Icon, 
  isActive, 
  onClick, 
  isMobile = false 
}: NavigationItemProps) => {
  if (isMobile) {
    return (
      <motion.button
        onClick={() => onClick(id)}
        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${
          isActive ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
        }`}
        whileHover={{ x: 10 }}
      >
        <Icon className="h-4 w-4" />
        {label}
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
        isActive
          ? "bg-primary text-primary-foreground shadow-lg"
          : "text-muted-foreground hover:text-primary hover:bg-primary/10"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="h-4 w-4" />
      {label}
    </motion.button>
  )
}