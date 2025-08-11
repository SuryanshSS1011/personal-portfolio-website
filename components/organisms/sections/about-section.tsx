"use client"

import { motion } from "framer-motion"
import { Badge, ErrorBoundary } from "@/components/atoms"
import { InfoCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { GraduationCap, Sparkles, Palette } from "lucide-react"
import { education, interests, personalInfo, philosophy } from "@/data/personal-info"
import { useReducedMotion } from "@/hooks/useReducedMotion"

export const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion()

  return (
    <ErrorBoundary>
      <SectionWrapper id="about" title="About Me" maxWidth="6xl">
        {/* Main Content */}
        <div className="space-y-12">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              {personalInfo.description}
            </p>
          </motion.div>

          {/* Education and Interests Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6 }}
              viewport={{ once: true }}
            >
              <InfoCard title="Education" icon={GraduationCap}>
                <div className="space-y-6">
                  <motion.div 
                    whileHover={prefersReducedMotion ? {} : { x: 10 }} 
                    transition={{ type: "spring", stiffness: 300 }}
                    className="border-l-4 border-primary/30 pl-4"
                  >
                    <h3 className="font-semibold text-foreground">{education.degree}</h3>
                    <p className="text-muted-foreground font-medium">{education.institution}</p>
                    <p className="text-sm text-muted-foreground">{education.expectedGraduation}</p>
                  </motion.div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Affiliated Colleges:</h4>
                      <div className="space-y-2">
                        {education.colleges.map((college, index) => (
                          <motion.div 
                            key={college.name}
                            whileHover={prefersReducedMotion ? {} : { x: 5 }}
                            className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                          >
                            <div className={`w-2 h-2 bg-${college.color} rounded-full`}></div>
                            <span className="text-sm font-medium">{college.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Majors:</h4>
                      <p className="text-sm text-muted-foreground">{education.majors}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Minors:</h4>
                      <p className="text-sm text-muted-foreground">{education.minors}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-foreground mb-2">Recognition:</h4>
                      <div className="flex flex-wrap gap-2">
                        {education.recognitions.map((recognition, index) => (
                          <Badge 
                            key={recognition.name}
                            variant="secondary" 
                            className={`bg-${recognition.variant}/20 text-${recognition.variant} border-${recognition.variant}/30`}
                          >
                            {recognition.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </InfoCard>
            </motion.div>

            {/* Interests Card */}
            <motion.div
              initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.6, delay: prefersReducedMotion ? 0 : 0.2 }}
              viewport={{ once: true }}
            >
              <InfoCard title="Beyond Code" icon={Palette}>
                <div className="space-y-6">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-4">
                      When I'm not coding, you'll find me exploring diverse interests that fuel creativity and perspective.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {interests.map((interest, index) => {
                      const IconComponent = interest.icon
                      return (
                        <motion.div 
                          key={interest.name}
                          whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                          className={`flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-${interest.gradient}/10 to-transparent border border-${interest.gradient}/20`}
                        >
                          <IconComponent className={`w-5 h-5 text-${interest.gradient}`} />
                          <span className="text-sm font-medium">{interest.name}</span>
                        </motion.div>
                      )
                    })}
                  </div>

                  {/* Philosophy Quote */}
                  <div className="mt-8 pt-6 border-t border-gradient-to-r from-transparent via-muted/30 to-transparent">
                    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/8 via-secondary/4 to-primary/6 border border-primary/15 shadow-lg backdrop-blur-sm">
                      {/* Decorative elements */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/3 to-secondary/3 opacity-50"></div>
                      <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"></div>
                      <div className="absolute bottom-3 left-3 w-12 h-12 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-lg"></div>
                      
                      {/* Quote content */}
                      <div className="relative z-10">
                        <blockquote className="text-base md:text-lg italic text-foreground/90 text-center leading-relaxed font-medium">
                          {philosophy}
                        </blockquote>
                        
                        {/* Attribution line */}
                        <div className="flex items-center justify-center mt-4 gap-2">
                          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent w-16"></div>
                          <Sparkles className="w-4 h-4 text-primary/70" />
                          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent w-16"></div>
                        </div>
                      </div>
                      
                      {/* Corner accent */}
                      <div className="absolute -top-3 -left-3">
                        <div className="bg-background border border-primary/30 rounded-full p-2 shadow-md">
                          <Sparkles className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </InfoCard>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>
    </ErrorBoundary>
  )
}