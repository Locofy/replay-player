"use client";
import Link from "next/link";

import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";

import { SectionHeading, SongList } from "@/components/music-ui";


import { FavoritesHeading } from "@/components/library/favorites-heading";
export default function Favorites() {
  const {favorites:favoriteIds,play}=usePlayer();
  const favorites = tracks.filter(track => favoriteIds.includes(track.id));
  return <div className="page-surface" style={{ backgroundColor: "var(--bg)", color: "var(--white)" }}>
    <FavoritesHeading/>
    <SectionHeading title="Your favorites" moreLabel=""/>
    <SongList items={favorites}/>
  </div>;
}
