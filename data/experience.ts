import { Coffee, BookOpen, Zap, LucideIcon } from "lucide-react"

export interface ExperienceItem {
  id: string
  title: string
  subtitle: string
  date: string
  items: string[]
  icon: LucideIcon
  badge?: {
    text: string
    className: string
  }
}

export const internships: ExperienceItem[] = [
  {
    id: "leechy-internship",
    title: "Software Engineer (Intern)",
    subtitle: "Leechy LLC",
    date: "Jun 2025 - Present",
    badge: {
      text: "Current",
      className: "bg-success/20 text-success border-success/30"
    },
    items: [
      "Led a full UI/UX redesign of the Leechy mobile app (Capacitor + React), applying atomic design patterns and a centralized theming system to boost consistency and developer productivity",
      "Performed end-to-end QA analysis and performance profiling, uncovering critical bottlenecks in rendering and network workflows",
      "Engineered and deployed optimization strategies—code-splitting, asset compression, and lazy loading—that cut key screen load times by 80%",
      "Designed, trained, and integrated a personalized Leechy AI chatbot into the mobile app, building NLP pipelines and fine-tuning language models to deliver contextual, on-demand user support",
    ],
    icon: Coffee,
  },
  {
    id: "flourish-internship",
    title: "Full-Stack Mobile App Developer (Intern)",
    subtitle: "Flourish: Grow with Self-Care",
    date: "Feb 2025 - Jun 2025",
    items: [
      "Collaborated with design team to implement frontend UI elements from Figma wireframes",
      "Developed, tested, and maintained frontend code for seamless user experience across iOS and Android",
      "Assisted with backend architecture, database design, and API integration",
      "Optimized application for performance, scalability, and reliability",
      "Coordinated with cross-functional teams to iterate features based on user feedback",
    ],
    icon: Coffee,
  },
]

export const teaching: ExperienceItem[] = [
  {
    id: "jumpstart-mentor",
    title: "Jump Start Program Mentor",
    subtitle: "Center for Engineering Outreach and Inclusion, Penn State",
    date: "May 2025 - Jun 2025",
    items: [
      "Serve as Teaching Assistant and facilitator for PHYS 212 (Electricity and Magnetism)",
      "Provide academic and social mentorship to incoming engineering students",
      "Collaborate with instructors, peers, and program staff on planning and student support",
    ],
    icon: BookOpen,
  },
  {
    id: "peer-tutor",
    title: "Peer Tutor",
    subtitle: "Russell E. Horn Sr. Learning Center, Penn State Harrisburg",
    date: "Aug 2024 - Dec 2024",
    items: [
      "Tutored Mathematics, Physics, and Computer Science students one-on-one and in small groups",
      "Created tailored academic resources and strategies for student success",
    ],
    icon: BookOpen,
  },
  {
    id: "eecs-mentor",
    title: "EECS Peer Mentor",
    subtitle: "Penn State University",
    date: "Jan 2025 - May 2025",
    items: ["Mentored five first-year students in EECS through structured academic support"],
    icon: BookOpen,
  },
]

export const externships: ExperienceItem[] = [
  {
    id: "outamation-externship",
    title: "AI & Automation Engineer (Extern)",
    subtitle: "Outamation",
    date: "May 2025 - Jul 2025 (Remote)",
    items: [
      "Built AI-powered document-classification and data-extraction pipelines using Python (PyMuPDF, OCR), NLP and computer-vision techniques to automate processing of large mortgage document sets",
      "Developed a Retrieval-Augmented Generation (RAG) search system with LlamaIndex, improving information-retrieval accuracy by benchmarking and tuning open-source AI models",
      "Designed and executed model-evaluation and performance-optimization experiments, identifying best-fit architectures and hyperparameter settings for production readiness",
      "Compiled a comprehensive technical analysis report, synthesizing key challenges, optimization strategies, and deployment recommendations to guide future AI workflow development"
    ],
    icon: Zap,
  },
]

export interface TimelineItem {
  title: string
  date: string
  side?: "left" | "right"
  current?: boolean
}

export const timelineItems: TimelineItem[] = [
  { title: "Software Engineer (Intern)", date: "Jun 2025 - Present", side: "right", current: true },
  { title: "AI & Automation Engineer (Extern)", date: "May 2025 - Jul 2025", side: "left" },
  { title: "Jump Start Program Mentor", date: "May 2025 - Jun 2025", side: "right" },
  { title: "Full-Stack Mobile App Developer (Intern)", date: "Feb 2025 - Jun 2025", side: "left" },
  { title: "EECS Peer Mentor", date: "Jan 2025 - May 2025", side: "right" },
  { title: "Peer Tutor", date: "Aug 2024 - Dec 2024", side: "left" },
]