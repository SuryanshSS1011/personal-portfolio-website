"use client"

import { motion } from "framer-motion"
import { Play, Pause, Volume2 } from "lucide-react"

interface HeroMusicDiscProps {
  isGlobalMusicPlaying: boolean
  isMusicPlayerVisible: boolean
  onMusicClick: () => void
}

export const HeroMusicDisc = ({ 
  isGlobalMusicPlaying, 
  isMusicPlayerVisible, 
  onMusicClick 
}: HeroMusicDiscProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
      className="mb-6 relative mt-8 sm:mt-0"
    >
      {/* Musical Rotating Disc - Synced with Global Music Player */}
      <div className="relative w-40 h-40 mx-auto">
        {/* Outer rotating ring - spins faster when music is playing */}
        <motion.div
          className="absolute inset-0 border-2 border-primary/30 rounded-full cursor-pointer"
          animate={{ rotate: 360 }}
          transition={{
            duration: isGlobalMusicPlaying && isMusicPlayerVisible ? 3 : 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, hsl(var(--primary)) 50%, transparent 100%)"
          }}
          onClick={onMusicClick}
        />
        
        {/* Middle rotating ring - counter rotation, faster when playing */}
        <motion.div
          className="absolute inset-2 border border-secondary/40 rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: isGlobalMusicPlaying && isMusicPlayerVisible ? 2 : 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Inner disc with music controls - synced with global state */}
        <motion.div
          className="absolute inset-4 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground relative overflow-hidden cursor-pointer group"
          animate={{
            boxShadow: isGlobalMusicPlaying && isMusicPlayerVisible ? [
              "0 0 20px rgba(var(--primary-rgb), 0.5)",
              "0 0 40px rgba(var(--primary-rgb), 0.8)",
              "0 0 20px rgba(var(--primary-rgb), 0.5)"
            ] : [
              "0 0 20px rgba(var(--primary-rgb), 0.3)",
              "0 0 30px rgba(var(--primary-rgb), 0.5)",
              "0 0 20px rgba(var(--primary-rgb), 0.3)"
            ]
          }}
          transition={{
            duration: isGlobalMusicPlaying && isMusicPlayerVisible ? 2 : 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          onClick={onMusicClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Music Control Icon - shows current state */}
          <motion.div
            animate={isGlobalMusicPlaying && isMusicPlayerVisible ? {
              scale: [1, 1.2, 1]
            } : {
              rotate: [0, -10, 10, 0]
            }}
            transition={{ 
              duration: isGlobalMusicPlaying && isMusicPlayerVisible ? 0.6 : 0.4,
              repeat: isGlobalMusicPlaying && isMusicPlayerVisible ? Infinity : 1
            }}
            className="flex items-center justify-center"
          >
            {isGlobalMusicPlaying && isMusicPlayerVisible ? (
              <Pause className="h-8 w-8" />
            ) : (
              <Play className="h-8 w-8 ml-1" />
            )}
          </motion.div>
          
          {/* Sound waves animation when playing globally */}
          {isGlobalMusicPlaying && isMusicPlayerVisible && (
            <>
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={`wave-${i}`}
                  className="absolute border-2 border-primary-foreground/30 rounded-full"
                  initial={{ 
                    width: "100%", 
                    height: "100%", 
                    opacity: 0.6 
                  }}
                  animate={{
                    width: ["100%", "150%", "200%"],
                    height: ["100%", "150%", "200%"],
                    opacity: [0.6, 0.3, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.6,
                    ease: "easeOut"
                  }}
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
        
        {/* Floating music notes - always show on hover, extra when playing */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isGlobalMusicPlaying && isMusicPlayerVisible ? 0.6 : 0 
          }}
          whileHover={{ opacity: 1 }}
        >
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`note-${i}`}
              className="absolute text-primary/40 text-sm"
              style={{
                top: "50%",
                left: "50%",
                fontSize: "14px"
              }}
              animate={{
                x: [0, Math.cos(i * 90 * Math.PI / 180) * 40],
                y: [0, Math.sin(i * 90 * Math.PI / 180) * 40],
                opacity: [0, 0.8, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: isGlobalMusicPlaying && isMusicPlayerVisible ? 2 : 3,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            >
              ♪
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Music status indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-2 text-xs text-muted-foreground flex items-center justify-center gap-2"
      >
        <Volume2 className="h-3 w-3" />
        <span>
          {isGlobalMusicPlaying && isMusicPlayerVisible 
            ? "♫ Melodies flowing, creativity growing ♫" 
            : isMusicPlayerVisible 
            ? "Ready to compose your soundtrack" 
            : "Click to orchestrate your experience"}
        </span>
      </motion.div>
    </motion.div>
  )
}