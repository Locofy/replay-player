"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { ChevronDown } from "lucide-react";
import { CoverArt } from "@/components/music-ui";


import { TrackTimeline } from "@/components/player/TrackTimeline";
import { PlaybackControls } from "@/components/player/PlaybackControls";
import { PlayerActions } from "@/components/player/PlayerActions";
export function PlayingContent({ id }: { id: string }) {
  const routeTrack=tracks.find(item=>item.id===id)??tracks[5]; const {currentTrack,play}=usePlayer();
  useEffect(()=>{if(routeTrack&&routeTrack.id!==currentTrack.id)play(routeTrack)},[id]);
  const track=currentTrack;
  return <div className="playing-screen"><Link href="/" className="back-link"><ChevronDown size={15}/> Back</Link><div className="playing-card"><CoverArt src={track.cover} alt={`${track.album} cover`}/><p style={{ color: "var(--orange)" }} className="eyebrow">NOW PLAYING</p><h1>{track.title}</h1><p className="subheading">{track.artist} · {track.album}</p>
    <TrackTimeline/>
    <PlaybackControls/>
    <PlayerActions/>
  </div></div>;
}
