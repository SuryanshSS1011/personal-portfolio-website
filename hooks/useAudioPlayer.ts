import { useState, useRef, useCallback } from "react"
import { logger } from "@/lib/logger"

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMusic = useCallback(async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        logger.userAction('music_pause', 'AudioPlayer')
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
        logger.userAction('music_play', 'AudioPlayer')
      }
    } catch (error) {
      logger.error('Audio play failed', { component: 'AudioPlayer' }, error)
      setIsPlaying(false)
    }
  }, [isPlaying])

  const stopAndClose = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    logger.userAction('music_stop_and_close', 'AudioPlayer')
  }, [])

  // Handle audio events
  const handlePlay = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const handlePause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  return {
    isPlaying,
    audioRef,
    toggleMusic,
    stopAndClose,
    handlePlay,
    handlePause
  }
}