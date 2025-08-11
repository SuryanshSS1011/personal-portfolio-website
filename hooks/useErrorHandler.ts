import { useCallback, useState } from "react"

export interface ErrorState {
  error: Error | null
  isError: boolean
}

export const useErrorHandler = () => {
  const [errorState, setErrorState] = useState<ErrorState>({
    error: null,
    isError: false,
  })

  const handleError = useCallback((error: Error | string) => {
    const errorObj = typeof error === 'string' ? new Error(error) : error
    
    // Log error for development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by useErrorHandler:', errorObj)
    }

    setErrorState({
      error: errorObj,
      isError: true,
    })
  }, [])

  const clearError = useCallback(() => {
    setErrorState({
      error: null,
      isError: false,
    })
  }, [])

  const executeWithErrorHandler = useCallback(
    async <T>(asyncOperation: () => Promise<T> | T): Promise<T | null> => {
      try {
        clearError()
        const result = await asyncOperation()
        return result
      } catch (error) {
        handleError(error as Error)
        return null
      }
    },
    [clearError, handleError]
  )

  return {
    error: errorState.error,
    isError: errorState.isError,
    handleError,
    clearError,
    executeWithErrorHandler,
  }
}