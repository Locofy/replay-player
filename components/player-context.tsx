"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { currentTrack, tracks, type Track } from "@/lib/music";

type PlayerContextValue = {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  favorites: string[];
  shuffle: boolean;
  repeat: boolean;
  play: (track: Track) => void;
  togglePlayback: () => void;
  next: () => void;
  previous: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
};
const PlayerContext = createContext<PlayerContextValue | null>(null);
const durationSeconds = (duration: string) => {
  const [minutes = "0", seconds = "0"] = duration.split(":");
  return Number(minutes) * 60 + Number(seconds);
};

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [track, setTrack] = useState<Track>(currentTrack);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(74);
  const [volume, setVolume] = useState(58);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => tracks.filter(item => item.favorite).map(item => item.id));
  const duration = durationSeconds(track.duration);

  const play = useCallback((nextTrack: Track) => {
    setTrack(nextTrack);
    setCurrentTime(0);
    setIsPlaying(true);
  }, []);
  const next = useCallback(() => {
    const currentIndex = tracks.findIndex(item => item.id === track.id);
    const nextIndex = shuffle ? (currentIndex + 1 + Math.floor(Math.random() * (tracks.length - 1))) % tracks.length : (currentIndex + 1) % tracks.length;
    play(tracks[nextIndex] ?? tracks[0]);
  }, [play, shuffle, track.id]);
  const previous = useCallback(() => {
    if (currentTime > 3) { setCurrentTime(0); return; }
    const currentIndex = tracks.findIndex(item => item.id === track.id);
    play(tracks[(currentIndex - 1 + tracks.length) % tracks.length] ?? tracks[0]);
  }, [currentTime, play, track.id]);
  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => setCurrentTime(time => {
      if (time + 1 >= duration) {
        if (repeat) return 0;
        window.setTimeout(() => next(), 0);
        return 0;
      }
      return time + 1;
    }), 1000);
    return () => window.clearInterval(timer);
  }, [duration, isPlaying, next, repeat]);

  const toggleFavorite = useCallback((id: string) => setFavorites(existing => existing.includes(id) ? existing.filter(item => item !== id) : [...existing, id]), []);
  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);
  const value = useMemo<PlayerContextValue>(() => ({
    currentTrack: track, isPlaying, currentTime, duration, volume, favorites, shuffle, repeat, play,
    togglePlayback: () => setIsPlaying(value => !value), next, previous,
    seek: time => setCurrentTime(Math.max(0, Math.min(duration, time))), setVolume,
    toggleFavorite, isFavorite, toggleShuffle: () => setShuffle(value => !value), toggleRepeat: () => setRepeat(value => !value),
  }), [track, isPlaying, currentTime, duration, volume, favorites, shuffle, repeat, play, next, previous, toggleFavorite, isFavorite]);
  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer() {
  const value = useContext(PlayerContext);
  if (!value) throw new Error("usePlayer must be used within PlayerProvider");
  return value;
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}
