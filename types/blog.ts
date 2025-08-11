export interface BlogPostAuthor {
  name: string
  bio: string
  avatar: string
  social: {
    twitter?: string
    github?: string
    linkedin?: string
  }
}

export interface BlogPostSEO {
  metaTitle?: string
  metaDescription?: string
  keywords: string[]
  canonicalUrl?: string
  ogImage?: string
}

export interface BlogPostSeries {
  name: string
  order: number
  totalParts: number
}

export interface BlogPostMeta {
  id: string
  title: string
  excerpt: string
  date: string
  lastModified?: string
  readTime: string
  tags: string[]
  category: "Research" | "Development" | "Tutorial" | "Insights"
  author: BlogPostAuthor
  seo: BlogPostSEO
  series?: BlogPostSeries
  featured: boolean
  draft: boolean
  tableOfContents: boolean
  relatedPosts?: string[] // IDs of related posts
}

export interface BlogPostContent {
  meta: BlogPostMeta
  content: string // MDX content
  media?: {
    heroImage?: string
    gallery?: string[]
    diagrams?: { [key: string]: string }
  }
  interactive?: {
    demos?: { [key: string]: any }
    codeExamples?: { [key: string]: string }
  }
}