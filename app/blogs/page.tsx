import { BlogsLayout } from "@/components/page-templates/blogs-layout"
import { blogPosts } from "@/data/blog-posts"
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

export default function BlogsPage() {
  // Convert legacy posts to new format for compatibility
  const convertedPosts = blogPosts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    lastModified: post.date,
    readTime: post.readTime,
    tags: post.tags,
    category: post.category,
    author: {
      name: "Suryansh Singh",
      bio: "Developer and researcher",
      avatar: "/images/profile.jpg",
      social: {
        github: "https://github.com/suryanshss",
        linkedin: "https://linkedin.com/in/suryanshss",
      }
    },
    seo: {
      keywords: post.tags,
      metaDescription: post.excerpt,
    },
    featured: false,
    draft: false,
    tableOfContents: false,
  }))
  
  return <BlogsLayout blogPosts={convertedPosts} />
}