"use client"

import { Button, ButtonProps } from "@/components/atoms/button"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconButtonProps extends ButtonProps {
  icon: LucideIcon
  iconPosition?: "left" | "right"
  children: React.ReactNode
}

export const IconButton = ({ 
  icon: Icon, 
  iconPosition = "left",
  children,
  className,
  ...props 
}: IconButtonProps) => {
  return (
    <Button className={className} {...props}>
      {iconPosition === "left" && <Icon className="h-4 w-4 mr-2" />}
      {children}
      {iconPosition === "right" && <Icon className="h-4 w-4 ml-2" />}
    </Button>
  )
}