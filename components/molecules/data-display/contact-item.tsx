"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"

interface ContactItemProps {
  icon: LucideIcon
  text: string
  index: number
}

export const ContactItem = ({ icon: Icon, text, index }: ContactItemProps) => {
  return (
    <motion.div
      key={index}
      className="flex items-center gap-2 text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
      whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
    >
      <Icon className="h-4 w-4 text-primary" />
      {text}
    </motion.div>
  )
}