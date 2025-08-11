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
  Footer
} from "@/components/organisms"
import { BlogsSection } from "@/components/organisms/sections/blogs-section"
import { NavigationSection, BlogPostMeta } from "@/types"

interface BlogsLayoutProps {
  blogPosts: BlogPostMeta[]
}

export const BlogsLayout = ({ blogPosts }: BlogsLayoutProps) => {
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
      <FloatingParticles />
      
      <ProgressBar />
      
      <Navigation
        sections={sections}
        activeSection={activeSection}
        isPlaying={isPlaying}
        onSectionClick={scrollToSection}
        onToggleAnimation={() => setIsPlaying(!isPlaying)}
      />

      <div className="pt-16">
        <BlogsSection blogPosts={blogPosts} />
      </div>
      <Footer />
    </div>
  )
}