import { BlogPostMeta, BlogPostContent, blogPosts } from '@/data/blog-posts'

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

/**
 * Get all blog post metadata
 */
export const getAllBlogPosts = (): BlogPostMeta[] => {
  // For now, return converted legacy posts
  // In the future, this will load from MDX files
  return blogPosts.map(convertLegacyPost)
}

/**
 * Get blog post by ID
 */
export const getBlogPostById = (id: string): BlogPostContent | null => {
  const post = blogPosts.find(p => p.id === id)
  if (!post) return null
  
  return convertLegacyPostToContent(post)
}

/**
 * Get filtered and sorted blog posts
 */
export const getFilteredBlogPosts = (
  filters: BlogFilters = {},
  sort: BlogSortOptions = { sortBy: 'date', order: 'desc' }
): BlogPostMeta[] => {
  let posts = getAllBlogPosts()

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
export const getRelatedBlogPosts = (
  postId: string, 
  limit: number = 3
): BlogPostMeta[] => {
  const currentPost = blogPosts.find(p => p.id === postId)
  if (!currentPost) return []

  const allPosts = getAllBlogPosts().filter(p => p.id !== postId)
  
  // Score posts based on shared tags and category
  const scoredPosts = allPosts.map(post => {
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
export const getAllTags = (): string[] => {
  const tagSet = new Set<string>()
  blogPosts.forEach(post => {
    post.tags.forEach(tag => tagSet.add(tag))
  })
  return Array.from(tagSet).sort()
}

/**
 * Get all categories from blog posts
 */
export const getAllCategories = (): string[] => {
  const categorySet = new Set<string>()
  blogPosts.forEach(post => {
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

/**
 * Convert legacy blog post to new format
 */
const convertLegacyPost = (legacyPost: any): BlogPostMeta => {
  return {
    id: legacyPost.id,
    title: legacyPost.title,
    excerpt: legacyPost.excerpt,
    date: legacyPost.date,
    readTime: legacyPost.readTime,
    tags: legacyPost.tags,
    category: legacyPost.category,
    author: {
      name: 'Suryansh Singh',
      bio: 'Full-stack developer, researcher, and technology enthusiast focused on building impactful solutions.',
      avatar: '/images/profile.jpg', // You'll need to add this image
      social: {
        github: 'https://github.com/suryanshss',
        linkedin: 'https://linkedin.com/in/suryanshss',
        twitter: 'https://twitter.com/suryanshss'
      }
    },
    seo: {
      keywords: legacyPost.tags,
      metaDescription: legacyPost.excerpt
    },
    featured: false,
    draft: false,
    tableOfContents: true
  }
}

/**
 * Convert legacy blog post to content format
 */
const convertLegacyPostToContent = (legacyPost: any): BlogPostContent => {
  const meta = convertLegacyPost(legacyPost)
  
  // Convert content array to MDX string
  const mdxContent = legacyPost.content.join('\\n\\n')
  
  return {
    meta,
    content: mdxContent
  }
}