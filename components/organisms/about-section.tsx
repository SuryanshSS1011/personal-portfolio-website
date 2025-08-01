"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { StatsCounter } from "@/components/molecules/stats-counter"
import { 
  GraduationCap, 
  Award, 
  Coffee, 
  BookOpen, 
  Rocket, 
  Users, 
  Star, 
  Brain, 
  TrendingUp 
} from "lucide-react"

export const AboutSection = () => {
  const achievements = [
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
  ]

  const hobbies = [
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
  ]

  return (
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
            {/* Education Card */}
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

            {/* Achievements Card */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
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

            {/* Outside Tech Card */}
            <Card className="group hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-primary">
                  <Coffee className="h-5 w-5" />
                  Outside Tech
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hobbies.map((hobby, index) => (
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
  )
}