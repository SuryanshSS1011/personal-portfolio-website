"use client"

import { motion } from "framer-motion"
import { CyclingRoles, ScrollIndicator } from "@/components/atoms"
import { personalInfo } from "@/data/personal-info"

interface HeroContentProps {
  mousePosition: { x: number; y: number }
}

export const HeroContent = ({ mousePosition }: HeroContentProps) => {
  return (
    <>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          x: mousePosition.x * 3,
        }}
        transition={{ delay: 0.4 }}
        className="text-5xl md:text-7xl font-bold mb-6"
      >
        <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-float">
          {personalInfo.name}
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 h-20 md:h-24 flex items-center justify-center"
      >
        <CyclingRoles
          roles={personalInfo.roles}
          className="text-center"
          duration={2500}
          pauseDuration={800}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-8"
      >
        <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed">
          {personalInfo.description}
        </p>
      </motion.div>
    </>
  )
}