export interface MusicTrack {
  id: string
  title: string
  artist: string
  filename: string
  duration?: string
}

export const musicTracks: MusicTrack[] = [
  {
    id: "autumn-scene",
    title: "Autumn Scene",
    artist: "Classical Piano",
    filename: "https://cktnd0jibycpui0q.public.blob.vercel-storage.com/autumn-scene.mp3",
    duration: "3:24"
  },
  {
    id: "meadow-waltz",
    title: "Meadow Waltz", 
    artist: "Classical Piano Orchestra",
    filename: "https://cktnd0jibycpui0q.public.blob.vercel-storage.com/meadow-waltz.mp3",
    duration: "4:12"
  },
  {
    id: "mozart-symphony-40",
    title: "Symphony No. 40 in G minor",
    artist: "W.A. Mozart",
    filename: "https://cktnd0jibycpui0q.public.blob.vercel-storage.com/mozart-symphony-40.mp3",
    duration: "8:45"
  }
]

export const getRandomTrack = (): MusicTrack => {
  const randomIndex = Math.floor(Math.random() * musicTracks.length)
  return musicTracks[randomIndex]
}

export const getTrackById = (id: string): MusicTrack | undefined => {
  return musicTracks.find(track => track.id === id)
}

export const getNextTrack = (currentTrackId: string): MusicTrack => {
  const currentIndex = musicTracks.findIndex(track => track.id === currentTrackId)
  const nextIndex = (currentIndex + 1) % musicTracks.length
  return musicTracks[nextIndex]
}

export const getPreviousTrack = (currentTrackId: string): MusicTrack => {
  const currentIndex = musicTracks.findIndex(track => track.id === currentTrackId)
  const previousIndex = currentIndex === 0 ? musicTracks.length - 1 : currentIndex - 1
  return musicTracks[previousIndex]
}