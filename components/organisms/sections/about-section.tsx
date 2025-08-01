"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { StatsCounter, IconTextListItem, InfoCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
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
    <SectionWrapper id="about" title="About Me" maxWidth="4xl">
      {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <StatsCounter end={3} label="Years Experience" suffix="+" />
            <StatsCounter end={5} label="Projects Completed" suffix="+" />
            <StatsCounter end={1} label="Research Publications" />
            <StatsCounter end={8} label="Technologies Mastered" suffix="+" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Education Card */}
            <InfoCard title="Education" icon={GraduationCap}>
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
            </InfoCard>

            {/* Achievements Card */}
            <InfoCard title="Achievements" icon={Award}>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <IconTextListItem
                    key={index}
                    icon={achievement.icon}
                    title={achievement.title}
                    description={achievement.desc}
                    index={index}
                    className="text-sm text-muted-foreground"
                  />
                ))}
              </div>
            </InfoCard>

            {/* Outside Tech Card */}
            <InfoCard title="Outside Tech" icon={Coffee}>
              <div className="space-y-3">
                {hobbies.map((hobby, index) => (
                  <IconTextListItem
                    key={index}
                    icon={hobby.icon}
                    title={hobby.title}
                    description={hobby.desc}
                    index={index}
                    className="text-sm text-muted-foreground"
                  />
                ))}
              </div>
            </InfoCard>
          </div>
    </SectionWrapper>
  )
}