"use client"

import { motion } from 'framer-motion'
import { MDXContent } from './MDXContent'

interface BlogPostContentProps {
  content: string
  className?: string
}

export const BlogPostContent = ({ content, className = '' }: BlogPostContentProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`prose prose-lg prose-neutral dark:prose-invert max-w-none mb-12 ${className}`}
    >
      <div className="blog-content">
        <MDXContent content={content} />
      </div>
    </motion.div>
  )
}