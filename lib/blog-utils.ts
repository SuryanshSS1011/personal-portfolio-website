import { BlogPostMeta, BlogPostContent } from '@/types/blog'
import fs from 'fs'
import path from 'path'
import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'

export interface BlogFilters {
  category?: string
  tags?: string[]
  search?: string
  featured?: boolean
}

export interface BlogSortOptions {
  sortBy: 'date' | 'readTime' | 'title'
  order: 'asc' | 'desc'
}

const BLOG_CONTENT_PATH = path.join(process.cwd(), 'content/blog')

/**
 * Get all MDX blog post filenames
 */
const getMDXFiles = (): string[] => {
  try {
    return fs.readdirSync(BLOG_CONTENT_PATH)
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace('.mdx', ''))
  } catch (error) {
    console.warn('Could not read blog content directory')
    return []
  }
}

/**
 * Load blog post metadata from MDX file
 */
const loadBlogPostFromMDX = async (slug: string): Promise<BlogPostMeta | null> => {
  try {
    const filePath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter } = matter(fileContent)
    
    // Convert frontmatter to BlogPostMeta format
    return {
      id: slug,
      title: frontmatter.title || 'Untitled',
      excerpt: frontmatter.excerpt || '',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      lastModified: frontmatter.lastModified || frontmatter.date,
      readTime: frontmatter.readTime || '5 min read',
      tags: frontmatter.tags || [],
      category: frontmatter.category || 'Development',
      author: frontmatter.author || {
        name: 'Suryansh Singh',
        bio: 'Full-stack developer, researcher, and technology enthusiast focused on building impactful solutions.',
        avatar: '/images/profile.jpg',
        social: {
          github: 'https://github.com/suryanshss',
          linkedin: 'https://linkedin.com/in/suryanshss',
          twitter: 'https://twitter.com/suryanshss'
        }
      },
      seo: frontmatter.seo || {
        keywords: frontmatter.tags || [],
        metaDescription: frontmatter.excerpt || ''
      },
      series: frontmatter.series,
      featured: frontmatter.featured || false,
      draft: frontmatter.draft || false,
      tableOfContents: frontmatter.tableOfContents || false,
      relatedPosts: frontmatter.relatedPosts
    }
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog post metadata
 */
export const getAllBlogPosts = async (): Promise<BlogPostMeta[]> => {
  const mdxFiles = getMDXFiles()
  const mdxPosts: BlogPostMeta[] = []
  
  for (const slug of mdxFiles) {
    const post = await loadBlogPostFromMDX(slug)
    if (post && !post.draft) {
      mdxPosts.push(post)
    }
  }
  
  return mdxPosts
}

/**
 * Load blog post content from MDX file
 */
export const getBlogPostById = async (id: string): Promise<BlogPostContent | null> => {
  try {
    const filePath = path.join(BLOG_CONTENT_PATH, `${id}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data: frontmatter, content } = matter(fileContent)
    
    const meta = await loadBlogPostFromMDX(id)
    if (!meta) return null
    
    return {
      meta,
      content,
      media: frontmatter.media,
      interactive: frontmatter.interactive
    }
  } catch (error) {
    console.error(`Error loading blog post content for ${id}:`, error)
    return null
  }
}

/**
 * Get filtered and sorted blog posts
 */
export const getFilteredBlogPosts = async (
  filters: BlogFilters = {},
  sort: BlogSortOptions = { sortBy: 'date', order: 'desc' }
): Promise<BlogPostMeta[]> => {
  let posts = await getAllBlogPosts()

  // Apply filters
  if (filters.category) {
    posts = posts.filter(post => post.category === filters.category)
  }

  if (filters.tags && filters.tags.length > 0) {
    posts = posts.filter(post => 
      filters.tags!.some(tag => post.tags.includes(tag))
    )
  }

  if (filters.search) {
    const searchLower = filters.search.toLowerCase()
    posts = posts.filter(post => 
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    )
  }

  if (filters.featured !== undefined) {
    posts = posts.filter(post => post.featured === filters.featured)
  }

  // Apply sorting
  posts.sort((a, b) => {
    let aValue: string | number
    let bValue: string | number

    switch (sort.sortBy) {
      case 'date':
        aValue = new Date(a.date).getTime()
        bValue = new Date(b.date).getTime()
        break
      case 'readTime':
        aValue = parseInt(a.readTime.replace(/\\D/g, ''))
        bValue = parseInt(b.readTime.replace(/\\D/g, ''))
        break
      case 'title':
        aValue = a.title.toLowerCase()
        bValue = b.title.toLowerCase()
        break
      default:
        return 0
    }

    if (sort.order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return posts
}

/**
 * Get related blog posts based on tags and category
 */
export const getRelatedBlogPosts = async (
  postId: string, 
  limit: number = 3
): Promise<BlogPostMeta[]> => {
  const allPosts = await getAllBlogPosts()
  const currentPost = allPosts.find(p => p.id === postId)
  if (!currentPost) return []

  const otherPosts = allPosts.filter(p => p.id !== postId)
  
  // Score posts based on shared tags and category
  const scoredPosts = otherPosts.map(post => {
    let score = 0
    
    // Same category gets higher score
    if (post.category === currentPost.category) {
      score += 3
    }
    
    // Shared tags
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag))
    score += sharedTags.length
    
    return { post, score }
  })

  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post)
}

/**
 * Get all unique tags from blog posts
 */
export const getAllTags = async (): Promise<string[]> => {
  const posts = await getAllBlogPosts()
  const tagSet = new Set<string>()
  posts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * Get all categories from blog posts
 */
export const getAllCategories = async (): Promise<string[]> => {
  const posts = await getAllBlogPosts()
  const categorySet = new Set<string>()
  posts.forEach(post => {
    categorySet.add(post.category)
  })
  return Array.from(categorySet).sort()
}

/**
 * Generate reading time estimate for content
 */
export const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\\s+/).length
  const minutes = Math.ceil(words / wordsPerMinute)
  return `${minutes} min read`
}

/**
 * Generate blog post URL slug
 */
export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

/**
 * Format blog post date
 */
export const formatBlogDate = (
  dateString: string, 
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string => {
  return new Date(dateString).toLocaleDateString('en-US', options)
}

