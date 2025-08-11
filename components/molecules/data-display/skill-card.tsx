"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { LucideIcon } from "lucide-react"

interface SkillCardProps {
  title: string
  skills: { name: string; badge: string }[]
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
      className="w-64 h-24 md:w-64 md:h-24"
    >
      <Card className="group border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-500 border-primary/20 hover:border-primary/50 h-full">
        <CardHeader className="text-center pb-0">
          <CardTitle className="flex items-center justify-center gap-1 text-primary text-xs md:text-xs">
            <Icon className="h-3 w-3 md:h-3 md:w-3" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-1">
          <div className="flex flex-wrap gap-1.5 justify-center">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={skill.badge}
                  alt={skill.name}
                  className="h-3.5 md:h-3.5 cursor-pointer transition-all duration-300"
                  style={{
                    filter: hoveredSkill === skill.name ? 'brightness(1.1) drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none'
                  }}
                />
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}