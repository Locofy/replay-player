"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { usePlayer } from "@/components/player-context";
import { CategoryChips, CoverArt, EmptyState, PlaylistTile, SectionHeading, SongCard } from "@/components/music-ui";
import { playlists, tracks, type Track } from "@/lib/music";

const featuredTracks = tracks.map(track => track.id === "echoes-of-midnight" ? { ...track, cover: "/covers/13.png" } : track);
const initialFeaturedIndex = featuredTracks.findIndex(track => track.id === "echoes-of-midnight");

export function FeaturedCarousel() {
  const [index, setIndex] = useState(initialFeaturedIndex);
  const touchStart = useRef<number | null>(null);
  const track = featuredTracks[index] ?? featuredTracks[initialFeaturedIndex];
  const move = (step: number) => setIndex(current => (current + step + featuredTracks.length) % featuredTracks.length);
  const select = (nextIndex: number) => setIndex((nextIndex + featuredTracks.length) % featuredTracks.length);


  return <section style={{ flexDirection: "row" }} className="hero" aria-roledescription="carousel" aria-label="Featured songs" onTouchStart={event => { touchStart.current = event.touches[0]?.clientX ?? null; }} onTouchEnd={event => { if (touchStart.current === null) return; const distance = (event.changedTouches[0]?.clientX ?? touchStart.current) - touchStart.current; if (Math.abs(distance) > 42) move(distance < 0 ? 1 : -1); touchStart.current = null; }}>
    <CarouselPreviews side="left" index={index} onSelect={select}/>
    <CoverArt key={track.id} className="hero-main" src={track.cover} alt={`${track.album} album cover`}/>
    <CarouselCaption track={track}/>
    <CarouselPreviews side="right" index={index} onSelect={select}/>
    <button type="button" className="hero-arrow hero-arrow-prev" aria-label="Previous featured song" onClick={() => move(-1)}><ChevronLeft size={20}/></button>
    <button type="button" className="hero-arrow hero-arrow-next" aria-label="Next featured song" onClick={() => move(1)}><ChevronRight size={20}/></button>
  </section>;
}

export function HomeCategoryPicker({ onSelect }: { onSelect: (category: string) => void }) {
  return <section className="category-section"><SectionHeading title="Select Categories" moreLabel=""/><CategoryChips initialValue="All" onSelect={onSelect}/></section>;
}

export function PopularSongsSection({ category = "All" }: { category?: string }) {
  const visibleTracks = tracks.filter(track => category === "All" || track.category === category);
  return <section><SectionHeading title={category === "All" ? "Popular songs" : `${category} songs`}/>{visibleTracks.length ? <div className="card-row">{visibleTracks.slice(0, 7).map(track => <SongCard key={track.id} track={track}/>)}</div> : <EmptyState title={`No ${category.toLowerCase()} songs yet`} description="Try another category to find something to play."/>}</section>;
}

export function MoodPlaylistsSection() {
  return <section className="lower-home"><SectionHeading title="Made for your mood"/><div className="playlist-grid">{playlists.slice(0, 4).map((title, i) => <PlaylistTile key={title} title={title} description={`${18 + i * 2} tracks · Curated for you`} cover={tracks[i]?.cover}/>)}</div></section>;
}

function CarouselCaption({track}:{track:Track}) { const {play}=usePlayer(); return <div style={{ borderColor: "rgb(66, 66, 66)" }} className="hero-caption"><span aria-live="polite" aria-atomic="true"><b>{track.title}</b><small>{track.artist}</small></span><Link href={`/playing/${track.id}`} className="hero-play" aria-label={`Play ${track.title}`} onClick={() => play(track)}><Play size={14} fill="currentColor" aria-hidden="true"/></Link></div>; }

function CarouselPreview({track,position,onSelect}:{track:Track;position:number;onSelect:()=>void}) {
 return <button type="button" className={`hero-small h${position}`} aria-label={`Show ${track.title}`} onClick={onSelect}><CoverArt className="hero-small-art" src={track.cover} alt=""/></button>;
}
function CarouselPreviews({side,index,onSelect}:{side:"left"|"right";index:number;onSelect:(index:number)=>void}) {
 const offsets=side==="left"?[-4,-3,-2,-1]:[1,2,3,4];
 return <div className={`hero-side hero-${side}`}>{offsets.map((offset,position)=><CarouselPreview key={offset} track={featuredTracks[(index+offset+featuredTracks.length)%featuredTracks.length]} position={position} onSelect={()=>onSelect(index+offset)}/>)}</div>;
}
