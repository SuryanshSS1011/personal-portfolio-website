"use client"

import React, { useState } from 'react'
import { Play, RotateCcw, Code2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { CodeBlock } from './CodeBlock'

interface InteractiveDemoProps {
  title: string
  description?: string
  code: string
  component: () => React.ReactNode
  initialState?: any
  className?: string
}

export const InteractiveDemo = ({
  title,
  description,
  code,
  component: DemoComponent,
  initialState,
  className = ''
}: InteractiveDemoProps) => {
  const [showCode, setShowCode] = useState(false)
  const [key, setKey] = useState(0) // For resetting the demo

  const resetDemo = () => {
    setKey(prev => prev + 1)
  }

  return (
    <div className={`border border-border rounded-lg overflow-hidden my-8 ${className}`}>
      {/* Header */}
      <div className="bg-muted/30 border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-foreground">{title}</h4>
            {description && (
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={resetDemo}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-background rounded transition-colors"
              aria-label="Reset demo"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCode(!showCode)}
              className={`p-2 rounded transition-colors ${
                showCode 
                  ? 'bg-primary text-primary-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-background'
              }`}
              aria-label={showCode ? 'Hide code' : 'Show code'}
            >
              <Code2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Demo Area */}
      <div className="bg-background">
        <div className="p-6 min-h-[200px] flex items-center justify-center">
          <motion.div
            key={key}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            <DemoComponent />
          </motion.div>
        </div>

        {/* Code View */}
        <AnimatePresence>
          {showCode && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t border-border overflow-hidden"
            >
              <div className="p-4">
                <CodeBlock language="tsx" showLineNumbers={false}>
                  {code}
                </CodeBlock>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}