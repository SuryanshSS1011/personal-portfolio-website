export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  extraSlow: 0.8,
} as const

export const ANIMATION_DELAYS = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
} as const

export const ANIMATION_DISTANCES = {
  small: 20,
  medium: 30,
  large: 50,
} as const

export const COMMON_VARIANTS = {
  fadeInUp: {
    hidden: { opacity: 0, y: ANIMATION_DISTANCES.medium },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -ANIMATION_DISTANCES.medium },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -ANIMATION_DISTANCES.medium },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: ANIMATION_DISTANCES.medium },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
  slideInLeft: {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
  slideInRight: {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  },
} as const

export const STAGGER_CONFIG = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: ANIMATION_DELAYS.short,
      },
    },
  },
  item: {
    hidden: { opacity: 0, y: ANIMATION_DISTANCES.small },
    visible: { opacity: 1, y: 0 },
  },
} as const

export const HOVER_SCALE = {
  small: 1.02,
  medium: 1.05,
  large: 1.1,
} as const