"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button, ThemeToggle, AnimationToggle } from "@/components/atoms"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { NavigationItem } from "@/components/molecules"
import { NavigationSection } from "@/types/navigation"

interface NavigationProps {
  sections: NavigationSection[]
  activeSection: string
  isPlaying: boolean
  onSectionClick: (sectionId: string) => void
  onToggleAnimation: () => void
}

export const Navigation = ({ 
  sections, 
  activeSection, 
  isPlaying, 
  onSectionClick, 
  onToggleAnimation 
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSectionClick = (sectionId: string) => {
    onSectionClick(sectionId)
    setIsMenuOpen(false)
  }

  return (
    <nav 
      className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-primary/20 z-50"
      role="navigation" 
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Suryansh Sijwali
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {sections.map((section) => (
              <NavigationItem
                key={section.id}
                id={section.id}
                label={section.label}
                icon={section.icon}
                isActive={activeSection === section.id}
                onClick={handleSectionClick}
                href={section.href}
              />
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <AnimationToggle isPlaying={isPlaying} onToggle={onToggleAnimation} />

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 pb-4 border-t border-primary/20"
            >
              <div className="flex flex-col space-y-2 pt-4">
                {sections.map((section) => (
                  <NavigationItem
                    key={section.id}
                    id={section.id}
                    label={section.label}
                    icon={section.icon}
                    isActive={activeSection === section.id}
                    onClick={handleSectionClick}
                    href={section.href}
                    isMobile
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}