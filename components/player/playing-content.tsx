"use client";
import Link from "next/link";
import { useEffect } from "react";
import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { ChevronDown, Heart } from "lucide-react";
import { CoverArt } from "@/components/music-ui";


import { TrackTimeline } from "@/components/player/TrackTimeline";
import { PlaybackControls } from "@/components/player/PlaybackControls";
import { UploadButton } from "@/components/player/upload-modal";
export function PlayingContent({ id }: { id: string }) {
  const {currentTrack,play,toggleFavorite,isFavorite,library}=usePlayer(); const routeTrack=library.find(item=>item.id===id)??tracks[5];
  useEffect(()=>{if(routeTrack&&routeTrack.id!==currentTrack.id)play(routeTrack)},[id]);
  const track=currentTrack;
  const next=library[(library.findIndex(item=>item.id===track.id)+1)%library.length];
  const favorite=isFavorite(track.id);
  return <div className="playing-screen playing-spread-screen"><Link href="/" className="back-link"><ChevronDown size={15}/> Back</Link><UploadButton/>
    <div className="playing-spread">
      <div className="playing-spread-art"><CoverArt src={track.cover} alt={`${track.album} cover`}/></div>
      <div className="playing-spread-info">
        <p className="playing-spread-artist">{track.artist}</p>
        <h1>{track.title}</h1>
        <p className="subheading">From {track.album} · {track.category}</p>
        <TrackTimeline/>
        <PlaybackControls/>
        <div className="playing-spread-foot">
          <Link href={`/playing/${next.id}`} onClick={()=>play(next)} className="playing-spread-next">
            <CoverArt src={next.cover} alt={`${next.album} cover`}/>
            <span><small>Up next</small><b>{next.title} · {next.artist}</b></span>
          </Link>
          <button type="button" className="playing-spread-fav" aria-pressed={favorite} onClick={()=>toggleFavorite(track.id)}><Heart size={14} fill={favorite?"currentColor":"none"}/> {favorite?"In favorites":"Add to favorites"}</button>
        </div>
      </div>
    </div>
  </div>;
}
