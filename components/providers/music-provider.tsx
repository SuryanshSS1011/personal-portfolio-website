"use client"

import { createContext, useContext, useState, ReactNode, useCallback, useRef } from "react"
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
  const toggleMusicRef = useRef<(() => void) | null>(null)

  const showMusicPlayer = useCallback(() => setIsVisible(true), [])
  const hideMusicPlayer = useCallback(() => setIsVisible(false), [])
  
  const handlePlayingChange = useCallback((playing: boolean) => {
    setIsPlaying(playing)
  }, [])
  
  const toggleMusic = useCallback(() => {
    if (!isVisible) {
      setIsVisible(true)
    }
    if (toggleMusicRef.current) {
      toggleMusicRef.current()
    }
  }, [isVisible])

  const nextTrack = useCallback(() => {
    const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id)
    const nextIndex = (currentIndex + 1) % musicTracks.length
    setCurrentTrack(musicTracks[nextIndex])
  }, [currentTrack])

  const previousTrack = useCallback(() => {
    const currentIndex = musicTracks.findIndex(track => track.id === currentTrack.id)
    const previousIndex = currentIndex === 0 ? musicTracks.length - 1 : currentIndex - 1
    setCurrentTrack(musicTracks[previousIndex])
  }, [currentTrack])

  const selectTrack = useCallback((trackId: string) => {
    const track = musicTracks.find(t => t.id === trackId)
    if (track) {
      setCurrentTrack(track)
    }
  }, [])

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
        onToggleMusicRef={(fn) => { toggleMusicRef.current = fn }}
        currentTrack={currentTrack}
        nextTrack={nextTrack}
        previousTrack={previousTrack}
        selectTrack={selectTrack}
        allTracks={musicTracks}
      />
    </MusicContext.Provider>
  )
}