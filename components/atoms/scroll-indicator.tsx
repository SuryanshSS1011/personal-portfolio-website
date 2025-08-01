"use client"

import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface ScrollIndicatorProps {
  targetId: string
}

export const ScrollIndicator = ({ targetId }: ScrollIndicatorProps) => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12">
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        className="cursor-pointer"
        onClick={() => scrollToSection(targetId)}
      >
        <ChevronDown className="h-8 w-8 text-primary mx-auto" />
      </motion.div>
    </motion.div>
  )
}