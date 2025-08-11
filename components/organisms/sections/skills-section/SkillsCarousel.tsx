"use client"

import { motion } from "framer-motion"
import { SkillCard } from "@/components/molecules"
import { SkillCategory } from "@/data/skills"
import { useSkillsAnimation } from "./hooks/useSkillsAnimation"

interface SkillsCarouselProps {
  skillCategories: SkillCategory[]
  currentIndex: number
  onHoverStart: () => void
  onHoverEnd: () => void
  onCardClick: (index: number) => void
}

export const SkillsCarousel = ({
  skillCategories,
  currentIndex,
  onHoverStart,
  onHoverEnd,
  onCardClick
}: SkillsCarouselProps) => {
  const { getCardPosition } = useSkillsAnimation({
    currentIndex,
    totalItems: skillCategories.length,
    isMobile: false
  })

  return (
    <div 
      className="hidden md:flex relative w-full h-full items-start justify-center pt-40" 
      style={{ transformStyle: 'preserve-3d' }}
    >
      {skillCategories.map((category, index) => {
        const position = getCardPosition(index)
        const isCenter = index === currentIndex
        
        return (
          <motion.div
            key={index}
            className="absolute"
            initial={{ opacity: 0, scale: 0.3 }}
            animate={{
              x: position.x,
              y: position.y,
              scale: position.scale,
              opacity: position.opacity,
              rotateY: position.rotateY,
              z: position.z
            }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              duration: 1.5
            }}
            style={{
              transformOrigin: "center center",
              transformStyle: 'preserve-3d',
              zIndex: position.zIndex
            }}
            onHoverStart={onHoverStart}
            onHoverEnd={onHoverEnd}
          >
            <div 
              className={`transition-all duration-500 ${
                isCenter ? 'cursor-default' : 'cursor-pointer hover:scale-105'
              }`}
              onClick={() => !isCenter && onCardClick(index)}
              style={{
                transform: `rotateY(${position.rotateY * 0.4}deg)`,
                transformStyle: 'preserve-3d',
                filter: isCenter ? 'none' : 'blur(1px)'
              }}
            >
              <SkillCard
                title={category.title}
                skills={category.skills}
                icon={category.icon}
              />
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}