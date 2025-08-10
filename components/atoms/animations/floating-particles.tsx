"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Particle {
  id: string
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  color: string
}

interface FloatingParticlesProps {
  count?: number
  musicReactive?: boolean
  isPlaying?: boolean
  className?: string
  colors?: string[]
  sizeRange?: [number, number]
  opacityRange?: [number, number]
  durationRange?: [number, number]
}

export const FloatingParticles = ({
  count = 20,
  musicReactive = false,
  isPlaying = false,
  className = "",
  colors = ["hsl(var(--primary))", "hsl(var(--secondary))", "hsl(var(--primary))/60", "hsl(var(--secondary))/40"],
  sizeRange = [2, 8],
  opacityRange = [0.2, 0.6],
  durationRange = [15, 30]
}: FloatingParticlesProps) => {
  const [particles, setParticles] = useState<Particle[]>([])

  const generateParticle = (id?: string): Particle => ({
    id: id || Math.random().toString(36).substr(2, 9),
    x: Math.random() * 100,
    y: Math.random() * 200, // Distribute particles across 200% height
    size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
    opacity: Math.random() * (opacityRange[1] - opacityRange[0]) + opacityRange[0],
    duration: Math.random() * (durationRange[1] - durationRange[0]) + durationRange[0],
    delay: Math.random() * 5,
    color: colors[Math.floor(Math.random() * colors.length)]
  })

  useEffect(() => {
    const initialParticles = Array.from({ length: count }, () => generateParticle())
    setParticles(initialParticles)
  }, [count])

  // Add more particles when music is playing
  useEffect(() => {
    if (musicReactive && isPlaying) {
      const musicParticleCount = Math.floor(count * 0.5) // Add 50% more particles
      const musicParticles = Array.from({ length: musicParticleCount }, () => ({
        ...generateParticle(),
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 4, // Slightly larger particles for music
        opacity: Math.random() * 0.4 + 0.3, // More visible particles
        duration: Math.random() * 10 + 8 // Faster movement
      }))
      
      setParticles(prev => [...prev, ...musicParticles])

      // Remove music particles after a delay
      const cleanup = setTimeout(() => {
        setParticles(prev => prev.slice(0, count))
      }, 3000)

      return () => clearTimeout(cleanup)
    }
  }, [musicReactive, isPlaying, count, colors])

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`} style={{ minHeight: '200vh' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            opacity: particle.opacity
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity, particle.opacity * 0.3]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Additional pulsing particles for music reactive mode */}
      {musicReactive && isPlaying && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`music-pulse-${i}`}
              className="absolute rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors[i % colors.length]}, transparent)`,
                width: 20,
                height: 20,
                left: `${20 + (i * 10)}%`,
                top: `${30 + Math.sin(i) * 20}%`,
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0.3, 0.7, 0.3],
                x: [0, Math.sin(i * 2) * 30],
                y: [0, Math.cos(i * 2) * 30]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </>
      )}
    </div>
  )
}