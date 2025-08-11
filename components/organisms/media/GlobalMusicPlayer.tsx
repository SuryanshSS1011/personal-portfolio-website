"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { type MusicTrack } from "@/lib/music-tracks"
import { MusicReactiveParticles } from "@/components/atoms"
import { useAudioPlayer } from "@/hooks"
import { MusicPlayerHeader } from "./MusicPlayerHeader"
import { MusicPlayerControls } from "./MusicPlayerControls"
import { MusicPlayerPlaylist } from "./MusicPlayerPlaylist"
import { ErrorBoundary } from "@/components/atoms/error-handling"
import { logger } from "@/lib/logger"

interface GlobalMusicPlayerProps {
  isVisible: boolean
  onClose: () => void
  onPlayingChange: (playing: boolean) => void
  onToggleMusicRef: (toggleFn: () => void) => void
  currentTrack: MusicTrack
  nextTrack: () => void
  previousTrack: () => void
  selectTrack: (trackId: string) => void
  allTracks: MusicTrack[]
}

export const GlobalMusicPlayer = ({ 
  isVisible, 
  onClose, 
  onPlayingChange, 
  onToggleMusicRef,
  currentTrack,
  nextTrack,
  previousTrack,
  selectTrack,
  allTracks
}: GlobalMusicPlayerProps) => {
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  
  /**
   * Tracks whether the current track change was due to a natural track ending.
   * Used to determine if the next track should auto-play.
   */
  const wasPlayingRef = useRef(false)
  
  const {
    isPlaying,
    audioRef,
    toggleMusic,
    stopAndClose,
    handlePlay,
    handlePause
  } = useAudioPlayer()

  // Notify parent component when playing state changes
  useEffect(() => {
    onPlayingChange(isPlaying)
  }, [isPlaying, onPlayingChange])

  // Handle track changes and update audio source
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      // Update the audio source to the new track
      const audioElement = audioRef.current
      const source = audioElement.querySelector('source')
      if (source) {
        source.src = currentTrack.filename
      }
      audioElement.load()
      
      // Auto-play if this was a natural track ending
      if (wasPlayingRef.current) {
        audioElement.play().catch((error) => {
          logger.error('Failed to play after track change', { component: 'GlobalMusicPlayer' }, error)
        })
        wasPlayingRef.current = false // Reset the flag
      }
    }
  }, [currentTrack])


  // Expose toggle function to parent
  useEffect(() => {
    onToggleMusicRef(toggleMusic)
  }, [onToggleMusicRef, toggleMusic])

  const handleClose = () => {
    stopAndClose()
    onClose()
  }

  const handleSelectTrack = (trackId: string) => {
    selectTrack(trackId)
    setShowPlaylist(false)
  }

  /**
   * Handles the natural ending of a track (onEnded event).
   * Automatically advances to the next track and marks it for auto-play.
   * 
   * Note: If this handler is called, we can safely assume the track was playing,
   * since paused tracks cannot trigger the onEnded event.
   */
  const handleTrackEnded = () => {
    // Mark for auto-play since the track was naturally playing when it ended
    wasPlayingRef.current = true
    nextTrack()
  }

  if (!currentTrack) {
    return null
  }

  return (
    <ErrorBoundary>
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Hidden audio element */}
            <audio
              ref={audioRef}
              preload="metadata"
              onPlay={handlePlay}
              onPause={handlePause}
              onEnded={handleTrackEnded}
              crossOrigin="anonymous"
            >
              <source src={currentTrack.filename} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            {/* Music Player Popup */}
            <motion.div
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                height: "auto"
              }}
              exit={{ opacity: 0, y: 100, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed bottom-6 right-6 z-50 bg-background/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden"
              style={{ width: isMinimized ? "400px" : "280px" }}
            >
              <MusicPlayerHeader
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                isMinimized={isMinimized}
                showPlaylist={showPlaylist}
                onToggleMusic={toggleMusic}
                onToggleMinimized={() => setIsMinimized(!isMinimized)}
                onTogglePlaylist={() => setShowPlaylist(!showPlaylist)}
                onClose={handleClose}
              />

              {/* Controls - only show when not minimized */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <MusicPlayerControls
                      isPlaying={isPlaying}
                      showPlaylist={showPlaylist}
                      onToggleMusic={toggleMusic}
                      onPreviousTrack={previousTrack}
                      onNextTrack={nextTrack}
                      onTogglePlaylist={() => setShowPlaylist(!showPlaylist)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <MusicPlayerPlaylist
                allTracks={allTracks}
                currentTrack={currentTrack}
                isPlaying={isPlaying}
                showPlaylist={showPlaylist}
                onSelectTrack={handleSelectTrack}
              />

              {/* Enhanced floating particles when playing */}
              {isPlaying && (
                <>
                  {/* Music-reactive floating particles */}
                  <MusicReactiveParticles 
                    count={20}
                    musicReactive={true}
                    isPlaying={isPlaying}
                    className="absolute inset-0 z-10"
                    colors={[
                      "hsl(var(--primary))/60",
                      "hsl(var(--secondary))/50",
                      "hsl(var(--primary))/40",
                      "hsl(var(--secondary))/70"
                    ]}
                    sizeRange={[2, 6]}
                    opacityRange={[0.4, 0.8]}
                    durationRange={[3, 8]}
                  />
                  
                  {/* Original floating music notes */}
                  {!isMinimized && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={`floating-note-${i}`}
                          className="absolute text-primary/40 text-xs"
                          initial={{ 
                            x: "50%", 
                            y: "100%",
                            opacity: 0
                          }}
                          animate={{
                            x: `${15 + i * 20}%`,
                            y: "-20%",
                            opacity: [0, 1, 0],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 2 + i * 0.3,
                            repeat: Infinity,
                            delay: i * 0.5,
                            ease: "easeOut"
                          }}
                        >
                          {['♪', '♫', '♬', '♩', '♭'][i % 5]}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.div>
            
            {/* Global music-reactive particles that emanate from the player */}
            {isPlaying && (
              <div className="fixed inset-0 pointer-events-none z-40">
                <MusicReactiveParticles 
                  count={15}
                  musicReactive={true}
                  isPlaying={isPlaying}
                  colors={[
                    "hsl(var(--primary))/30",
                    "hsl(var(--secondary))/25",
                    "hsl(var(--primary))/20",
                    "hsl(var(--secondary))/35"
                  ]}
                  sizeRange={[3, 10]}
                  opacityRange={[0.2, 0.6]}
                  durationRange={[5, 15]}
                />
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  )
}