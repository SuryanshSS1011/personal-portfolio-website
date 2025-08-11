"use client"

import { BlogPostMeta } from '@/data/blog-posts'
import { BlogPostHeader } from '@/components/molecules/blog/BlogPostHeader'
import { BlogPostContent } from '@/components/molecules/blog/BlogPostContent'
import { BlogPostFooter } from '@/components/molecules/blog/BlogPostFooter'
import { TableOfContents } from '@/components/molecules/blog/TableOfContents'
import { ErrorBoundary } from '@/components/atoms'
import { MDXProvider } from '@mdx-js/react'
import { useMDXComponents } from '@/components/providers/mdx-components'

interface BlogPostRendererProps {
  meta: BlogPostMeta
  content: string
  relatedPosts?: BlogPostMeta[]
  className?: string
}

export const BlogPostRenderer = ({
  meta,
  content,
  relatedPosts,
  className = ''
}: BlogPostRendererProps) => {
  const mdxComponents = useMDXComponents({})

  return (
    <ErrorBoundary>
      <article className={`max-w-4xl mx-auto ${className}`}>
        <div className="grid lg:grid-cols-[1fr_250px] gap-8">
          {/* Main Content */}
          <div className="min-w-0">
            <BlogPostHeader meta={meta} />
            
            <MDXProvider components={mdxComponents}>
              <BlogPostContent content={content} />
            </MDXProvider>
            
            <BlogPostFooter meta={meta} relatedPosts={relatedPosts} />
          </div>

          {/* Sidebar */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            {meta.tableOfContents && <TableOfContents />}
          </div>
        </div>
      </article>
    </ErrorBoundary>
  )
}