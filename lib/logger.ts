type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogContext {
  component?: string
  action?: string
  userId?: string
  error?: string
  stack?: string
  timestamp?: number
  operation?: string
  duration?: string
  [key: string]: string | number | boolean | undefined
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development'
  private isClient = typeof window !== 'undefined'

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString()
    const contextStr = context ? ` [${JSON.stringify(context)}]` : ''
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`
  }

  private log(level: LogLevel, message: string, context?: LogContext, data?: unknown) {
    if (!this.isDevelopment && level === 'debug') {
      return
    }

    const formattedMessage = this.formatMessage(level, message, context)

    if (this.isClient) {
      // Browser logging
      switch (level) {
        case 'error':
          console.error(formattedMessage, data)
          break
        case 'warn':
          console.warn(formattedMessage, data)
          break
        case 'info':
          console.info(formattedMessage, data)
          break
        case 'debug':
          console.debug(formattedMessage, data)
          break
      }
    } else {
      // Server-side logging
      console.log(formattedMessage, data)
    }

    // In production, you might want to send logs to a service
    // if (!this.isDevelopment && level === 'error') {
    //   this.sendToLoggingService(level, message, context, data)
    // }
  }

  info(message: string, context?: LogContext, data?: unknown) {
    this.log('info', message, context, data)
  }

  warn(message: string, context?: LogContext, data?: unknown) {
    this.log('warn', message, context, data)
  }

  error(message: string, context?: LogContext, data?: unknown) {
    this.log('error', message, context, data)
  }

  debug(message: string, context?: LogContext, data?: unknown) {
    this.log('debug', message, context, data)
  }

  // Specialized methods for common use cases
  componentError(component: string, error: Error, additionalContext?: LogContext) {
    this.error(`Component error in ${component}`, {
      component,
      error: error.message,
      stack: error.stack,
      ...additionalContext
    })
  }

  userAction(action: string, component?: string, additionalData?: unknown) {
    this.info(`User action: ${action}`, {
      component,
      action,
      timestamp: Date.now()
    }, additionalData)
  }

  performance(operation: string, duration: number, component?: string) {
    this.debug(`Performance: ${operation}`, {
      component,
      operation,
      duration: `${duration}ms`
    })
  }

  // Placeholder for external logging service integration
  // private sendToLoggingService(level: LogLevel, message: string, context?: LogContext, data?: unknown) {
  //   // Send to external service like Sentry, LogRocket, etc.
  // }
}

export const logger = new Logger()