"use client"

import Link from "next/link"
import { LucideIcon } from "lucide-react"

interface SimpleNavigationItemProps {
  href?: string
  label: string
  icon: LucideIcon
  isActive: boolean
}

export const SimpleNavigationItem = ({ href, label, icon: Icon, isActive }: SimpleNavigationItemProps) => {
  const className = `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
    isActive
      ? "bg-primary text-primary-foreground shadow-lg"
      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
  }`

  if (href) {
    return (
      <Link href={href} className={className}>
        <Icon className="h-4 w-4" />
        {label}
      </Link>
    )
  }

  return (
    <button className={className}>
      <Icon className="h-4 w-4" />
      {label}
    </button>
  )
}