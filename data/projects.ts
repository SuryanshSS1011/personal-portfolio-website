import { Brain, Users, Code, BookOpen, LucideIcon } from "lucide-react"

export interface ProjectData {
  id: string
  title: string
  description: string
  features: string[]
  tags: string[]
  icon: LucideIcon
  url: string
}

export const projects: ProjectData[] = [
  {
    id: "wynlabs",
    title: "Wynlabs.ai",
    description: "Collaborating with a cross-institutional team to build an AI-powered copilot for the manufacturing industry.",
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
    id: "openscholar",
    title: "OpenScholar Hub",
    description: "Developing a centralized research collaboration platform to support networking, data sharing, and project management.",
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
    id: "verichain",
    title: "VeriChain",
    description: "Built a decentralized platform for issuing, verifying, and managing academic and professional credentials on the blockchain.",
    features: [
      "Developed smart contracts in Solidity (Polygon Amoy)",
      "Integrated Arweave and IPFS for secure, immutable storage",
      "Designed responsive UI using Next.js, Tailwind CSS, and atomic design principles with MetaMask-based authentication",
    ],
    tags: ["Blockchain", "Web3", "Next.js", "Solidity"],
    icon: Code,
    url: "https://verichain-sage.vercel.app/",
  },
  {
    id: "collegenotes",
    title: "CollegeNotesOrg",
    description: "A centralized GitHub organization for managing college class notes, standardizing academic formats, and enabling collaborative learning through shared repositories.",
    features: [
      "Developed noteparser Python library for multi-format conversion (Markdown, LaTeX, HTML, PDF)",
      "Implemented systematic naming conventions and repository structures for academic content",
      "Created collaborative workflows using GitHub's version control for educational materials",
    ],
    tags: ["Education", "Python", "GitHub", "Open Source"],
    icon: BookOpen,
    url: "https://github.com/CollegeNotesOrg",
  },
]