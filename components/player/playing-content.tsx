"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { ChevronDown, Heart } from "lucide-react";
import { CoverArt } from "@/components/music-ui";

import { TrackTimeline } from "@/components/player/TrackTimeline";
import { PlaybackControls } from "@/components/player/PlaybackControls";
export function PlayingContent({ id }: { id: string }) {
  const routeTrack=tracks.find(item=>item.id===id)??tracks[5]; const {currentTrack,play,isPlaying,isFavorite,toggleFavorite}=usePlayer();
  useEffect(()=>{if(routeTrack&&routeTrack.id!==currentTrack.id)play(routeTrack)},[id]);
  const track=currentTrack;
  const next=tracks[(tracks.findIndex(item=>item.id===track.id)+1)%tracks.length];
  const favorite=isFavorite(track.id);
  return <div className="now-deck">
    <div className="tint" aria-hidden><CoverArt src={track.cover} alt=""/></div>
    <div className="now-deck-back"><Link href="/" className="back-link"><ChevronDown size={15}/> Back</Link></div>
    <div className="art"><div className={`vinyl${isPlaying?" on":""}`} aria-hidden/><div className="sleeve"><CoverArt src={track.cover} alt={`${track.album} cover`}/></div></div>
    <div className="info">
      <div className="titlerow"><div><h1>{track.title}</h1><p className="meta"><b>{track.artist}</b> · {track.album}</p></div>
        <button type="button" className="heart" aria-label={favorite?"Remove from favorites":"Add to favorites"} aria-pressed={favorite} onClick={()=>toggleFavorite(track.id)}><Heart size={18} fill={favorite?"currentColor":"none"}/></button></div>
      <div className="deck"><div className="tl"><TrackTimeline/></div><PlaybackControls/></div>
      {next&&<button type="button" className="upnext" onClick={()=>play(next)}><CoverArt src={next.cover} alt=""/><span><small>Up next</small><b>{next.title} · {next.artist}</b></span><em>{next.duration}</em></button>}
    </div>
  </div>;
}
