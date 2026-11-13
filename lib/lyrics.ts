import { tracks } from "@/lib/music";

export type LyricLine = { time: number; text: string };

const dummyVerse = [
  "City lights are fading slow",
  "Echoes calling soft and low",
  "Every step I leave behind",
  "Still replaying in my mind",
  "Hold the moment, let it stay",
  "Till the night turns into day",
  "Oh, we're running out of time",
  "But your heartbeat's next to mine",
];

const dummyLyrics: LyricLine[] = Array.from({ length: 60 }, (_, index) => ({ time: index * 5, text: dummyVerse[index % dummyVerse.length] }));

// Keyed by track id; `time` is seconds from the start of the track.
export const lyrics: Record<string, LyricLine[]> = Object.fromEntries(tracks.map(track => [track.id, dummyLyrics]));
