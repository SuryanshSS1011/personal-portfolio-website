"use client"

import { motion } from "framer-motion"
import { useMusicPlayer } from "@/components/providers/music-provider"
import { useMouseTracking, useReducedMotion } from "@/hooks"
import { useHeroAnimations } from "./hooks/useHeroAnimations"
import { HeroBackground } from "./HeroBackground"
import { HeroMusicDisc } from "./HeroMusicDisc"
import { HeroContent } from "./HeroContent"
import { HeroButtonGroup } from "./HeroButtonGroup"
import { ErrorBoundary, ScrollIndicator } from "@/components/atoms"

interface HeroSectionProps {
  onSectionClick: (sectionId: string) => void
}

export const HeroSection = ({ onSectionClick }: HeroSectionProps) => {
  const { showMusicPlayer, toggleMusic, isVisible: isMusicPlayerVisible, isPlaying: isGlobalMusicPlaying } = useMusicPlayer()
  const prefersReducedMotion = useReducedMotion()
  
  const { mousePosition, containerRef } = useMouseTracking({ 
    enabled: !prefersReducedMotion,
    normalize: true 
  })
  
  const { getBackgroundParallax, getMainContentParallax } = useHeroAnimations({ 
    mousePosition 
  })

  const handleMusicClick = () => {
    toggleMusic()
  }

  return (
    <ErrorBoundary>
      <section 
        ref={containerRef}
        id="hero" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        aria-label="Introduction and hero section"
      >
        <HeroBackground style={getBackgroundParallax()} />

        <div className="container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={getMainContentParallax()}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <HeroMusicDisc
              isGlobalMusicPlaying={isGlobalMusicPlaying}
              isMusicPlayerVisible={isMusicPlayerVisible}
              onMusicClick={handleMusicClick}
            />

            <HeroContent mousePosition={mousePosition} />
            
            <HeroButtonGroup onSectionClick={onSectionClick} />
            
            <ScrollIndicator targetId="about" />
          </motion.div>
        </div>
      </section>
    </ErrorBoundary>
  )
}