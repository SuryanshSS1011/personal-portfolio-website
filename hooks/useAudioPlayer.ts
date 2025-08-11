import { useState, useRef, useCallback, useEffect } from "react"
import { type MusicTrack, getNextTrack, getPreviousTrack, getTrackById } from "@/lib/music-tracks"
import { logger } from "@/lib/logger"

export const useAudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMusic = useCallback(async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        logger.userAction('music_pause', 'AudioPlayer', { track: currentTrack?.title })
      } else {
        await audioRef.current.play()
        setIsPlaying(true)
        logger.userAction('music_play', 'AudioPlayer', { track: currentTrack?.title })
      }
    } catch (error) {
      logger.error('Audio play failed', { component: 'AudioPlayer' }, error)
      setIsPlaying(false)
    }
  }, [isPlaying, currentTrack])

  const changeTrack = useCallback((track: MusicTrack) => {
    setCurrentTrack(track)
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch((error) => {
          logger.error('Audio play failed on track change', { component: 'AudioPlayer' }, error)
        })
      }
    }
    logger.userAction('track_change', 'AudioPlayer', { track: track.title })
  }, [isPlaying])

  const nextTrack = useCallback(() => {
    if (!currentTrack) return
    const next = getNextTrack(currentTrack.id)
    changeTrack(next)
  }, [currentTrack, changeTrack])

  const previousTrack = useCallback(() => {
    if (!currentTrack) return
    const previous = getPreviousTrack(currentTrack.id)
    changeTrack(previous)
  }, [currentTrack, changeTrack])

  const selectTrack = useCallback((trackId: string) => {
    const track = getTrackById(trackId)
    if (track) {
      changeTrack(track)
    }
  }, [changeTrack])

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
    currentTrack,
    audioRef,
    toggleMusic,
    nextTrack,
    previousTrack,
    selectTrack,
    stopAndClose,
    handlePlay,
    handlePause
  }
}