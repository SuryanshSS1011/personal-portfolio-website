"use client"

import { createContext, useContext, useState, ReactNode, useCallback } from "react"
import { GlobalMusicPlayer } from "@/components/atoms"
import { type MusicTrack, musicTracks, getRandomTrack } from "@/lib/music-tracks"

interface MusicContextType {
  showMusicPlayer: () => void
  hideMusicPlayer: () => void
  toggleMusic: () => void
  nextTrack: () => void
  previousTrack: () => void
  selectTrack: (trackId: string) => void
  isVisible: boolean
  isPlaying: boolean
  currentTrack: MusicTrack
  allTracks: MusicTrack[]
}

const MusicContext = createContext<MusicContextType | undefined>(undefined)

export const useMusicPlayer = () => {
  const context = useContext(MusicContext)
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicProvider")
  }
  return context
}

interface MusicProviderProps {
  children: ReactNode
}

export const MusicProvider = ({ children }: MusicProviderProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(() => getRandomTrack())
  const [globalToggleMusic, setGlobalToggleMusic] = useState<(() => void) | null>(null)
  const [globalNextTrack, setGlobalNextTrack] = useState<(() => void) | null>(null)
  const [globalPreviousTrack, setGlobalPreviousTrack] = useState<(() => void) | null>(null)
  const [globalSelectTrack, setGlobalSelectTrack] = useState<((trackId: string) => void) | null>(null)

  const showMusicPlayer = useCallback(() => setIsVisible(true), [])
  const hideMusicPlayer = useCallback(() => setIsVisible(false), [])
  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsPlaying(prev => prev !== playing ? playing : prev)
  }, [])
  const handleToggleMusicRef = useCallback((toggleFn: () => void) => setGlobalToggleMusic(() => toggleFn), [])
  const handleNextTrackRef = useCallback((nextFn: () => void) => setGlobalNextTrack(() => nextFn), [])
  const handlePreviousTrackRef = useCallback((previousFn: () => void) => setGlobalPreviousTrack(() => previousFn), [])
  const handleSelectTrackRef = useCallback((selectFn: (trackId: string) => void) => setGlobalSelectTrack(() => selectFn), [])
  const handleTrackChange = useCallback((track: MusicTrack) => setCurrentTrack(track), [])
  
  const toggleMusic = () => {
    if (!isVisible) {
      setIsVisible(true)
    }
    if (globalToggleMusic) {
      globalToggleMusic()
    }
  }

  const nextTrack = () => {
    if (globalNextTrack) {
      globalNextTrack()
    }
  }

  const previousTrack = () => {
    if (globalPreviousTrack) {
      globalPreviousTrack()
    }
  }

  const selectTrack = (trackId: string) => {
    if (globalSelectTrack) {
      globalSelectTrack(trackId)
    }
  }

  return (
    <MusicContext.Provider value={{ 
      showMusicPlayer, 
      hideMusicPlayer, 
      toggleMusic, 
      nextTrack,
      previousTrack,
      selectTrack,
      isVisible, 
      isPlaying,
      currentTrack,
      allTracks: musicTracks
    }}>
      {children}
      <GlobalMusicPlayer 
        isVisible={isVisible} 
        onClose={hideMusicPlayer}
        onPlayingChange={handlePlayingChange}
        onToggleMusicRef={handleToggleMusicRef}
        onNextTrackRef={handleNextTrackRef}
        onPreviousTrackRef={handlePreviousTrackRef}
        onSelectTrackRef={handleSelectTrackRef}
        onTrackChange={handleTrackChange}
        currentTrack={currentTrack}
        allTracks={musicTracks}
      />
    </MusicContext.Provider>
  )
}