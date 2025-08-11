"use client"

import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SkillCategory } from "@/data/skills"
import React from "react"

interface SkillsNavigationProps {
  skillCategories: SkillCategory[]
  currentIndex: number
  onPrevious: () => void
  onNext: () => void
  onGoToIndex: (index: number) => void
  className?: string
}

export const SkillsNavigation = ({
  skillCategories,
  currentIndex,
  onPrevious,
  onNext,
  onGoToIndex,
  className = ""
}: SkillsNavigationProps) => {
  return (
    <>
      {/* Desktop Navigation Arrows */}
      <button
        onClick={onPrevious}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-primary/15 hover:bg-primary/25 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110"
        aria-label="Previous skill category"
      >
        <ChevronLeft className="w-6 h-6 text-primary" />
      </button>
      
      <button
        onClick={onNext}
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-primary/15 hover:bg-primary/25 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110"
        aria-label="Next skill category"
      >
        <ChevronRight className="w-6 h-6 text-primary" />
      </button>
      
      {/* Mobile Navigation */}
      <div className="md:hidden absolute top-2 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
        <button
          onClick={onPrevious}
          className="p-2 bg-primary/15 hover:bg-primary/25 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Previous skill category"
        >
          <ChevronLeft className="w-5 h-5 text-primary" />
        </button>
        <div className="p-2 bg-primary/10 rounded-full backdrop-blur-sm">
          {React.createElement(skillCategories[currentIndex].icon, { 
            className: "w-6 h-6 text-primary" 
          })}
        </div>
        <button
          onClick={onNext}
          className="p-2 bg-primary/15 hover:bg-primary/25 rounded-full transition-colors backdrop-blur-sm"
          aria-label="Next skill category"
        >
          <ChevronRight className="w-5 h-5 text-primary" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
        {skillCategories.map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-primary scale-125' 
                : 'bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to ${skillCategories[index].title} skills`}
          />
        ))}
      </div>
    </>
  )
}