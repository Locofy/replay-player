"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { Play } from "lucide-react";
import { PageHeading, SongList } from "@/components/music-ui";


import { SongSortBar } from "@/components/library/song-sort-bar";
export default function Songs() {
  const [category,setCategory]=useState("All"),[sort,setSort]=useState("All tracks"); const {play}=usePlayer();
  useEffect(()=>{const value=new URLSearchParams(window.location.search).get("category");if(value)setCategory(value)},[]);
  const filtered=tracks.filter(t=>category==="All"||t.category===category); const popularity=["golden-days","fading-horizon","shadows-and-light","waves-of-time","echoes-of-midnight","city-lights","slow-motion","electric-dreams","whispers-in-the-night","stay-awake","blue-hour","warmth"]; const visible=sort==="Recently added"?[...filtered].reverse():sort==="Most played"?[...filtered].sort((a,b)=>popularity.indexOf(a.id)-popularity.indexOf(b.id)):filtered;
  return <div className="page-surface" style={{ backgroundColor: "var(--bg)", color: "var(--white)" }}><PageHeading eyebrow="YOUR LIBRARY" title={category==="All"?"All songs":category} description="A little something for every moment." action={<button type="button" className="primary-button" onClick={()=>filtered[0]&&play(filtered[0])}><Play size={14} fill="currentColor" aria-hidden="true"/> Play all</button>}/><SongSortBar sort={sort} onSort={setSort} count={visible.length}/><SongList items={visible}/></div>;
}
