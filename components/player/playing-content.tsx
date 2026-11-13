"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { ChevronDown, Heart, MicVocal } from "lucide-react";
import { CoverArt } from "@/components/music-ui";

import { TrackTimeline } from "@/components/player/TrackTimeline";
import { PlaybackControls } from "@/components/player/PlaybackControls";
import { LiveLyrics } from "@/components/player/LiveLyrics";

export function PlayingContent({ id }: { id: string }) {
  const routeTrack = tracks.find(item => item.id === id) ?? tracks[5];
  const { currentTrack: track, play, toggleFavorite, isFavorite } = usePlayer();
  const [showLyrics, setShowLyrics] = useState(true);
  useEffect(() => { if (routeTrack && routeTrack.id !== track.id) play(routeTrack); }, [id]);
  const next = tracks[(tracks.findIndex(item => item.id === track.id) + 1) % tracks.length];
  const favorite = isFavorite(track.id);
  return <div className="split-player" style={{ "--cover": `url(${track.cover})` } as React.CSSProperties}>
    <div className="split-glow" aria-hidden="true" />
    <div className="split-top">
      <Link href="/" className="split-back"><ChevronDown size={15} /> Back</Link>
      <span className="split-up">Up next: {next.title} · {next.artist}</span>
    </div>
    <div className={`split-body${showLyrics ? "" : " no-lyrics"}`}>
      <div className="split-main">
        <CoverArt src={track.cover} alt={`${track.album} cover`} />
        <div className="split-meta">
          <div><h1>{track.title}</h1><p>{track.artist} · {track.album}</p></div>
          <button type="button" className="split-fav" aria-pressed={favorite} aria-label={favorite ? "Remove from favorites" : "Add to favorites"} onClick={() => toggleFavorite(track.id)}><Heart size={18} fill={favorite ? "currentColor" : "none"} /></button>
        </div>
        <div><TrackTimeline /></div>
        <PlaybackControls />
        <button type="button" className="split-lyrics-toggle" aria-pressed={showLyrics} onClick={() => setShowLyrics(value => !value)}><MicVocal size={14} /> {showLyrics ? "Hide lyrics" : "Show lyrics"}</button>
      </div>
      {showLyrics && <section className="split-lyrics" aria-label="Lyrics"><LiveLyrics /></section>}
    </div>
  </div>;
}
