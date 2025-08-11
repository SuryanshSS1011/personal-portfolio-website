import { useEffect, useState } from "react"

/**
 * Hook to check if component is mounted
 * Useful for avoiding hydration mismatches in SSR applications
 */
export const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}