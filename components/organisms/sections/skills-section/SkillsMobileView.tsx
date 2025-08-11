"use client"

import { motion, AnimatePresence } from "framer-motion"
import { SkillCard } from "@/components/molecules"
import { SkillCategory } from "@/data/skills"

interface SkillsMobileViewProps {
  skillCategories: SkillCategory[]
  currentIndex: number
}

export const SkillsMobileView = ({
  skillCategories,
  currentIndex
}: SkillsMobileViewProps) => {
  return (
    <div className="md:hidden relative w-full h-full flex items-center justify-center pt-2 px-3">
      <div className="relative w-full max-w-lg mx-auto h-80 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0, scale: 1.45 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.6
            }}
            className="flex items-center justify-center"
          >
            <SkillCard
              title={skillCategories[currentIndex].title}
              skills={skillCategories[currentIndex].skills}
              icon={skillCategories[currentIndex].icon}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}