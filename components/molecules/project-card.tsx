"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, Badge } from "@/components/atoms"
import { ExternalLink, Rocket } from "lucide-react"
import { LucideIcon } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  features: string[]
  tags: string[]
  icon: LucideIcon
  url?: string
  index: number
}

export const ProjectCard = ({ 
  title, 
  description, 
  features, 
  tags, 
  icon: Icon, 
  url, 
  index 
}: ProjectCardProps) => {
  return (
    <motion.div
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
                <Icon className="h-5 w-5" />
                {url ? (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {title}
                  </a>
                ) : (
                  title
                )}
              </CardTitle>
            </div>
            <motion.div
              whileHover={{ scale: 1.2, rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {url ? (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                </a>
              ) : (
                <ExternalLink className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              )}
            </motion.div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">{description}</p>
          <div className="space-y-2 text-sm mb-4">
            {features.map((feature, featureIndex) => (
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
            {tags.map((tag, tagIndex) => (
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
  )
}