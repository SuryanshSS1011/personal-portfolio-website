"use client"

import { AlertCircle, CheckCircle, Info, AlertTriangle, Lightbulb } from 'lucide-react'
import { ReactNode } from 'react'

type CalloutType = 'info' | 'warning' | 'error' | 'success' | 'tip'

interface CalloutProps {
  type?: CalloutType
  title?: string
  children: ReactNode
  className?: string
}

const calloutConfig = {
  info: {
    icon: Info,
    className: 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950',
    iconClassName: 'text-blue-600 dark:text-blue-400',
    titleClassName: 'text-blue-900 dark:text-blue-100'
  },
  warning: {
    icon: AlertTriangle,
    className: 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950',
    iconClassName: 'text-yellow-600 dark:text-yellow-400',
    titleClassName: 'text-yellow-900 dark:text-yellow-100'
  },
  error: {
    icon: AlertCircle,
    className: 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950',
    iconClassName: 'text-red-600 dark:text-red-400',
    titleClassName: 'text-red-900 dark:text-red-100'
  },
  success: {
    icon: CheckCircle,
    className: 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950',
    iconClassName: 'text-green-600 dark:text-green-400',
    titleClassName: 'text-green-900 dark:text-green-100'
  },
  tip: {
    icon: Lightbulb,
    className: 'border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950',
    iconClassName: 'text-purple-600 dark:text-purple-400',
    titleClassName: 'text-purple-900 dark:text-purple-100'
  }
}

export const Callout = ({ 
  type = 'info', 
  title, 
  children, 
  className = '' 
}: CalloutProps) => {
  const config = calloutConfig[type]
  const Icon = config.icon
  
  const defaultTitle = {
    info: 'Info',
    warning: 'Warning',
    error: 'Error',
    success: 'Success',
    tip: 'Tip'
  }

  return (
    <div className={`border-l-4 p-4 my-6 rounded-r-lg ${config.className} ${className}`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${config.iconClassName}`} />
        <div className="flex-1">
          {(title || defaultTitle[type]) && (
            <div className={`font-semibold mb-2 ${config.titleClassName}`}>
              {title || defaultTitle[type]}
            </div>
          )}
          <div className="text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}