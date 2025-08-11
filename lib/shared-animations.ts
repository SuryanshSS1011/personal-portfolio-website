import { type Variants } from "framer-motion"

/**
 * Shared animation patterns to eliminate duplication across components
 */

// Hover scale effects
export const HOVER_SCALES = {
  small: { scale: 1.02 },
  medium: { scale: 1.05 },
  large: { scale: 1.1 }
} as const

// Common transition durations
export const TRANSITIONS = {
  fast: "transition-all duration-150",
  normal: "transition-all duration-300",
  slow: "transition-all duration-500"
} as const

// Card styles with hover effects
export const CARD_STYLES = {
  base: "border-l-4 shadow-lg hover:shadow-xl transition-all duration-300",
  interactive: "border-l-4 border-l-primary shadow-lg hover:shadow-xl transition-all duration-300 border-primary/20 hover:border-primary/50",
  minimal: "shadow-sm hover:shadow-md transition-all duration-200"
} as const

// Button hover effects
export const BUTTON_EFFECTS = {
  scale: "transform hover:scale-[1.02] active:scale-[0.98]",
  shadow: "shadow-sm hover:shadow-md active:shadow-sm",
  combined: "shadow-sm hover:shadow-md active:shadow-sm transform hover:scale-[1.02] active:scale-[0.98]"
} as const

// Fade-in animation variants
export const FADE_IN_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6 }
  }
}

// Stagger children animation
export const STAGGER_CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

// Common animation configurations
export const ANIMATION_CONFIGS = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  fadeInWithDelay: (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay }
  }),
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.4 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.5 }
  }
} as const

// Default animation for cards and similar components
export const getCardAnimation = (index: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay: index * 0.1 },
  whileHover: HOVER_SCALES.small
})