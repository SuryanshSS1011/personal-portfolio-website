"use client"

import { ProjectCard } from "@/components/molecules"
import { SectionWrapper } from "@/components/organisms"
import { ErrorBoundary } from "@/components/atoms"
import { projects } from "@/data/projects"

export const ProjectsSection = () => {
  return (
    <ErrorBoundary>
      <SectionWrapper id="projects" title="Projects" background maxWidth="6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              features={project.features}
              tags={project.tags}
              icon={project.icon}
              url={project.url}
              index={index}
            />
          ))}
        </div>
      </SectionWrapper>
    </ErrorBoundary>
  )
}