"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { motion } from 'framer-motion'

interface CodeBlockProps {
  children: string
  language?: string
  title?: string
  showLineNumbers?: boolean
  highlightLines?: number[]
  className?: string
}

export const CodeBlock = ({ 
  children, 
  language = 'text', 
  title,
  showLineNumbers = true,
  highlightLines = [],
  className = '' 
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(children)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const lines = children.split('\n')

  return (
    <div className="relative group mb-6">
      {title && (
        <div className="bg-muted border border-border border-b-0 px-4 py-2 text-sm font-medium text-muted-foreground rounded-t-lg">
          {title}
        </div>
      )}
      
      <div className={`relative bg-muted/50 border border-border ${title ? 'rounded-b-lg' : 'rounded-lg'} overflow-hidden ${className}`}>
        {/* Copy button */}
        <button
          onClick={copyToClipboard}
          className="absolute top-3 right-3 p-2 bg-background/80 hover:bg-background border border-border rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 text-green-500"
            >
              <Check className="w-4 h-4" />
            </motion.div>
          ) : (
            <Copy className="w-4 h-4 text-muted-foreground" />
          )}
        </button>

        {/* Language indicator */}
        {language !== 'text' && (
          <div className="absolute top-3 left-3 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded border border-primary/20">
            {language}
          </div>
        )}

        <pre className="overflow-x-auto p-4 text-sm">
          <code className="block">
            {showLineNumbers ? (
              <table className="w-full">
                <tbody>
                  {lines.map((line, index) => {
                    const lineNumber = index + 1
                    const isHighlighted = highlightLines.includes(lineNumber)
                    
                    return (
                      <tr key={index} className={isHighlighted ? 'bg-primary/10' : ''}>
                        <td className="select-none text-muted-foreground/60 text-right pr-4 w-8">
                          {lineNumber}
                        </td>
                        <td className="text-foreground">
                          {line || ' '}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            ) : (
              <span className="text-foreground">{children}</span>
            )}
          </code>
        </pre>
      </div>
    </div>
  )
}