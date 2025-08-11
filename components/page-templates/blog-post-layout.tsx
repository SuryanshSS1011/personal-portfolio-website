"use client"

import { motion } from "framer-motion"
import { ArrowLeft, Clock, User, BookOpen } from "lucide-react"
import Link from "next/link"
import { Badge, CustomCursor } from "@/components/atoms"
import { MDXRenderer } from "@/components/organisms/blog/MDXRenderer"
import type { BlogPostContent, BlogPostMeta } from "@/types/blog"

interface BlogPostLayoutProps {
  postContent: BlogPostContent
}

export const BlogPostLayout = ({ postContent }: BlogPostLayoutProps) => {
  const { meta: post, content } = postContent
  
  const getCategoryColor = (category: BlogPostMeta["category"]) => {
    switch (category) {
      case "Research":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
      case "Development":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      case "Tutorial":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      case "Insights":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Badge 
                  variant="outline" 
                  className={getCategoryColor(post.category)}
                >
                  {post.category}
                </Badge>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-primary">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {post.excerpt}
              </p>
            </header>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <MDXRenderer content={content} />
            </motion.div>

            <footer className="mt-12 pt-8 border-t border-primary/10">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </footer>
          </article>
        </motion.div>
      </div>
    </div>
  )
}