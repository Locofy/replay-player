"use client";
import { usePlayer } from "@/components/player-context";

const BARS = Array.from({ length: 48 }, (_, i) => ({
  duration: 0.7 + ((i * 37) % 11) / 10,
  delay: -((i * 53) % 17) / 10,
  peak: 0.35 + (((i * 29) % 13) / 13) * 0.65,
}));

export function Visualiser() {
  const { isPlaying } = usePlayer();
  return <div className={`visualiser${isPlaying ? " is-playing" : ""}`} aria-hidden="true">
    {BARS.map((bar, i) => <span key={i} style={{ "--d": `${bar.duration}s`, "--delay": `${bar.delay}s`, "--peak": bar.peak } as React.CSSProperties}/>)}
  </div>;
}
