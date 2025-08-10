"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import Link from "next/link"

interface NavigationItemProps {
  id: string
  label: string
  icon: LucideIcon
  isActive: boolean
  onClick: (id: string) => void
  isMobile?: boolean
  href?: string
}

export const NavigationItem = ({ 
  id, 
  label, 
  icon: Icon, 
  isActive, 
  onClick, 
  isMobile = false,
  href
}: NavigationItemProps) => {
  const handleClick = (e: React.MouseEvent) => {
    if (href) {
      return // Let the Link handle navigation
    }
    e.preventDefault()
    onClick(id)
  }

  const buttonClassName = `flex items-center gap-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${
    isActive
      ? "bg-primary text-primary-foreground shadow-lg"
      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
  } ${isMobile ? "py-2 px-4 rounded-md" : "px-4 py-2"}`

  const content = (
    <>
      <Icon className="h-4 w-4" />
      {label}
    </>
  )

  if (href) {
    if (isMobile) {
      return (
        <motion.div whileHover={{ x: 10 }}>
          <Link href={href} className={buttonClassName}>
            {content}
          </Link>
        </motion.div>
      )
    }

    return (
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Link href={href} className={buttonClassName}>
          {content}
        </Link>
      </motion.div>
    )
  }

  if (isMobile) {
    return (
      <motion.button
        onClick={handleClick}
        className={buttonClassName}
        whileHover={{ x: 10 }}
      >
        {content}
      </motion.button>
    )
  }

  return (
    <motion.button
      onClick={handleClick}
      className={buttonClassName}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {content}
    </motion.button>
  )
}