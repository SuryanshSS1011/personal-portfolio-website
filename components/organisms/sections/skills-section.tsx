"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SkillCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Code, Zap, Target, Smartphone, Cloud, ChevronLeft, ChevronRight } from "lucide-react"

export const SkillsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  const skillCategories = [
    {
      title: "Languages",
      skills: [
        { name: "Python", badge: "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" },
        { name: "TypeScript", badge: "https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" },
        { name: "Java", badge: "https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white" },
        { name: "C++", badge: "https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white" },
        { name: "Swift", badge: "https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white" },
        { name: "SQL", badge: "https://img.shields.io/badge/SQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" }
      ],
      icon: Code,
    },
    {
      title: "Frontend & Design",
      skills: [
        { name: "React", badge: "https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
        { name: "Next.js", badge: "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" },
        { name: "Redux", badge: "https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" },
        { name: "Tailwind CSS", badge: "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" },
        { name: "Material-UI", badge: "https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white" },
        { name: "Figma", badge: "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" }
      ],
      icon: Zap,
    },
    {
      title: "Backend & Database",
      skills: [
        { name: "Node.js", badge: "https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" },
        { name: "Spring Boot", badge: "https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" },
        { name: "PostgreSQL", badge: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" },
        { name: "MongoDB", badge: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" },
        { name: "Redis", badge: "https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" }
      ],
      icon: Target,
    },
    {
      title: "Mobile",
      skills: [
        { name: "React Native", badge: "https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" },
        { name: "Expo", badge: "https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" },
        { name: "Capacitor", badge: "https://img.shields.io/badge/Capacitor-119EFF?style=for-the-badge&logo=capacitor&logoColor=white" },
        { name: "Xcode", badge: "https://img.shields.io/badge/Xcode-007ACC?style=for-the-badge&logo=xcode&logoColor=white" }
      ],
      icon: Smartphone,
    },
    {
      title: "Cloud & DevOps",
      skills: [
        { name: "AWS", badge: "https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" },
        { name: "Docker", badge: "https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" },
        { name: "Kubernetes", badge: "https://img.shields.io/badge/Kubernetes-326CE5?style=for-the-badge&logo=kubernetes&logoColor=white" },
        { name: "GitHub Actions", badge: "https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white" },
        { name: "Terraform", badge: "https://img.shields.io/badge/Terraform-7B42BC?style=for-the-badge&logo=terraform&logoColor=white" }
      ],
      icon: Cloud,
    },
  ]

  // Auto rotation effect
  useEffect(() => {
    if (!isAutoRotating) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % skillCategories.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoRotating, skillCategories.length])

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % skillCategories.length)
    setIsAutoRotating(false)
    setTimeout(() => setIsAutoRotating(true), 5000) // Resume auto-rotation after 5s
  }

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + skillCategories.length) % skillCategories.length)
    setIsAutoRotating(false)
    setTimeout(() => setIsAutoRotating(true), 5000) // Resume auto-rotation after 5s
  }

  const getCardPosition = (index: number) => {
    const totalCards = skillCategories.length
    const angleStep = 360 / totalCards
    const currentAngle = (index - currentIndex) * angleStep
    
    // 3D cylindrical rotation - horizontal axis
    const radius = 450
    const angleRad = (currentAngle * Math.PI) / 180
    
    // X position (horizontal movement)
    const x = Math.sin(angleRad) * radius
    
    // Z position (depth into page)
    const z = Math.cos(angleRad) * radius
    
    // Y position (slight vertical variation)
    const y = Math.sin(angleRad * 2) * 20
    
    // DRAMATIC scale based on Z position (much bigger difference)
    const scale = 0.3 + (z + radius) / (radius * 2) * 1.4 // Scale from 0.3 (back) to 1.7 (front)
    
    // Rotation around Y axis for 3D effect
    const rotateY = currentAngle * 0.8
    
    // Opacity based on distance from center (more dramatic)
    const opacity = 0.2 + (scale - 0.3) / 1.4 * 0.8 // Opacity from 0.2 (back) to 1.0 (front)
    
    // Z-index based on Z position
    const zIndex = Math.round(z + radius)
    
    return { x, y, z, scale, rotateY, opacity, zIndex }
  }

  return (
    <SectionWrapper id="skills" title="Skills" maxWidth="full">
      <div className="relative h-[500px] flex items-start justify-center pt-8 overflow-hidden" style={{ perspective: '1200px' }}>
        {/* Navigation Arrows - Moved to Screen Edges */}
        <button
          onClick={prevCard}
          className="fixed left-0 top-[60%] transform -translate-y-1/2 z-50 p-3 bg-primary/15 hover:bg-primary/25 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110"
          aria-label="Previous skill category"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>
        
        <button
          onClick={nextCard}
          className="fixed right-0 top-[60%] transform -translate-y-1/2 z-50 p-3 bg-primary/15 hover:bg-primary/25 rounded-full transition-all duration-300 backdrop-blur-md shadow-lg hover:shadow-xl hover:scale-110"
          aria-label="Next skill category"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>

        {/* 3D Revolving Cards with Dramatic Scaling */}
        <div className="relative w-full h-full flex items-start justify-center pt-40" style={{ transformStyle: 'preserve-3d' }}>
          {skillCategories.map((category, index) => {
            const position = getCardPosition(index)
            const isCenter = index === currentIndex
            
            return (
              <motion.div
                key={index}
                className="absolute"
                initial={{ opacity: 0, scale: 0.3 }}
                animate={{
                  x: position.x,
                  y: position.y,
                  scale: position.scale,
                  opacity: position.opacity,
                  rotateY: position.rotateY,
                  z: position.z
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  duration: 1.5
                }}
                style={{
                  transformOrigin: "center center",
                  transformStyle: 'preserve-3d',
                  zIndex: position.zIndex
                }}
                onHoverStart={() => setIsAutoRotating(false)}
                onHoverEnd={() => setTimeout(() => setIsAutoRotating(true), 2000)}
              >
                <div 
                  className={`transition-all duration-500 ${
                    isCenter ? 'cursor-default' : 'cursor-pointer hover:scale-105'
                  }`}
                  onClick={() => !isCenter && setCurrentIndex(index)}
                  style={{
                    transform: `rotateY(${position.rotateY * 0.4}deg)`,
                    transformStyle: 'preserve-3d',
                    filter: isCenter ? 'none' : 'blur(1px)'
                  }}
                >
                  <SkillCard
                    title={category.title}
                    skills={category.skills}
                    icon={category.icon}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Auto-rotation indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
          <div className={`w-2 h-2 rounded-full ${isAutoRotating ? 'bg-primary animate-pulse' : 'bg-muted'}`} />
          <span>{isAutoRotating ? 'Auto-rotating' : 'Paused'}</span>
        </div>

        {/* Dots indicator */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-2">
          {skillCategories.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-primary scale-125' 
                  : 'bg-primary/30 hover:bg-primary/50'
              }`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}