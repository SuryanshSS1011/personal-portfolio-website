"use client"

import { BlogPostMeta } from '@/data/blog-posts'
import { CalendarDays, Clock, User, Tag } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface BlogPostHeaderProps {
  meta: BlogPostMeta
  className?: string
}

export const BlogPostHeader = ({ meta, className = '' }: BlogPostHeaderProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const categoryColors = {
    Research: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    Development: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Tutorial: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    Insights: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  }

  return (
    <header className={`mb-12 ${className}`}>
      {/* Series info */}
      {meta.series && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
            <span>Part {meta.series.order} of {meta.series.totalParts}</span>
            <span>•</span>
            <span>{meta.series.name}</span>
          </div>
        </motion.div>
      )}

      {/* Title */}
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
      >
        {meta.title}
      </motion.h1>

      {/* Excerpt */}
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-xl text-muted-foreground mb-8 leading-relaxed"
      >
        {meta.excerpt}
      </motion.p>

      {/* Meta info */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap items-center gap-6 mb-8"
      >
        {/* Author */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-muted">
            <Image
              src={meta.author.avatar}
              alt={meta.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-medium text-sm">{meta.author.name}</div>
            <div className="text-xs text-muted-foreground">{meta.author.bio}</div>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <time dateTime={meta.date}>{formatDate(meta.date)}</time>
        </div>

        {/* Read time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{meta.readTime}</span>
        </div>

        {/* Category */}
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${categoryColors[meta.category]}`}>
          {meta.category}
        </div>

        {/* Featured badge */}
        {meta.featured && (
          <div className="px-3 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-sm font-medium rounded-full">
            Featured
          </div>
        )}
      </motion.div>

      {/* Tags */}
      {meta.tags.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {meta.tags.map((tag, index) => (
            <div 
              key={tag}
              className="flex items-center gap-1 px-3 py-1 bg-muted/50 text-muted-foreground text-sm rounded-md border border-border hover:bg-muted transition-colors"
            >
              <Tag className="w-3 h-3" />
              <span>{tag}</span>
            </div>
          ))}
        </motion.div>
      )}

      {/* Divider */}
      <hr className="border-border" />
    </header>
  )
}