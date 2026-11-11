"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePlayer, formatTime } from "@/components/player-context";

import { tracks, type Track } from "@/lib/music";
import { ChevronDown, Heart } from "lucide-react";
import { CoverArt } from "@/components/music-ui";

import { PlaybackControls } from "@/components/player/PlaybackControls";

function ProgressRing() {
  const { currentTime, duration } = usePlayer();
  const r = 48, c = 2 * Math.PI * r, p = duration ? currentTime / duration : 0;
  return <svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r={r} className="sleeve-ring-track"/><circle cx="50" cy="50" r={r} className="sleeve-ring-fill" strokeDasharray={c} strokeDashoffset={c * (1 - p)}/></svg>;
}

function SleeveSeek() {
  const { currentTime, duration, seek } = usePlayer();
  const pct = duration ? currentTime / duration * 100 : 0;
  return <><input className="playing-range sleeve-range" aria-label="Track progress" type="range" min="0" max={duration} value={currentTime} style={{ "--progress": `${pct}%` } as React.CSSProperties} onChange={e => seek(Number(e.target.value))}/><div className="sleeve-time">{formatTime(currentTime)} / {formatTime(duration)}</div></>;
}

function TrackList({ title, items, current }: { title: string; items: Track[]; current: Track }) {
  const { play } = usePlayer();
  return <div className="sleeve-list"><p className="sleeve-list-title">{title}</p>{items.map(item => <Link key={item.id} href={`/playing/${item.id}`} onClick={() => play(item)} className={`sleeve-row${item.id === current.id ? " is-current" : ""}`}><CoverArt src={item.cover} alt={`${item.album} cover`}/><span><b>{item.title}</b><small>{item.artist}</small></span><em>{item.duration}</em></Link>)}</div>;
}

export function PlayingContent({ id }: { id: string }) {
  const routeTrack = tracks.find(item => item.id === id) ?? tracks[5];
  const { currentTrack: track, play, toggleFavorite, isFavorite } = usePlayer();
  useEffect(() => { if (routeTrack && routeTrack.id !== track.id) play(routeTrack); }, [id]);
  const index = tracks.findIndex(item => item.id === track.id);
  const album = tracks.filter(item => item.album === track.album).slice(0, 3);
  const then = Array.from({ length: 6 }, (_, k) => tracks[(index + 1 + k) % tracks.length]).filter(item => item.album !== track.album).slice(0, 4);
  const favorite = isFavorite(track.id);
  return <div className="playing-screen sleeve-screen">
    <Link href="/" className="back-link"><ChevronDown size={15}/> Back</Link>
    <div className="sleeve">
      <div>
        <div className="sleeve-disc"><ProgressRing/><CoverArt src={track.cover} alt={`${track.album} cover`}/><span className="sleeve-hole"/></div>
        <div className="sleeve-seek"><SleeveSeek/></div>
        <div className="sleeve-meta"><h1>{track.title}</h1><p className="subheading">{track.artist} · {track.album}</p><PlaybackControls/></div>
      </div>
      <aside className="sleeve-side">
        <TrackList title={`From ${track.album}`} items={album} current={track}/>
        {then.length > 0 && <TrackList title="Then" items={then} current={track}/>}
        <button type="button" className="sleeve-fav" aria-pressed={favorite} onClick={() => toggleFavorite(track.id)}><Heart size={14} fill={favorite ? "currentColor" : "none"} aria-hidden="true"/> {favorite ? "In favorites" : "Add to favorites"}</button>
      </aside>
    </div>
  </div>;
}
