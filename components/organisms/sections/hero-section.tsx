"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import { Button, TypingAnimation, ScrollIndicator, CyclingRoles } from "@/components/atoms"
import { Brain, Download, Play, Pause, Volume2 } from "lucide-react"
import { ContactItem, StaggeredList } from "@/components/molecules"
import { useMusicPlayer } from "@/components/providers/music-provider"

interface HeroSectionProps {
  onSectionClick: (sectionId: string) => void
}

export const HeroSection = ({ onSectionClick }: HeroSectionProps) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLElement>(null)
  const { showMusicPlayer, toggleMusic, isVisible: isMusicPlayerVisible, isPlaying: isGlobalMusicPlaying } = useMusicPlayer()

  // Mouse tracking for subtle parallax effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const x = (e.clientX - centerX) / rect.width
        const y = (e.clientY - centerY) / rect.height
        setMousePosition({ x, y })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleMusicClick = () => {
    toggleMusic()
  }

  const handleDownloadCV = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        event_category: 'engagement',
        event_label: 'CV Download',
        value: 1
      })
    }
    
    const link = document.createElement("a")
    link.href = "/Suryansh-Sijwali-CV.pdf"
    link.download = "Suryansh-Sijwali-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Introduction and hero section"
    >
      <motion.div 
        style={{ 
          y, 
          opacity,
          x: mousePosition.x * 10,
        }} 
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
        
        {/* Floating background elements with mouse tracking */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * 20,
            y: mousePosition.y * 15,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-secondary/10 rounded-full blur-xl"
          animate={{
            x: mousePosition.x * -15,
            y: mousePosition.y * -20,
          }}
          transition={{ type: "spring", stiffness: 40, damping: 25 }}
        />
        <motion.div
          className="absolute top-1/2 left-3/4 w-20 h-20 bg-primary/5 rounded-full blur-lg"
          animate={{
            x: mousePosition.x * 25,
            y: mousePosition.y * 10,
          }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        />
      </motion.div>


      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            x: mousePosition.x * 5,
          }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6 relative mt-4 sm:mt-0"
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
                onClick={handleMusicClick}
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
                onClick={handleMusicClick}
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
              Suryansh Sijwali
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground mb-4 h-20 md:h-24 flex items-center justify-center"
          >
            <CyclingRoles
              roles={[
                "Full-Stack Developer",
                "Multi-Domain AI Researcher", 
                "Systems Thinker",
                "Published Author",
                "SaaS Designer"
              ]}
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
              Architecting intelligent systems that solve complex problems — where research meets implementation and user experience drives innovation
            </p>
          </motion.div>


          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {/* Research Button with Tooltip */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredButton("research")}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Button
                  icon={Brain}
                  onClick={() => onSectionClick("research")}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                >
                  <motion.span
                    className="relative z-10"
                    animate={hoveredButton === "research" ? { x: [-2, 2, -2, 0] } : { x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    View Research
                  </motion.span>
                  
                  {/* Expanding background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-secondary/30 to-primary/30"
                    initial={{ x: "-100%" }}
                    animate={hoveredButton === "research" ? { x: "0%" } : { x: "-100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </Button>
              </motion.div>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={hoveredButton === "research" ? 
                  { opacity: 1, y: -10, scale: 1 } : 
                  { opacity: 0, y: 10, scale: 0.8 }
                }
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg text-sm text-foreground whitespace-nowrap pointer-events-none z-20"
              >
                <div className="font-medium">2+ Research Projects</div>
                <div className="text-xs text-muted-foreground">AI, Technology, Linguistics</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-background/95"></div>
              </motion.div>
            </div>

            {/* CV Button with Tooltip */}
            <div className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onHoverStart={() => setHoveredButton("cv")}
                onHoverEnd={() => setHoveredButton(null)}
              >
                <Button
                  icon={Download}
                  onClick={handleDownloadCV}
                  variant="outline"
                  size="lg"
                  className="border-primary text-primary hover:bg-primary/10 relative overflow-hidden transition-all duration-300"
                >
                  <motion.span
                    className="relative z-10"
                    animate={hoveredButton === "cv" ? { rotate: [0, -3, 3, 0] } : { rotate: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    Download CV
                  </motion.span>
                  
                  {/* Expanding background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10"
                    initial={{ scale: 0 }}
                    animate={hoveredButton === "cv" ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ borderRadius: "inherit" }}
                  />
                </Button>
              </motion.div>
              
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={hoveredButton === "cv" ? 
                  { opacity: 1, y: -10, scale: 1 } : 
                  { opacity: 0, y: 10, scale: 0.8 }
                }
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-background/95 backdrop-blur-sm border border-primary/20 rounded-lg shadow-lg text-sm text-foreground whitespace-nowrap pointer-events-none z-20"
              >
                <div className="font-medium">Latest Resume</div>
                <div className="text-xs text-muted-foreground">Updated January 2025</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-background/95"></div>
              </motion.div>
            </div>
          </motion.div>

          <ScrollIndicator targetId="about" />
        </motion.div>
      </div>
    </section>
  )
}