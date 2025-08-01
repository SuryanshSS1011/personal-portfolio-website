"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { Button, TypingAnimation, ScrollIndicator } from "@/components/atoms"
import { Brain, Download, Linkedin, MapPin, Mail, Phone } from "lucide-react"
import { ContactItem, StaggeredList } from "@/components/molecules"

interface HeroSectionProps {
  onSectionClick: (sectionId: string) => void
}

export const HeroSection = ({ onSectionClick }: HeroSectionProps) => {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const contactItems = [
    { icon: MapPin, text: "State College, PA" },
    { icon: Mail, text: "sss6371@psu.edu" },
    { icon: Phone, text: "(929) 631-1429" },
  ]

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
      id="hero" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      aria-label="Introduction and hero section"
    >
      <motion.div style={{ y, opacity }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-secondary/20" />
      </motion.div>

      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-4xl font-bold text-primary-foreground mb-6 animate-glow relative overflow-hidden">
              <span className="text-4xl font-bold">SS</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
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
            className="text-xl md:text-2xl text-muted-foreground mb-8 h-16"
          >
            <TypingAnimation
              text="Full-Stack Developer | Multi-Domain AI Researcher | Published Author"
              className="inline-block"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <StaggeredList className="flex flex-wrap justify-center gap-4" staggerDelay={0.2}>
              {contactItems.map((item, index) => (
                <ContactItem
                  key={index}
                  icon={item.icon}
                  text={item.text}
                  index={0}
                />
              ))}
            </StaggeredList>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              icon={Brain}
              onClick={() => onSectionClick("research")}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View Research
            </Button>
            <Button
              icon={Download}
              onClick={handleDownloadCV}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              Download CV
            </Button>
            <Button
              icon={Linkedin}
              onClick={() => window.open("https://www.linkedin.com/in/suryansh-sijwali/", "_blank")}
              variant="outline"
              size="lg"
              className="border-primary text-primary hover:bg-primary/10"
            >
              LinkedIn
            </Button>
          </motion.div>

          <ScrollIndicator targetId="about" />
        </motion.div>
      </div>
    </section>
  )
}