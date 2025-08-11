"use client"

import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CustomCursor } from "@/components/atoms"
import { BlogPostRenderer } from "@/components/organisms/blog/BlogPostRenderer"
import { BlogPostMeta } from "@/data/blog-posts"

interface MDXBlogPostLayoutProps {
  meta: BlogPostMeta
  content: string
  relatedPosts?: BlogPostMeta[]
}

export const MDXBlogPostLayout = ({ meta, content, relatedPosts }: MDXBlogPostLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <CustomCursor />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <Link 
            href="/blogs"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to all posts
          </Link>

          <BlogPostRenderer 
            meta={meta}
            content={content}
            relatedPosts={relatedPosts}
          />
        </motion.div>
      </div>
    </div>
  )
}