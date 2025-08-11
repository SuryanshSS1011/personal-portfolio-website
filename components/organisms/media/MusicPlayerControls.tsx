"use client"

import { motion } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, List } from "lucide-react"

interface MusicPlayerControlsProps {
  isPlaying: boolean
  showPlaylist: boolean
  onToggleMusic: () => void
  onPreviousTrack: () => void
  onNextTrack: () => void
  onTogglePlaylist: () => void
}

export const MusicPlayerControls = ({
  isPlaying,
  showPlaylist,
  onToggleMusic,
  onPreviousTrack,
  onNextTrack,
  onTogglePlaylist
}: MusicPlayerControlsProps) => {
  return (
    <div className="p-4 space-y-4">
      {/* Track Navigation Controls */}
      <div className="flex items-center justify-center gap-4">
        <motion.button
          onClick={onPreviousTrack}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-10 h-10 bg-secondary/20 hover:bg-secondary/30 text-foreground rounded-full flex items-center justify-center transition-colors"
          title="Previous Track"
        >
          <SkipBack className="h-4 w-4" />
        </motion.button>
        
        <motion.button
          onClick={onToggleMusic}
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
          onClick={onNextTrack}
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
          onClick={onTogglePlaylist}
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
  )
}