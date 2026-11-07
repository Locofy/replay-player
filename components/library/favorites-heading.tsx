"use client";
import Link from "next/link";

import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { Play } from "lucide-react";
import { HeartPlaceholder } from "@/components/music-ui";


export function FavoritesHeading(){ const {favorites:favoriteIds,play}=usePlayer(); const favorites=tracks.filter(track=>favoriteIds.includes(track.id)); return <div className="feature-heading"><HeartPlaceholder/><div><p className="eyebrow">YOUR COLLECTION</p><h1>Liked songs</h1><p className="subheading">{favorites.length} songs you want to keep close.</p><button className="primary-button" onClick={()=>favorites[0]&&play(favorites[0])}><Play size={14} fill="currentColor"/> Play favorites</button></div></div>; }