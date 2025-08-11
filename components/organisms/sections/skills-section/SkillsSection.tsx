"use client"

import { SectionWrapper } from "@/components/organisms"
import { skillCategories } from "@/data/skills"
import { useSkillsRotation, useTouchGestures, useReducedMotion } from "@/hooks"
import { SkillsCarousel } from "./SkillsCarousel"
import { SkillsMobileView } from "./SkillsMobileView"
import { SkillsNavigation } from "./SkillsNavigation"
import { SkillsStatusIndicator } from "./SkillsStatusIndicator"
import { ErrorBoundary } from "@/components/atoms/error-handling"
import { logger } from "@/lib/logger"

export const SkillsSection = () => {
  const prefersReducedMotion = useReducedMotion()
  
  const {
    currentIndex,
    isAutoRotating,
    nextItem,
    prevItem,
    goToItem,
    temporarilyPause
  } = useSkillsRotation({
    totalItems: skillCategories.length,
    autoRotateInterval: prefersReducedMotion ? 5000 : 3000, // Slower when reduced motion is preferred
    pauseOnInteraction: 5000
  })

  const touchHandlers = useTouchGestures({
    minSwipeDistance: 50,
    onSwipeLeft: nextItem,
    onSwipeRight: prevItem,
    disabled: prefersReducedMotion
  })

  const handleHoverStart = () => {
    if (!prefersReducedMotion) {
      temporarilyPause(2000)
    }
    logger.userAction('skills_hover_start', 'SkillsSection', { 
      currentIndex, 
      category: skillCategories[currentIndex]?.title 
    })
  }

  const handleHoverEnd = () => {
    if (!prefersReducedMotion) {
      temporarilyPause(2000)
    }
  }

  const handleCardClick = (index: number) => {
    goToItem(index)
    logger.userAction('skills_card_click', 'SkillsSection', { 
      targetIndex: index,
      category: skillCategories[index]?.title 
    })
  }

  return (
    <ErrorBoundary>
      <SectionWrapper id="skills" title="Skills" maxWidth="6xl">
        <div 
          className="relative h-[400px] md:h-[500px] flex items-start justify-center pt-8 overflow-hidden"
          style={{ perspective: prefersReducedMotion ? 'none' : '1200px' }}
          {...touchHandlers}
        >
          <SkillsNavigation
            skillCategories={skillCategories}
            currentIndex={currentIndex}
            onPrevious={prevItem}
            onNext={nextItem}
            onGoToIndex={goToItem}
          />
          
          {/* Desktop: 3D Revolving Cards */}
          <SkillsCarousel
            skillCategories={skillCategories}
            currentIndex={currentIndex}
            onHoverStart={handleHoverStart}
            onHoverEnd={handleHoverEnd}
            onCardClick={handleCardClick}
          />
          
          {/* Mobile: Simple Card Display */}
          <SkillsMobileView
            skillCategories={skillCategories}
            currentIndex={currentIndex}
          />

          <SkillsStatusIndicator isAutoRotating={isAutoRotating} />
        </div>
      </SectionWrapper>
    </ErrorBoundary>
  )
}