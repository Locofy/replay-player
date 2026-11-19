"use client";
import Link from "next/link";



import { tracks } from "@/lib/music";

import { PageHeading, SectionHeading, SongCard } from "@/components/music-ui";


import { CategoryGrid } from "@/components/library/category-grid";
export default function Categories() {
  return <>
    <PageHeading eyebrow="EXPLORE" title="Find your sound" description="Pick a mood and let the music take it from there."/>
    <CategoryGrid/>
    <SectionHeading title="Popular right now"/><div className="card-row">{tracks.slice(0, 6).map(track => <SongCard key={track.id} track={track}/>)}</div>
  </>;
}
