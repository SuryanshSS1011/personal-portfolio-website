export const useAnimationVariants = () => {
  return {
    fadeInUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.8 }
    },
    fadeInLeft: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    },
    fadeInRight: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.6 }
    },
    staggerChildren: {
      animate: {
        transition: {
          staggerChildren: 0.1
        }
      }
    },
    listItem: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 }
    },
    scaleIn: {
      initial: { opacity: 0, scale: 0 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6 }
    },
    hoverScale: {
      whileHover: { scale: 1.05 },
      whileTap: { scale: 0.95 }
    },
    hoverLift: {
      whileHover: { y: -10 },
      transition: { type: "spring", stiffness: 300 }
    }
  }
}