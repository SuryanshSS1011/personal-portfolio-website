"use client"

import { ReactNode } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/atoms"
import { LucideIcon } from "lucide-react"

interface InfoCardProps {
  title: string
  icon: LucideIcon
  children: ReactNode
  animation?: {
    whileHover?: object
  }
  className?: string
}

export const InfoCard = ({
  title,
  icon: Icon,
  children,
  animation = {
    whileHover: { scale: 1.02 }
  },
  className = ""
}: InfoCardProps) => {
  return (
    <motion.div 
      whileHover={animation.whileHover} 
      transition={{ type: "spring", stiffness: 300 }}
      className={className}
    >
      <Card className="group border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
      </Card>
    </motion.div>
  )
}