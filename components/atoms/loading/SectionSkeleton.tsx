"use client"

import { motion } from "framer-motion"

interface SectionSkeletonProps {
  height?: string
  showTitle?: boolean
}

export const SectionSkeleton = ({ 
  height = "400px", 
  showTitle = true 
}: SectionSkeletonProps) => {
  return (
    <div className="w-full py-16" style={{ minHeight: height }}>
      <div className="container mx-auto px-4">
        {showTitle && (
          <div className="text-center mb-12">
            <motion.div
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="h-12 bg-muted/30 rounded-lg mx-auto"
              style={{ width: "200px" }}
            />
          </div>
        )}
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1
              }}
              className="bg-muted/20 rounded-lg p-6 space-y-4"
            >
              <div className="h-4 bg-muted/30 rounded w-3/4" />
              <div className="h-3 bg-muted/20 rounded w-full" />
              <div className="h-3 bg-muted/20 rounded w-2/3" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}