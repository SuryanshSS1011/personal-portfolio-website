"use client"

import { useState, useEffect } from "react"
import { BookOpen, Home } from "lucide-react"
import { 
  CustomCursor, 
  FloatingParticles, 
  ProgressBar 
} from "@/components/atoms"
import { 
  Navigation,
  BlogsSection,
  Footer
} from "@/components/organisms"
import { NavigationSection } from "@/types/navigation"

export const BlogsLayout = () => {
  const [activeSection, setActiveSection] = useState("blogs")
  const [isPlaying, setIsPlaying] = useState(true)

  const sections: NavigationSection[] = [
    { id: "home", label: "Home", icon: Home, href: "/" },
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
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      
      {/* Enhanced blog-specific floating particles */}
      <FloatingParticles 
        count={45}
        className="z-[-10]"
        colors={[
          "hsl(var(--primary))/20",
          "hsl(var(--secondary))/15",
          "hsl(var(--primary))/10",
          "hsl(var(--secondary))/25",
          "hsl(var(--muted-foreground))/8"
        ]}
        sizeRange={[1, 8]}
        opacityRange={[0.1, 0.35]}
        durationRange={[20, 45]}
      />
      
      {isPlaying && (
        <FloatingParticles 
          count={25}
          className="z-[-10]"
          colors={[
            "hsl(var(--primary))/40",
            "hsl(var(--secondary))/30"
          ]}
          sizeRange={[2, 5]}
          opacityRange={[0.2, 0.5]}
          durationRange={[8, 18]}
        />
      )}
      
      <ProgressBar />
      
      <Navigation
        sections={sections}
        activeSection={activeSection}
        isPlaying={isPlaying}
        onSectionClick={scrollToSection}
        onToggleAnimation={() => setIsPlaying(!isPlaying)}
      />

      <div className="pt-16">
        <BlogsSection />
      </div>
      <Footer />
    </div>
  )
}