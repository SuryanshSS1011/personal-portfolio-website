import { useState, useCallback } from "react"
import { logger } from "@/lib/logger"

interface UseCopyToClipboardOptions {
  resetDelay?: number
  onSuccess?: (text: string) => void
  onError?: (error: Error) => void
}

/**
 * Hook to copy text to clipboard with feedback state
 */
export const useCopyToClipboard = (options: UseCopyToClipboardOptions = {}) => {
  const { resetDelay = 2000, onSuccess, onError } = options
  const [isCopied, setIsCopied] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      setError(null)
      logger.userAction('copy_to_clipboard', 'CopyToClipboard', { textLength: text.length })
      
      if (onSuccess) {
        onSuccess(text)
      }

      // Reset after delay
      setTimeout(() => {
        setIsCopied(false)
      }, resetDelay)
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to copy')
      setError(error)
      setIsCopied(false)
      logger.error('Copy to clipboard failed', { component: 'CopyToClipboard' }, error)
      
      if (onError) {
        onError(error)
      }
    }
  }, [resetDelay, onSuccess, onError])

  return {
    copyToClipboard,
    isCopied,
    error
  }
}