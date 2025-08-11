"use client"

import { useState, useEffect, lazy, Suspense } from "react"
import { Rocket, Users, Brain, Zap, Code, Target, Star, BookOpen } from "lucide-react"
import { 
  CustomCursor, 
  FloatingParticles, 
  ProgressBar,
  SectionSkeleton,
  ErrorBoundary
} from "@/components/atoms"
import { 
  Navigation,
  HeroSection,
  Footer
} from "@/components/organisms"
import { NavigationSection } from "@/types"
import { useReducedMotion } from "@/hooks"

// Lazy load heavy sections
const AboutSection = lazy(() => import("@/components/organisms").then(module => ({ default: module.AboutSection })))
const ResearchSection = lazy(() => import("@/components/organisms").then(module => ({ default: module.ResearchSection })))
const ExperienceSection = lazy(() => import("@/components/organisms").then(module => ({ default: module.ExperienceSection })))
const ProjectsSection = lazy(() => import("@/components/organisms").then(module => ({ default: module.ProjectsSection })))
const SkillsSection = lazy(() => import("@/components/organisms").then(module => ({ default: module.SkillsSection })))
const ActivitiesSection = lazy(() => import("@/components/organisms").then(module => ({ default: module.ActivitiesSection })))

export const PortfolioLayout = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isPlaying, setIsPlaying] = useState(true)
  const prefersReducedMotion = useReducedMotion()

  const sections: NavigationSection[] = [
    { id: "hero", label: "Home", icon: Rocket },
    { id: "about", label: "About", icon: Users },
    { id: "research", label: "Research", icon: Brain },
    { id: "experience", label: "Experience", icon: Zap },
    { id: "projects", label: "Projects", icon: Code },
    { id: "skills", label: "Skills", icon: Target },
    { id: "activities", label: "Activities", icon: Star },
    { id: "blogs", label: "Blog", icon: BookOpen, href: "/blogs" },
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
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" })
    }
  }

  // Disable animations if user prefers reduced motion
  const shouldShowAnimations = isPlaying && !prefersReducedMotion

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-background relative overflow-hidden">
        <CustomCursor />
        {shouldShowAnimations && <FloatingParticles />}
        <ProgressBar />
        
        <Navigation
          sections={sections}
          activeSection={activeSection}
          isPlaying={shouldShowAnimations}
          onSectionClick={scrollToSection}
          onToggleAnimation={() => setIsPlaying(!isPlaying)}
        />

        <HeroSection onSectionClick={scrollToSection} />
        
        <Suspense fallback={<SectionSkeleton height="300px" />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <ResearchSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <ExperienceSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <ProjectsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="500px" />}>
          <SkillsSection />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton height="400px" />}>
          <ActivitiesSection />
        </Suspense>
        
        <Footer />
      </div>
    </ErrorBoundary>
  )
}