"use client"

import { MDXRemote } from 'next-mdx-remote/rsc'
import { useMDXComponents } from '@/components/providers/mdx-components'
import remarkGfm from 'remark-gfm'
import remarkToc from 'remark-toc'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import 'highlight.js/styles/github-dark.css'

interface MDXContentProps {
  content: string
}

export const MDXContent = ({ content }: MDXContentProps) => {
  const components = useMDXComponents({})

  return (
    <div className="mdx-content">
      <MDXRemote 
        source={content}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm, remarkToc],
            rehypePlugins: [rehypeHighlight, rehypeSlug],
          },
        }}
        components={components}
      />
    </div>
  )
}