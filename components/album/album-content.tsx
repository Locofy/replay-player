"use client";
import Link from "next/link";

import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { ArrowLeft } from "lucide-react";
import { SectionHeading, SongList } from "@/components/music-ui";


import { AlbumHeader } from "@/components/album/album-header";
export function AlbumContent({ slug }: { slug: string }) {
  const {play,toggleFavorite,isFavorite}=usePlayer();
  const album = tracks.find(track => track.album.toLowerCase().replaceAll(" ", "-") === decodeURIComponent(slug))?.album ?? "Echoes of Midnight";
  const albumTracks = tracks.filter(track => track.album === album);
  const albumSaved=albumTracks.length>0&&albumTracks.every(track=>isFavorite(track.id));
  const feature = albumTracks[0] ?? tracks[5];
  return <>
    <Link href="/songs" className="back-link"><ArrowLeft size={14}/> Back to songs</Link>
    <AlbumHeader slug={slug}/>
    <div className="album-track-head"><SectionHeading title="Tracks" moreLabel=""/><span>3 hr 14 min</span></div>
    <SongList items={albumTracks.length ? albumTracks : tracks.slice(0, 6)}/>
  </>;
}
