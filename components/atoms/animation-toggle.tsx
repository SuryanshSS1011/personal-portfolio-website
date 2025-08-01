"use client"

import { Button } from "./button"
import { Play, Pause } from "lucide-react"

interface AnimationToggleProps {
  isPlaying: boolean
  onToggle: () => void
}

export const AnimationToggle = ({ isPlaying, onToggle }: AnimationToggleProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="hover:bg-primary/20"
    >
      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
    </Button>
  )
}