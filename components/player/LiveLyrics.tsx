"use client";
import { usePlayer } from "@/components/player-context";
import { lyrics } from "@/lib/lyrics";

export function LiveLyrics({ visible = 7 }: { visible?: number }) {
  const { currentTrack, currentTime } = usePlayer();
  const lines = lyrics[currentTrack.id] ?? [];
  if (!lines.length) return <p className="live-lyrics-empty">Lyrics aren&apos;t available for this track.</p>;
  let active = 0;
  lines.forEach((line, index) => { if (line.time <= currentTime) active = index; });
  const start = Math.max(0, active - 2);
  return <ol className="live-lyrics" aria-label="Lyrics">
    {lines.slice(start, start + visible).map((line, offset) => {
      const index = start + offset;
      const distance = Math.abs(index - active);
      return <li key={`${line.time}-${index}`} aria-current={index === active ? "true" : undefined} className={index === active ? "lyric-active" : distance === 1 ? "lyric-near" : undefined}>{line.text}</li>;
    })}
  </ol>;
}
