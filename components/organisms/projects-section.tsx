"use client"

import { motion } from "framer-motion"
import { ProjectCard } from "@/components/molecules/project-card"
import { Brain, Users, Code } from "lucide-react"

export const ProjectsSection = () => {
  const projects = [
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
  ]

  return (
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
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
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
        </motion.div>
      </div>
    </section>
  )
}