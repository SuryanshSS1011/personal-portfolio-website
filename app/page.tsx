"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Mail,
  Phone,
  Linkedin,
  MapPin,
  GraduationCap,
  Code,
  Award,
  Users,
  ExternalLink,
  Download,
  Moon,
  Sun,
  Menu,
  X,
  Star,
  Zap,
  Target,
  TrendingUp,
  BookOpen,
  Coffee,
  Rocket,
  Brain,
  Github,
  ChevronDown,
  Play,
  Pause,
} from "lucide-react"

// Floating particles component
const FloatingParticles = () => {
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight })

      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight })
      }

      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" suppressHydrationWarning>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-primary/20 rounded-full"
          initial={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          animate={{
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
          }}
          transition={{
            duration: Math.random() * 10 + 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}
    </div>
  )
}

// Typing animation component
const TypingAnimation = ({ text, className = "" }: { text: string; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, mounted])

  return (
    <span className={className} suppressHydrationWarning>
      {mounted ? displayText : text}
      {mounted && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY }}
          className="inline-block w-0.5 h-6 bg-primary ml-1"
        />
      )}
    </span>
  )
}

// Interactive timeline component
const TimelineItem = ({
  title,
  description,
  date,
  isLeft = false,
}: {
  title: string
  description: string
  date: string
  isLeft?: boolean
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center gap-4 ${isLeft ? "flex-row-reverse" : ""}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : ""}`}>
        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
          <CardHeader>
            <CardTitle className="text-primary">{title}</CardTitle>
            <CardDescription>{date}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm">{description}</p>
          </CardContent>
        </Card>
      </div>
      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
      <div className="flex-1" />
    </motion.div>
  )
}

// Stats counter component
const StatsCounter = ({ end, label, suffix = "" }: { end: number; label: string; suffix?: string }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let start = 0
      const increment = end / 100
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 20)
      return () => clearInterval(timer)
    }
  }, [isInView, end])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <div className="text-3xl font-bold text-primary">
        {count}
        {suffix}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

// Interactive skill card
const SkillCard = ({ title, skills, icon: Icon }: { title: string; skills: string[]; icon: any }) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="group hover:shadow-xl transition-all duration-300 hover:scale-105 border-primary/20 hover:border-primary/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Icon className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1 }}
                onHoverStart={() => setHoveredSkill(skill)}
                onHoverEnd={() => setHoveredSkill(null)}
              >
                <Badge
                  variant="secondary"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredSkill === skill
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : "hover:bg-primary/20"
                  }`}
                >
                  {skill}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}



