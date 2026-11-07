"use client";
import Link from "next/link";

import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { Heart, Play } from "lucide-react";
import { CoverArt } from "@/components/music-ui";


export function AlbumHeader({slug}:{slug:string}){
  const {play,toggleFavorite,isFavorite}=usePlayer();
  const album = tracks.find(track => track.album.toLowerCase().replaceAll(" ", "-") === decodeURIComponent(slug))?.album ?? "Echoes of Midnight";
  const albumTracks = tracks.filter(track => track.album === album);
  const albumSaved=albumTracks.length>0&&albumTracks.every(track=>isFavorite(track.id));
  const feature = albumTracks[0] ?? tracks[5];
return <div className="album-header"><CoverArt src={feature?.cover} alt={`${album} cover`}/><div><p className="eyebrow">ALBUM</p><h1>{album}</h1><p className="subheading">{feature?.artist ?? "Artist name"} · 2024 · {albumTracks.length || 8} songs</p><div className="album-actions"><button type="button" className="primary-button" onClick={()=>albumTracks[0]&&play(albumTracks[0])}><Play size={14} fill="currentColor" aria-hidden="true"/> Play</button><button type="button" className="outline-button" aria-pressed={albumSaved} onClick={()=>albumTracks.forEach(track=>{if(albumSaved)isFavorite(track.id)&&toggleFavorite(track.id);else !isFavorite(track.id)&&toggleFavorite(track.id)})}><Heart size={14} aria-hidden="true" fill={albumSaved?"currentColor":"none"}/> {albumSaved?"Saved":"Save album"}</button></div></div></div>; }