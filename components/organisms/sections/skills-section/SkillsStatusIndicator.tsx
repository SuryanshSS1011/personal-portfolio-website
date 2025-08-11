"use client"

interface SkillsStatusIndicatorProps {
  isAutoRotating: boolean
}

export const SkillsStatusIndicator = ({ isAutoRotating }: SkillsStatusIndicatorProps) => {
  return (
    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-xs text-muted-foreground">
      <div className={`w-2 h-2 rounded-full ${
        isAutoRotating ? 'bg-primary animate-pulse' : 'bg-muted'
      }`} />
      <span>{isAutoRotating ? 'Auto-rotating' : 'Paused'}</span>
    </div>
  )
}