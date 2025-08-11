"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, Music, X, Volume2, Maximize2, Minimize2, SkipForward, SkipBack, List } from "lucide-react"
import { type MusicTrack, getNextTrack, getPreviousTrack, getTrackById } from "@/lib/music-tracks"
import { MusicReactiveParticles } from "@/components/atoms"

interface GlobalMusicPlayerProps {
  isVisible: boolean
  onClose: () => void
  onPlayingChange: (playing: boolean) => void
  onToggleMusicRef: (toggleFn: () => void) => void
  onNextTrackRef: (nextFn: () => void) => void
  onPreviousTrackRef: (previousFn: () => void) => void
  onSelectTrackRef: (selectFn: (trackId: string) => void) => void
  onTrackChange: (track: MusicTrack) => void
  currentTrack: MusicTrack
  allTracks: MusicTrack[]
}

export const GlobalMusicPlayer = ({ 
  isVisible, 
  onClose, 
  onPlayingChange, 
  onToggleMusicRef,
  onNextTrackRef,
  onPreviousTrackRef,
  onSelectTrackRef,
  onTrackChange,
  currentTrack,
  allTracks
}: GlobalMusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPlaylist, setShowPlaylist] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const toggleMusic = useCallback(async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause()
          setIsPlaying(false)
        } else {
          await audioRef.current.play()
          setIsPlaying(true)
        }
      } catch (error) {
        console.log('Audio play failed:', error)
        setIsPlaying(false)
      }
    }
  }, [isPlaying])

  // Notify parent component when playing state changes
  useEffect(() => {
    onPlayingChange(isPlaying)
  }, [isPlaying, onPlayingChange])

  const nextTrack = useCallback(() => {
    const next = getNextTrack(currentTrack.id)
    onTrackChange(next)
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [currentTrack.id, isPlaying, onTrackChange])

  const previousTrack = useCallback(() => {
    const previous = getPreviousTrack(currentTrack.id)
    onTrackChange(previous)
    if (audioRef.current) {
      audioRef.current.load()
      if (isPlaying) {
        audioRef.current.play().catch(console.error)
      }
    }
  }, [currentTrack.id, isPlaying, onTrackChange])

  const selectTrack = useCallback((trackId: string) => {
    const track = getTrackById(trackId)
    if (track) {
      onTrackChange(track)
      if (audioRef.current) {
        audioRef.current.load()
        if (isPlaying) {
          audioRef.current.play().catch(console.error)
        }
      }
    }
    setShowPlaylist(false)
  }, [isPlaying, onTrackChange])

  // Expose functions to parent
  useEffect(() => {
    onToggleMusicRef(toggleMusic)
    onNextTrackRef(nextTrack)
    onPreviousTrackRef(previousTrack)
    onSelectTrackRef(selectTrack)
  }, [onToggleMusicRef, onNextTrackRef, onPreviousTrackRef, onSelectTrackRef, toggleMusic, nextTrack, previousTrack, selectTrack])

  const handleClose = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
    onClose()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Hidden audio element */}
          <audio
            ref={audioRef}
            loop
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
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
              height: isMinimized ? "auto" : "auto"
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 bg-background/95 backdrop-blur-md border-2 border-primary/20 rounded-2xl shadow-2xl overflow-hidden"
            style={{ width: isMinimized ? "400px" : "280px" }}
          >
            {/* Header */}
            <div className={`flex items-center justify-between p-4 ${!isMinimized ? 'border-b border-primary/10' : ''}`}>
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{
                    duration: 2,
                    repeat: isPlaying ? Infinity : 0,
                    ease: "linear"
                  }}
                  className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center"
                >
                  <Music className="h-4 w-4 text-primary-foreground" />
                </motion.div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-foreground truncate">
                    {currentTrack.title}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {currentTrack.artist}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {/* Play/Pause button in minimized view */}
                {isMinimized && (
                  <motion.button
                    onClick={toggleMusic}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-md transition-colors"
                  >
                    <motion.div
                      key={isPlaying ? "pause" : "play"}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 ml-0.5" />
                      )}
                    </motion.div>
                  </motion.button>
                )}
                
                {/* Playlist button in minimized view */}
                {isMinimized && (
                  <button
                    onClick={() => setShowPlaylist(!showPlaylist)}
                    className={`p-1 hover:bg-primary/10 rounded-lg transition-colors ${
                      showPlaylist ? 'bg-primary/20' : ''
                    }`}
                    title="Playlist"
                  >
                    <List className="h-3 w-3 text-muted-foreground" />
                  </button>
                )}
                
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
                  title={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? (
                    <Maximize2 className="h-3 w-3 text-muted-foreground" />
                  ) : (
                    <Minimize2 className="h-3 w-3 text-muted-foreground" />
                  )}
                </button>
                <button
                  onClick={handleClose}
                  className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
                  title="Close"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              </div>
            </div>

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
                  <div className="p-4 space-y-4">
                    {/* Track Navigation Controls */}
                    <div className="flex items-center justify-center gap-4">
                      <motion.button
                        onClick={previousTrack}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-secondary/20 hover:bg-secondary/30 text-foreground rounded-full flex items-center justify-center transition-colors"
                        title="Previous Track"
                      >
                        <SkipBack className="h-4 w-4" />
                      </motion.button>
                      
                      <motion.button
                        onClick={toggleMusic}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-12 h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-colors"
                      >
                        <motion.div
                          key={isPlaying ? "pause" : "play"}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {isPlaying ? (
                            <Pause className="h-5 w-5" />
                          ) : (
                            <Play className="h-5 w-5 ml-0.5" />
                          )}
                        </motion.div>
                      </motion.button>
                      
                      <motion.button
                        onClick={nextTrack}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-10 h-10 bg-secondary/20 hover:bg-secondary/30 text-foreground rounded-full flex items-center justify-center transition-colors"
                        title="Next Track"
                      >
                        <SkipForward className="h-4 w-4" />
                      </motion.button>
                    </div>
                    
                    {/* Playlist Toggle */}
                    <div className="flex items-center justify-center">
                      <motion.button
                        onClick={() => setShowPlaylist(!showPlaylist)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          showPlaylist 
                            ? 'bg-primary/20 border-primary/40 text-primary' 
                            : 'bg-secondary/10 border-secondary/20 text-muted-foreground hover:bg-secondary/20'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <List className="h-4 w-4" />
                          <span className="text-xs font-medium">
                            {showPlaylist ? 'Hide Playlist' : 'Show Playlist'}
                          </span>
                        </div>
                      </motion.button>
                    </div>

                    {/* Status */}
                    <div className="text-center">
                      <motion.div
                        animate={{ opacity: isPlaying ? 1 : 0.6 }}
                        className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
                      >
                        <Volume2 className="h-3 w-3" />
                        <span>
                          {isPlaying ? "Now Playing" : "Paused"}
                        </span>
                        
                        {/* Sound waves indicator */}
                        {isPlaying && (
                          <div className="flex items-center gap-1 ml-2">
                            {[...Array(3)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="w-1 bg-primary rounded-full"
                                animate={{
                                  height: ["4px", "12px", "4px"]
                                }}
                                transition={{
                                  duration: 0.8,
                                  repeat: Infinity,
                                  delay: i * 0.2,
                                  ease: "easeInOut"
                                }}
                              />
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Playlist Dropdown */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-primary/10 overflow-hidden"
                >
                  <div className="p-3 max-h-48 overflow-y-auto">
                    <div className="text-xs font-medium text-muted-foreground mb-2 px-1">
                      Playlist ({allTracks.length} tracks)
                    </div>
                    <div className="space-y-1">
                      {allTracks.map((track) => (
                        <motion.button
                          key={track.id}
                          onClick={() => selectTrack(track.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`w-full text-left p-2 rounded-lg transition-colors ${
                            currentTrack.id === track.id
                              ? 'bg-primary/20 border border-primary/40'
                              : 'hover:bg-secondary/10 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${
                              currentTrack.id === track.id && isPlaying
                                ? 'bg-primary animate-pulse'
                                : currentTrack.id === track.id
                                ? 'bg-primary/60'
                                : 'bg-muted-foreground/30'
                            }`} />
                            <div className="min-w-0 flex-1">
                              <div className={`text-xs font-medium truncate ${
                                currentTrack.id === track.id ? 'text-primary' : 'text-foreground'
                              }`}>
                                {track.title}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {track.artist}
                              </div>
                            </div>
                            {track.duration && (
                              <div className="text-xs text-muted-foreground">
                                {track.duration}
                              </div>
                            )}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

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
  )
}