"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { LucideIcon } from "lucide-react"

interface SkillCardProps {
  title: string
  skills: string[]
  icon: LucideIcon
}

export const SkillCard = ({ title, skills, icon: Icon }: SkillCardProps) => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.02 }}
    >
      <Card className="group border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50">
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