"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Brain, Download } from "lucide-react"
import { Button } from "@/components/atoms"
import { logger } from "@/lib/logger"

interface HeroButtonGroupProps {
  onSectionClick: (sectionId: string) => void
}

export const HeroButtonGroup = ({ onSectionClick }: HeroButtonGroupProps) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)

  const handleDownloadCV = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'download', {
        event_category: 'engagement',
        event_label: 'CV Download',
        value: 1
      })
    }
    
    logger.userAction('cv_download', 'HeroButtonGroup')
    
    const link = document.createElement("a")
    link.href = "/Suryansh-Sijwali-CV.pdf"
    link.download = "Suryansh-Sijwali-CV.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleResearchClick = () => {
    logger.userAction('research_button_click', 'HeroButtonGroup')
    onSectionClick("research")
  }

  return (
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
            onClick={handleResearchClick}
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
  )
}