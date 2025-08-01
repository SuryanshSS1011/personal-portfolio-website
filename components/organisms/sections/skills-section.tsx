"use client"

import { SkillCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { Code, Zap, Target } from "lucide-react"

export const SkillsSection = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Python", "Java", "C", "C++", "Golang", "JavaScript"],
      icon: Code,
    },
    {
      title: "Frameworks & Libraries",
      skills: ["React.js", "Next.js", "Node.js", "Express.js", "Flask", "TensorFlow", "PyTorch"],
      icon: Zap,
    },
    {
      title: "Tools & Technologies",
      skills: ["Git", "Docker", "AWS", "Firebase", "RESTful APIs", "Figma"],
      icon: Target,
    },
  ]

  return (
    <SectionWrapper id="skills" title="Skills" maxWidth="6xl">
      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((category, index) => (
          <SkillCard
            key={index}
            title={category.title}
            skills={category.skills}
            icon={category.icon}
          />
        ))}
      </div>
    </SectionWrapper>
  )
}