export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const sections = [
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
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Custom cursor */}
      <motion.div
        className="fixed w-6 h-6 bg-primary/30 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{ x: mousePosition.x - 12, y: mousePosition.y - 12 }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* Floating particles */}
      {isPlaying && <FloatingParticles />}

      {/* Progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Navigation */}
      <nav 
        className="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-primary/20 z-40"
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
              {sections.map((section) => {
                const Icon = section.icon
                return (
                  <motion.button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="h-4 w-4" />
                    {section.label}
                  </motion.button>
                )
              })}
            </div>

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-primary/20 relative overflow-hidden group"
                aria-label={mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
                suppressHydrationWarning
              >
                {mounted ? (
                  <div className="relative w-4 h-4">
                    <Sun
                      className={`absolute h-4 w-4 transition-all duration-500 ${
                        theme === "dark" ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
                      }`}
                    />
                    <Moon
                      className={`absolute h-4 w-4 transition-all duration-500 ${
                        theme === "dark" ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-0"
                      }`}
                    />
                  </div>
                ) : (
                  <div className="relative w-4 h-4">
                    <Sun className="absolute h-4 w-4" />
                  </div>
                )}
                <span className="sr-only" suppressHydrationWarning>
                  {mounted ? (theme === "dark" ? "Switch to light mode" : "Switch to dark mode") : "Toggle theme"}
                </span>
                <span className="absolute inset-0 rounded-full bg-primary/10 transform scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
                className="hover:bg-primary/20"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

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
                  {sections.map((section) => {
                    const Icon = section.icon
                    return (
                      <motion.button
                        key={section.id}
                        onClick={() => scrollToSection(section.id)}
                        className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors ${
                          activeSection === section.id ? "bg-primary text-primary-foreground" : "hover:bg-primary/10"
                        }`}
                        whileHover={{ x: 10 }}
                      >
                        <Icon className="h-4 w-4" />
                        {section.label}
                      </motion.button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
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
                {/* Placeholder for future profile image */}
                <span className="text-4xl font-bold">SS</span>
                {/* TODO: Replace with actual headshot using Next.js Image component
                <Image
                  src="/profile-photo.jpg"
                  alt="Suryansh Sijwali"
                  width={128}
                  height={128}
                  className="rounded-full object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkrHB0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyEkjE4/wB1dFLIpREVs7VY4ZU2KuAHI9CtpQCAJBPaOHlRy8V9/eqiwYXLXrfEJKrCLFAFJSEZBY="
                />
                */}
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
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              {[
                { icon: MapPin, text: "State College, PA" },
                { icon: Mail, text: "sss6371@psu.edu" },
                { icon: Phone, text: "(929) 631-1429" },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-2 text-sm bg-primary/10 px-4 py-2 rounded-full border border-primary/20"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(212, 175, 55, 0.2)" }}
                >
                  <item.icon className="h-4 w-4 text-primary" />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Button
                onClick={() => scrollToSection("research")}
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Brain className="h-4 w-4 mr-2" />
                View Research
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  // Analytics tracking
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
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Download CV
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => window.open("https://www.linkedin.com/in/suryansh-sijwali/", "_blank")}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12">
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="cursor-pointer"
                onClick={() => scrollToSection("about")}
              >
                <ChevronDown className="h-8 w-8 text-primary mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section 
        id="about" 
        className="py-20"
        aria-labelledby="about-heading"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <motion.h2
              id="about-heading"
              className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              whileInView={{ scale: [0.8, 1.1, 1] }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              About Me
            </motion.h2>

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              <StatsCounter end={3} label="Years Experience" suffix="+" />
              <StatsCounter end={5} label="Projects Completed" suffix="+" />
              <StatsCounter end={1} label="Research Publications" />
              <StatsCounter end={8} label="Technologies Mastered" suffix="+" />
            </div>


            <div className="grid md:grid-cols-3 gap-8">
              <Card className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <motion.div whileHover={{ x: 10 }} transition={{ type: "spring", stiffness: 300 }}>
                      <h3 className="font-semibold">Bachelor of Science Degree</h3>
                      <p className="text-muted-foreground">The Pennsylvania State University</p>
                      <p className="text-sm text-muted-foreground">Expected May 2027</p>
                    </motion.div>

                    <div>
                      <h4 className="font-medium">Majors:</h4>
                      <p className="text-sm">Computer Science, Physics (Computational)</p>
                    </div>

                    <div>
                      <h4 className="font-medium">Minors:</h4>
                      <p className="text-sm">
                        Computer Engineering, Mathematics, Cybersecurity Computational Foundations
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium">Honors:</h4>
                      <div className="flex flex-wrap gap-2 mt-1">
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          Dean's List (All Semesters)
                        </Badge>
                        <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                          President Walker Award
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Award className="h-5 w-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Published Research",
                        desc: "Accepted at IEEE AITest 2025 with 31.6% acceptance rate",
                        icon: BookOpen,
                      },
                      {
                        title: "Multi-Domain Innovation",
                        desc: "Solving problems through projects like Wynlabs.ai and the UAV-based Disaster Management process",
                        icon: Rocket,
                      },
                      {
                        title: "Leadership",
                        desc: "President of Cyber-Lions Club, IEEE Lead Assistant",
                        icon: Users,
                      },
                    ].map((achievement, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <achievement.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-muted-foreground">{achievement.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Coffee className="h-5 w-5" />
                    Outside Tech
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Playing Music",
                        desc: "Exploring various instruments and musical styles",
                        icon: Star,
                      },
                      {
                        title: "Songwriting",
                        desc: "Creating original compositions and lyrics",
                        icon: BookOpen,
                      },
                      {
                        title: "Learning Languages & Linguistics",
                        desc: "Studying language structures and cultural connections",
                        icon: Brain,
                      },
                      {
                        title: "Documentaries",
                        desc: "Watching science, history, and cultural documentaries",
                        icon: TrendingUp,
                      },
                    ].map((hobby, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors"
                      >
                        <hobby.icon className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold">{hobby.title}</h3>
                          <p className="text-sm text-muted-foreground">{hobby.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Research
            </h2>

            <Tabs defaultValue="published" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-primary/10 border border-primary/20">
                <TabsTrigger
                  value="published"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Published
                </TabsTrigger>
                <TabsTrigger
                  value="ongoing"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Ongoing/Unpublished
                </TabsTrigger>
              </TabsList>

              <TabsContent value="published" className="space-y-8">
              <motion.div whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">
                          Fixing Performance Bugs Through LLM Explanations
                        </CardTitle>
                        <CardDescription>Jan 2025 - Jul 2025</CardDescription>
                      </div>
                      <Badge variant="default" className="bg-primary text-primary-foreground animate-pulse-gold">
                        Published
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Authors:</strong> Suryansh Singh Sijwali, Angela Marie Colom, Anbi Guo, and Suman Saha
                      </p>
                      <p className="text-sm">
                        <strong>Accepted at:</strong> IEEE AITest 2025 (CISOSE) • Acceptance Rate: 31.6%
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Key Achievements:</h4>
                          {[
                            "Created novel LLM-powered framework for performance bug detection",
                            "Built dataset of 490 Java performance bugs",
                            "Achieved 83.7% accuracy in bug detection",
                            "Outperformed baseline models by over 12%",
                          ].map((achievement, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Star className="h-4 w-4 text-primary flex-shrink-0" />
                              {achievement}
                            </motion.div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Technical Impact:</h4>
                          {[
                            "Developed 5-category bug taxonomy",
                            "79.6% efficacy in code improvement suggestions",
                            "87.8% correctness in recommendations",
                            "Applied LLM fine-tuning and prompt engineering",
                          ].map((impact, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.4 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                              {impact}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Project Extension Section */}
                </Card>
              </motion.div>
              </TabsContent>

              <TabsContent value="ongoing" className="space-y-8">
              {/* UAV Research Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-primary">UAV-based Disaster Management Research</CardTitle>
                        <CardDescription>Jun 2024 - Jul 2024</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-primary/30 text-primary">
                        Extension Planned After Further Coursework
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm">
                        <strong>Research Focus:</strong> Multidisciplinary project designing autonomous UAV-based
                        disaster mitigation systems for emergency response and recovery operations
                      </p>
                      <p className="text-sm">
                        <strong>Collaboration:</strong> Cross-functional team including aerospace engineers, computer
                        scientists, and emergency management specialists
                      </p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Technical Components:</h4>
                          {[
                            "LiDAR sensor integration for 3D environmental mapping",
                            "SLAM (Simultaneous Localization and Mapping) algorithms",
                            "Real-time object detection and classification systems",
                            "Autonomous navigation in GPS-denied environments",
                          ].map((component, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Zap className="h-4 w-4 text-primary flex-shrink-0" />
                              {component}
                            </motion.div>
                          ))}
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-medium mb-2 text-primary">Applications & Impact:</h4>
                          {[
                            "Search and rescue operations in disaster zones",
                            "Rapid damage assessment and mapping",
                            "Supply delivery to inaccessible areas",
                            "Real-time situational awareness for first responders",
                          ].map((application, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 + 0.4 }}
                              viewport={{ once: true }}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <Target className="h-4 w-4 text-primary flex-shrink-0" />
                              {application}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-primary/5 rounded-lg p-4 border border-primary/20 mt-4">
                        <h4 className="font-medium mb-2 text-primary">Research Outcomes:</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>
                              Developed prototype UAV system with integrated sensor suite for disaster response
                              scenarios
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Brain className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>
                              Implemented machine learning algorithms for automated debris detection and path planning
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Users className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                            <span>
                              Collaborated with emergency management professionals to validate real-world applicability
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Experience
            </h2>

            <Tabs defaultValue="internships" className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-primary/10 border border-primary/20">
                <TabsTrigger
                  value="internships"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Internships
                </TabsTrigger>
                <TabsTrigger
                  value="teaching"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Teaching & Mentoring
                </TabsTrigger>
                <TabsTrigger
                  value="externships"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Externships
                </TabsTrigger>
                <TabsTrigger
                  value="timeline"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Timeline
                </TabsTrigger>
                <TabsTrigger
                  value="github"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  GitHub
                </TabsTrigger>
              </TabsList>

              <TabsContent value="timeline" className="space-y-8">
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-0.5 w-0.5 h-full bg-primary/20"></div>
                  <div className="space-y-12">
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-1 text-right">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                          <CardContent className="p-4">
                            <button
                              onClick={() => {
                                // Switch to internships tab and scroll to specific card
                                const internshipsTab = document.querySelector('[value="internships"]') as HTMLElement;
                                if (internshipsTab) {
                                  internshipsTab.click();
                                  setTimeout(() => {
                                    const card = document.getElementById('leechy-internship');
                                    if (card) {
                                      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="text-primary hover:text-primary/80 transition-colors font-semibold text-left w-full"
                            >
                              Software Engineer (Intern)
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">Jun 2025 - Present</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                      <div className="flex-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 flex-row-reverse"
                    >
                      <div className="flex-1 text-left">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                          <CardContent className="p-4">
                            <button
                              onClick={() => {
                                // Switch to externships tab and scroll to specific card
                                const externshipsTab = document.querySelector('[value="externships"]') as HTMLElement;
                                if (externshipsTab) {
                                  externshipsTab.click();
                                  setTimeout(() => {
                                    const card = document.getElementById('outamation-externship');
                                    if (card) {
                                      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="text-primary hover:text-primary/80 transition-colors font-semibold text-left w-full"
                            >
                              AI & Automation Engineer (Extern)
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">May 2025 - Jul 2025</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                      <div className="flex-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-1 text-right">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                          <CardContent className="p-4">
                            <button
                              onClick={() => {
                                // Switch to teaching tab and scroll to specific card
                                const teachingTab = document.querySelector('[value="teaching"]') as HTMLElement;
                                if (teachingTab) {
                                  teachingTab.click();
                                  setTimeout(() => {
                                    const card = document.getElementById('jumpstart-mentor');
                                    if (card) {
                                      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="text-primary hover:text-primary/80 transition-colors font-semibold text-left w-full"
                            >
                              Jump Start Program Mentor
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">May 2025 - Jun 2025</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                      <div className="flex-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 flex-row-reverse"
                    >
                      <div className="flex-1 text-left">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                          <CardContent className="p-4">
                            <button
                              onClick={() => {
                                // Switch to internships tab and scroll to specific card
                                const internshipsTab = document.querySelector('[value="internships"]') as HTMLElement;
                                if (internshipsTab) {
                                  internshipsTab.click();
                                  setTimeout(() => {
                                    const card = document.getElementById('flourish-internship');
                                    if (card) {
                                      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="text-primary hover:text-primary/80 transition-colors font-semibold text-left w-full"
                            >
                              Full-Stack Mobile App Developer (Intern)
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">Feb 2025 - Jun 2025</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                      <div className="flex-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4"
                    >
                      <div className="flex-1 text-right">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                          <CardContent className="p-4">
                            <button
                              onClick={() => {
                                // Switch to teaching tab and scroll to specific card
                                const teachingTab = document.querySelector('[value="teaching"]') as HTMLElement;
                                if (teachingTab) {
                                  teachingTab.click();
                                  setTimeout(() => {
                                    const card = document.getElementById('eecs-mentor');
                                    if (card) {
                                      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="text-primary hover:text-primary/80 transition-colors font-semibold text-left w-full"
                            >
                              EECS Peer Mentor
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">Jan 2025 - May 2025</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                      <div className="flex-1" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-4 flex-row-reverse"
                    >
                      <div className="flex-1 text-left">
                        <Card className="hover:shadow-lg transition-shadow duration-300 border-primary/20">
                          <CardContent className="p-4">
                            <button
                              onClick={() => {
                                // Switch to teaching tab and scroll to specific card
                                const teachingTab = document.querySelector('[value="teaching"]') as HTMLElement;
                                if (teachingTab) {
                                  teachingTab.click();
                                  setTimeout(() => {
                                    const card = document.getElementById('peer-tutor');
                                    if (card) {
                                      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }
                                  }, 100);
                                }
                              }}
                              className="text-primary hover:text-primary/80 transition-colors font-semibold text-left w-full"
                            >
                              Peer Tutor
                            </button>
                            <p className="text-xs text-muted-foreground mt-1">Aug 2024 - Dec 2024</p>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg animate-pulse-gold" />
                      <div className="flex-1" />
                    </motion.div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="internships" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card id="leechy-internship" className="hover:shadow-xl transition-all duration-300 border-primary/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-primary">Software Engineer (Intern)</CardTitle>
                          <CardDescription>Leechy LLC • Jun 2025 - Present (Remote)</CardDescription>
                        </div>
                        <Badge className="bg-success/20 text-success border-success/30">Current</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Led a full UI/UX redesign of the Leechy mobile app (Capacitor + React), applying atomic design patterns and a centralized theming system to boost consistency and developer productivity",
                          "Performed end-to-end QA analysis and performance profiling, uncovering critical bottlenecks in rendering and network workflows",
                          "Engineered and deployed optimization strategies—code-splitting, asset compression, and lazy loading—that cut key screen load times by 80%",
                          "Designed, trained, and integrated a personalized Leechy AI chatbot into the mobile app, building NLP pipelines and fine-tuning language models to deliver contextual, on-demand user support",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <Coffee className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card id="flourish-internship" className="hover:shadow-xl transition-all duration-300 border-primary/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-primary">Full-Stack Mobile App Developer (Intern)</CardTitle>
                          <CardDescription>Flourish: Grow with Self-Care • Feb 2025 - Jun 2025</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Collaborated with design team to implement frontend UI elements from Figma wireframes",
                          "Developed, tested, and maintained frontend code for seamless user experience across iOS and Android",
                          "Assisted with backend architecture, database design, and API integration",
                          "Optimized application for performance, scalability, and reliability",
                          "Coordinated with cross-functional teams to iterate features based on user feedback",
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <Coffee className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="teaching" className="space-y-6">
                {[
                  {
                    title: "Jump Start Program Mentor",
                    org: "Center for Engineering Outreach and Inclusion, Penn State",
                    date: "May 2025 - Jun 2025",
                    items: [
                      "Serve as Teaching Assistant and facilitator for PHYS 212 (Electricity and Magnetism)",
                      "Provide academic and social mentorship to incoming engineering students",
                      "Collaborate with instructors, peers, and program staff on planning and student support",
                    ],
                  },
                  {
                    title: "Peer Tutor",
                    org: "Russell E. Horn Sr. Learning Center, Penn State Harrisburg",
                    date: "Aug 2024 - Dec 2024",
                    items: [
                      "Tutored Mathematics, Physics, and Computer Science students one-on-one and in small groups",
                      "Created tailored academic resources and strategies for student success",
                    ],
                  },
                  {
                    title: "EECS Peer Mentor",
                    org: "Penn State University",
                    date: "Jan 2025 - May 2025",
                    items: ["Mentored five first-year students in EECS through structured academic support"],
                  },
                ].map((experience, expIndex) => {
                  const cardIds = ["jumpstart-mentor", "peer-tutor", "eecs-mentor"];
                  return (
                  <motion.div
                    key={expIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: expIndex * 0.1 }}
                  >
                    <Card id={cardIds[expIndex]} className="hover:shadow-xl transition-all duration-300 border-primary/20">
                      <CardHeader>
                        <CardTitle className="text-primary">{experience.title}</CardTitle>
                        <CardDescription>
                          {experience.org} • {experience.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {experience.items.map((item, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2"
                            >
                              <BookOpen className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                  );
                })}
              </TabsContent>

              <TabsContent value="externships" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card id="outamation-externship" className="hover:shadow-xl transition-all duration-300 border-primary/20">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-primary">AI & Automation Engineer (Extern)</CardTitle>
                          <CardDescription>Outamation • May 2025 - Jul 2025 (Remote)</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2 text-sm">
                        {[
                          "Built AI-powered document-classification and data-extraction pipelines using Python (PyMuPDF, OCR), NLP and computer-vision techniques to automate processing of large mortgage document sets",
                          "Developed a Retrieval-Augmented Generation (RAG) search system with LlamaIndex, improving information-retrieval accuracy by benchmarking and tuning open-source AI models",
                          "Designed and executed model-evaluation and performance-optimization experiments, identifying best-fit architectures and hyperparameter settings for production readiness",
                          "Compiled a comprehensive technical analysis report, synthesizing key challenges, optimization strategies, and deployment recommendations to guide future AI workflow development"
                        ].map((item, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>

              <TabsContent value="github" className="space-y-6">
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Github className="h-5 w-5" />
                      Development Activity
                    </CardTitle>
                    <CardDescription>
                      Live contribution data from GitHub
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">450+</div>
                        <div className="text-sm text-muted-foreground">Contributions this year</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">12+</div>
                        <div className="text-sm text-muted-foreground">Public repositories</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">8+</div>
                        <div className="text-sm text-muted-foreground">Languages used</div>
                      </div>
                    </div>

                    {/* GitHub Contribution Graph */}
                    <div className="mb-6">
                      <div className="bg-background/50 rounded-lg p-4 border border-primary/10">
                        <img 
                          src="https://github-readme-activity-graph.vercel.app/graph?username=SuryanshSS1011&theme=github-compact&hide_border=true&bg_color=00000000&color=d4af37&line=d4af37&point=d4af37&area=true&area_color=d4af37"
                          alt="GitHub Contribution Graph"
                          className="w-full rounded-lg"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    
                    {/* Recent Repositories */}
                    <div className="mt-6">
                      <h4 className="font-semibold mb-3 text-primary">Recent Repositories</h4>
                      <div className="space-y-3">
                        {[
                          { name: "personal-portfolio-website", description: "Modern portfolio built with Next.js and Tailwind CSS", language: "TypeScript", updated: "2 days ago" },
                          { name: "open-scholar-hub", description: "Research collaboration platform for academics", language: "JavaScript", updated: "1 week ago" },
                          { name: "verichain", description: "Blockchain-based credential verification system", language: "Solidity", updated: "2 weeks ago" },
                        ].map((repo, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-primary/10"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-primary">{repo.name}</div>
                              <div className="text-xs text-muted-foreground mb-1">{repo.description}</div>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  {repo.language}
                                </span>
                                <span>Updated {repo.updated}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`https://github.com/SuryanshSS1011/${repo.name}`, '_blank')}
                            >
                              <ExternalLink className="h-3 w-3" />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <Button
                        variant="outline"
                        className="border-primary text-primary hover:bg-primary/10"
                        onClick={() => window.open("https://github.com/SuryanshSS1011", "_blank")}
                      >
                        <Github className="h-4 w-4 mr-2" />
                        View GitHub Profile
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Projects
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Wynlabs.ai",
                  description:
                    "Collaborating with a cross-institutional team to build an AI-powered copilot for the manufacturing industry.",
                  features: [
                    "Focusing on real-time workflow optimization",
                    "Developing predictive analytics capabilities",
                    "Creating intuitive user interfaces",
                  ],
                  tags: ["AI/ML", "Manufacturing", "Analytics"],
                  icon: Brain,
                  url: "https://www.wynlabs.ai/",
                },
                {
                  title: "OpenScholar Hub",
                  description:
                    "Developing a centralized research collaboration platform to support networking, data sharing, and project management.",
                  features: [
                    "Built with full-stack framework",
                    "Expanding into student-led team",
                    "Targeting pilot integration with Penn State Research Circle by Fall 2025",
                  ],
                  tags: ["Full-Stack", "Research", "Collaboration"],
                  icon: Users,
                  url: "https://open-scholar-hub.vercel.app/",
                },
                {
                  title: "VeriChain",
                  description:
                    "Built a decentralized platform for issuing, verifying, and managing academic and professional credentials on the blockchain.",
                  features: [
                    "Developed smart contracts in Solidity (Polygon Amoy)",
                    "Integrated Arweave and IPFS for secure, immutable storage",
                    "Designed responsive UI using Next.js, Tailwind CSS, and atomic design principles with MetaMask-based authentication",
                  ],
                  tags: ["Blockchain", "Web3", "Next.js", "Solidity"],
                  icon: Code,
                  url: "https://verichain-sage.vercel.app/",
                },
              ].map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50 h-full">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-primary">
                            <project.icon className="h-5 w-5" />
                            {project.url ? (
                              <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:underline"
                              >
                                {project.title}
                              </a>
                            ) : (
                              project.title
                            )}
                          </CardTitle>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {project.url ? (
                            <a href={project.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                            </a>
                          ) : (
                            <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                          )}
                        </motion.div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{project.description}</p>
                      <div className="space-y-2 text-sm mb-4">
                        {project.features.map((feature, featureIndex) => (
                          <motion.p
                            key={featureIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: featureIndex * 0.1 }}
                            viewport={{ once: true }}
                            className="flex items-start gap-2"
                          >
                            <Rocket className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            {feature}
                          </motion.p>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <motion.div
                            key={tagIndex}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: tagIndex * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <Badge variant="outline" className="border-primary/30 text-primary hover:bg-primary/10">
                              {tag}
                            </Badge>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Skills
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <SkillCard
                title="Programming Languages"
                skills={["Python", "Java", "C", "C++", "Golang", "JavaScript"]}
                icon={Code}
              />
              <SkillCard
                title="Frameworks & Libraries"
                skills={["React.js", "Next.js", "Node.js", "Express.js", "Flask", "TensorFlow", "PyTorch"]}
                icon={Zap}
              />
              <SkillCard
                title="Tools & Technologies"
                skills={["Git", "Docker", "AWS", "Firebase", "RESTful APIs", "Figma"]}
                icon={Target}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Activities
            </h2>

            <Tabs defaultValue="leadership" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-primary/10 border border-primary/20">
                <TabsTrigger
                  value="leadership"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Leadership Roles
                </TabsTrigger>
                <TabsTrigger
                  value="community"
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Volunteer Service
                </TabsTrigger>
              </TabsList>

              <TabsContent value="leadership" className="space-y-6">
                {[
                  {
                    title: "President",
                    org: "Cyber Lions Club, Penn State Harrisburg",
                    date: "Aug 2024 - Dec 2024",
                    items: [
                      "Spearheaded cybersecurity initiatives and promoted awareness through workshops, CTFs, and technical talks",
                      "Organized and led weekly club meetings, fostering member engagement and technical development",
                      "Collaborated with campus IT and faculty to execute university-wide cybersecurity outreach events",
                    ],
                    icon: Star,
                  },
                  {
                    title: "Computer Science Lead Assistant",
                    org: "IEEE Student Branch, Penn State Harrisburg",
                    date: "Jan 2024 - Dec 2024",
                    items: [
                      "Co-developed the HackPSH hackathon platform (https://ieee.hackpsh.org/) using Next.js and Supabase",
                      "Facilitated technical workshops on algorithms, data structures, and web development",
                      "Contributed to control systems and data analytics teams for IEEE PSH Radio Telescope project",
                      "Promoted community engagement and technical growth among peers in IEEE-led initiatives",
                    ],
                    icon: Code,
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <activity.icon className="h-5 w-5" />
                          {activity.title}
                        </CardTitle>
                        <CardDescription>
                          {activity.org} • {activity.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {activity.items.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2"
                            >
                              <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

              <TabsContent value="community" className="space-y-6">
                {[
                  {
                    title: "Spring Break Community Service in Cleveland",
                    org: "Envision Cleveland",
                    date: "Mar 2024",
                    items: [
                      "Participated in week-long service program addressing urban challenges in Cleveland",
                      "Contributed to community improvement efforts, education programs, and refugee support initiatives",
                      "Gained hands-on experience in sustainability, mentorship, and urban development",
                      "Collaborated with diverse teams to implement solutions for local community needs",
                    ],
                    icon: Users,
                  },
                  {
                    title: "STEM Instructor",
                    org: "Middletown Public Library",
                    date: "Aug 2023 - Dec 2023",
                    items: [
                      "Led interactive STEM sessions for various age groups in the local community",
                      "Taught circuits, Arduino fundamentals, and introductory programming concepts",
                      "Promoted collaborative learning and interest in technology within the community",
                      "Developed curriculum and hands-on activities to make technology accessible to all",
                    ],
                    icon: BookOpen,
                  },
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <Card className="hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                          <service.icon className="h-5 w-5" />
                          {service.title}
                        </CardTitle>
                        <CardDescription>
                          {service.org} • {service.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          {service.items.map((item, itemIndex) => (
                            <motion.li
                              key={itemIndex}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.1 }}
                              viewport={{ once: true }}
                              className="flex items-start gap-2"
                            >
                              <Star className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                              {item}
                            </motion.li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </TabsContent>

            </Tabs>
          </motion.div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 border-t border-primary/20 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Let's Connect
            </h3>
            <p className="text-muted-foreground mb-6">
              Interested in collaboration, research opportunities, or just want to chat about technology?
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Button
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => window.open("mailto:sss6371@psu.edu", "_blank")}
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Me
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => window.open("https://www.linkedin.com/in/suryansh-sijwali/", "_blank")}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => window.open("https://github.com/SuryanshSS1011", "_blank")}
              >
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
            </div>
            <motion.p className="text-sm text-muted-foreground" whileHover={{ scale: 1.05 }}>
              © 2025 Suryansh Sijwali. All rights reserved.
            </motion.p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
