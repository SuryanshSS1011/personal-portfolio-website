import { BlogsLayout } from "@/components/page-templates/blogs-layout"
import { getAllBlogPosts } from "@/lib/blog-utils"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog - Suryansh SS",
  description: "Insights from AI research, software development, and technical innovation. Exploring the intersection of cutting-edge technology and real-world applications.",
  keywords: ["blog", "AI", "research", "development", "technology", "innovation"],
  openGraph: {
    title: "Blog - Suryansh SS",
    description: "Insights from AI research, software development, and technical innovation.",
    type: "website",
  },
}

export default async function BlogsPage() {
  const posts = await getAllBlogPosts()
  
  return <BlogsLayout blogPosts={posts} />
}