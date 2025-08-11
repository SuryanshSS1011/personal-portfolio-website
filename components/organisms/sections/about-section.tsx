"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/atoms"
import { InfoCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { 
  GraduationCap, 
  Sparkles,
  MapPin,
  Music,
  Languages,
  Globe,
  Gamepad2,
  Trophy,
  Palette,
  Coffee
} from "lucide-react"

export const AboutSection = () => {
  const interests = [
    "GIS/Mapping",
    "Linguistics", 
    "Music Production",
    "Language Learning",
    "Songwriting",
    "Cultural Studies",
    "Documentaries",
    "Sound Design",
    "Racket Sports",
    "Chess"
  ]

  return (
    <SectionWrapper id="about" title="About Me" maxWidth="6xl">
      {/* Main Content */}
      <div className="space-y-12">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm a developer and researcher passionate about solving complex problems through technology. 
            My work spans AI research, full-stack development, and systems thinking, always looking for 
            innovative ways to bridge the gap between cutting-edge research and practical applications.
          </p>
        </motion.div>

        {/* Education and Interests Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Education Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <InfoCard title="Education" icon={GraduationCap}>
              <div className="space-y-6">
                <motion.div 
                  whileHover={{ x: 10 }} 
                  transition={{ type: "spring", stiffness: 300 }}
                  className="border-l-4 border-primary/30 pl-4"
                >
                  <h3 className="font-semibold text-foreground">Bachelor of Science</h3>
                  <p className="text-muted-foreground font-medium">The Pennsylvania State University</p>
                  <p className="text-sm text-muted-foreground">Expected May 2027</p>
                </motion.div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Affiliated Colleges:</h4>
                    <div className="space-y-2">
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                      >
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm font-medium">Schreyer Honors College</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                      >
                        <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        <span className="text-sm font-medium">College of Engineering</span>
                      </motion.div>
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-3 p-2 rounded-lg bg-muted/30"
                      >
                        <div className="w-2 h-2 bg-primary/70 rounded-full"></div>
                        <span className="text-sm font-medium">Eberly College of Science</span>
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Majors:</h4>
                    <p className="text-sm text-muted-foreground">
                      Computer Science • Computational Physics
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Minors:</h4>
                    <p className="text-sm text-muted-foreground">
                      Computer Engineering • Mathematics • Cybersecurity 
                    </p>
                  </div>

                  <div>
                    <h4 className="font-medium text-foreground mb-2">Recognition:</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-primary/20 text-primary border-primary/30">
                        Dean's List
                      </Badge>
                      <Badge variant="secondary" className="bg-secondary/20 text-secondary border-secondary/30">
                        President Walker Award
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>
          </motion.div>

          {/* Interests Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
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
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  >
                    <Music className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Music & Songwriting</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20"
                  >
                    <Languages className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-medium">Linguistics</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  >
                    <MapPin className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">GIS & Mapping</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20"
                  >
                    <Globe className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-medium">Cultural Studies</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20"
                  >
                    <Gamepad2 className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">Racket Sports</span>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20"
                  >
                    <Trophy className="w-5 h-5 text-secondary" />
                    <span className="text-sm font-medium">Chess</span>
                  </motion.div>
                </div>

                {/* Philosophy Quote within the Beyond Code section */}
                <div className="mt-8 pt-6 border-t border-gradient-to-r from-transparent via-muted/30 to-transparent">
                  <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary/8 via-secondary/4 to-primary/6 border border-primary/15 shadow-lg backdrop-blur-sm">
                    {/* Decorative elements */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/3 to-secondary/3 opacity-50"></div>
                    <div className="absolute top-3 right-3 w-16 h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-xl"></div>
                    <div className="absolute bottom-3 left-3 w-12 h-12 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-full blur-lg"></div>
                    
                    {/* Quote content */}
                    <div className="relative z-10">
                      <blockquote className="text-base md:text-lg italic text-foreground/90 text-center leading-relaxed font-medium">
                        "I believe in the power of interdisciplinary thinking—bringing together technology, 
                        research, and diverse cultural perspectives to create solutions that truly matter."
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
  )
}