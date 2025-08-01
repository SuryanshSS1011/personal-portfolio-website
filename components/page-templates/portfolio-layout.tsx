"use client"

import { useState, useEffect } from "react"
import { Rocket, Users, Brain, Zap, Code, Target, Star } from "lucide-react"
import { 
  CustomCursor, 
  FloatingParticles, 
  ProgressBar 
} from "@/components/atoms"
import { 
  Navigation,
  HeroSection,
  AboutSection,
  ResearchSection,
  ExperienceSection,
  ActivitiesSection,
  SkillsSection,
  ProjectsSection,
  Footer
} from "@/components/organisms"
import { NavigationSection } from "@/types/navigation"

export const PortfolioLayout = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isPlaying, setIsPlaying] = useState(true)

  const sections: NavigationSection[] = [
    { id: "hero", label: "Home", icon: Rocket },
    { id: "about", label: "About", icon: Users },
    { id: "research", label: "Research", icon: Brain },
    { id: "experience", label: "Experience", icon: Zap },
    { id: "projects", label: "Projects", icon: Code },
    { id: "skills", label: "Skills", icon: Target },
    { id: "activities", label: "Activities", icon: Star },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("section[id]")
      const scrollPos = window.scrollY + 100

      sections.forEach((section) => {
        const element = section as HTMLElement
        if (scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(element.id)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <CustomCursor />
      {isPlaying && <FloatingParticles />}
      <ProgressBar />
      
      <Navigation
        sections={sections}
        activeSection={activeSection}
        isPlaying={isPlaying}
        onSectionClick={scrollToSection}
        onToggleAnimation={() => setIsPlaying(!isPlaying)}
      />

      <HeroSection onSectionClick={scrollToSection} />
      <AboutSection />
      <ResearchSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <ActivitiesSection />
      <Footer />
    </div>
  )
}