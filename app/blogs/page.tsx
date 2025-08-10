import { BlogsLayout } from "@/components/page-templates/blogs-layout"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog",
  description: "Insights into AI research, software development, and technical innovation by Suryansh Sijwali.",
  keywords: [
    "AI research blog",
    "Software development insights", 
    "Machine learning articles",
    "Performance optimization",
    "Technical writing",
    "Research publications",
    "Full-stack development",
    "LLM applications"
  ],
}

export default function BlogsPage() {
  return <BlogsLayout />
}