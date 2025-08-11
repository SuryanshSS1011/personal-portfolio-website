import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { BlogPostMeta, BlogPostContent } from '@/types/blog'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

/**
 * Get all MDX blog post files
 */
export function getAllMDXBlogPosts(): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR)
  const mdxFiles = files.filter(file => file.endsWith('.mdx'))

  const posts = mdxFiles.map(file => {
    const fullPath = path.join(BLOG_DIR, file)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)
    
    return {
      ...data,
      id: data.id || file.replace('.mdx', ''),
    } as BlogPostMeta
  })

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

/**
 * Get MDX blog post by ID
 */
export async function getMDXBlogPostById(id: string): Promise<BlogPostContent | null> {
  const filePath = path.join(BLOG_DIR, `${id}.mdx`)
  
  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(fileContents)

  return {
    meta: {
      ...data,
      id: data.id || id,
    } as BlogPostMeta,
    content
  }
}

/**
 * Get all blog post slugs for static generation
 */
export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return []
  }

  const files = fs.readdirSync(BLOG_DIR)
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => file.replace('.mdx', ''))
}