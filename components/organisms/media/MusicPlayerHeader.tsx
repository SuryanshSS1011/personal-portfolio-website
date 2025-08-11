"use client"

import { motion } from "framer-motion"
import { Music, Play, Pause, Minimize2, Maximize2, X, List } from "lucide-react"
import { type MusicTrack } from "@/lib/music-tracks"

interface MusicPlayerHeaderProps {
  currentTrack: MusicTrack
  isPlaying: boolean
  isMinimized: boolean
  showPlaylist: boolean
  onToggleMusic: () => void
  onToggleMinimized: () => void
  onTogglePlaylist: () => void
  onClose: () => void
}

export const MusicPlayerHeader = ({
  currentTrack,
  isPlaying,
  isMinimized,
  showPlaylist,
  onToggleMusic,
  onToggleMinimized,
  onTogglePlaylist,
  onClose
}: MusicPlayerHeaderProps) => {
  return (
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
            onClick={onToggleMusic}
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
            onClick={onTogglePlaylist}
            className={`p-1 hover:bg-primary/10 rounded-lg transition-colors ${
              showPlaylist ? 'bg-primary/20' : ''
            }`}
            title="Playlist"
          >
            <List className="h-3 w-3 text-muted-foreground" />
          </button>
        )}
        
        <button
          onClick={onToggleMinimized}
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
          onClick={onClose}
          className="p-1 hover:bg-primary/10 rounded-lg transition-colors"
          title="Close"
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}