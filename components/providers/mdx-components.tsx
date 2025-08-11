"use client"

import React from 'react'
import { MDXComponents } from 'mdx/types'
import { CodeBlock } from '@/components/atoms/blog/CodeBlock'
import { Callout } from '@/components/atoms/blog/Callout'
import { InteractiveDemo } from '@/components/atoms/blog/InteractiveDemo'

// Make React available globally for MDX
if (typeof window !== 'undefined') {
  (window as any).React = React
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allow customizing built-in components
    h1: ({ children, ...props }) => (
      <h1 className="text-4xl font-bold mb-6 text-foreground" {...props}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 className="text-3xl font-semibold mb-4 mt-8 text-foreground" {...props}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 className="text-2xl font-medium mb-3 mt-6 text-foreground" {...props}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p className="mb-4 leading-relaxed text-muted-foreground" {...props}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a 
        href={href}
        className="text-primary hover:text-primary/80 underline underline-offset-2 transition-colors"
        target={href?.startsWith('http') ? '_blank' : undefined}
        rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-4 pl-6 space-y-2 list-disc" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-4 pl-6 space-y-2 list-decimal" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }) => (
      <li className="text-muted-foreground" {...props}>
        {children}
      </li>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote 
        className="border-l-4 border-primary/30 pl-4 py-2 my-6 italic bg-muted/50 rounded-r"
        {...props}
      >
        {children}
      </blockquote>
    ),
    code: ({ children, className, ...props }) => {
      // If it's a code block (has className with language)
      if (className?.includes('language-')) {
        const language = className.replace('language-', '')
        return (
          <CodeBlock language={language} {...props}>
            {String(children).replace(/\n$/, '')}
          </CodeBlock>
        )
      }
      
      // Inline code
      return (
        <code 
          className="bg-muted px-2 py-1 rounded text-sm font-mono text-primary"
          {...props}
        >
          {children}
        </code>
      )
    },
    pre: ({ children, ...props }) => (
      <div className="mb-6">
        {children}
      </div>
    ),
    hr: (props) => (
      <hr className="my-8 border-border" {...props} />
    ),
    table: ({ children, ...props }) => (
      <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse border border-border rounded-lg" {...props}>
          {children}
        </table>
      </div>
    ),
    th: ({ children, ...props }) => (
      <th className="border border-border px-4 py-2 bg-muted text-left font-semibold" {...props}>
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-border px-4 py-2" {...props}>
        {children}
      </td>
    ),
    // Custom components
    CodeBlock,
    Callout,
    InteractiveDemo,
    ...components,
  }
}