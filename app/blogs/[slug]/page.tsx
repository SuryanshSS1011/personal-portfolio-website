import { BlogPostLayout } from "@/components/page-templates/blog-post-layout"
import { getAllBlogPosts, getBlogPostById } from "@/lib/blog-utils"
import { notFound } from "next/navigation"
import type { Metadata } from "next"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts()
  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const postContent = await getBlogPostById(params.slug)
  
  if (!postContent) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found."
    }
  }

  const { meta } = postContent

  return {
    title: meta.title,
    description: meta.excerpt,
    keywords: meta.tags,
    openGraph: {
      title: meta.title,
      description: meta.excerpt,
      type: "article",
      publishedTime: meta.date,
      tags: meta.tags,
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postContent = await getBlogPostById(params.slug)

  if (!postContent) {
    notFound()
  }

  return <BlogPostLayout postContent={postContent} />
}