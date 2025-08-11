"use client"

import { motion, AnimatePresence } from "framer-motion"
import { type MusicTrack } from "@/lib/music-tracks"

interface MusicPlayerPlaylistProps {
  allTracks: MusicTrack[]
  currentTrack: MusicTrack
  isPlaying: boolean
  showPlaylist: boolean
  onSelectTrack: (trackId: string) => void
}

export const MusicPlayerPlaylist = ({
  allTracks,
  currentTrack,
  isPlaying,
  showPlaylist,
  onSelectTrack
}: MusicPlayerPlaylistProps) => {
  return (
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
                  onClick={() => onSelectTrack(track.id)}
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
  )
}