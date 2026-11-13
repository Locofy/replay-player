"use client";
import Link from "next/link";
import { useState } from "react";
import { usePlayer } from "@/components/player-context";

import { tracks, type Track } from "@/lib/music";
import { Heart, ListMusic, MoreHorizontal } from "lucide-react";



export function PlayerActions(){const {currentTrack:track,toggleFavorite,isFavorite}=usePlayer(); const [queueOpen,setQueueOpen]=useState(false),[detailsOpen,setDetailsOpen]=useState(false); return <><div className="playing-bottom"><button type="button" aria-expanded={queueOpen} aria-controls="queue-panel" onClick={()=>setQueueOpen(open=>!open)}><ListMusic size={14} aria-hidden="true"/> Queue</button><button type="button" onClick={()=>toggleFavorite(track.id)} aria-pressed={isFavorite(track.id)}><Heart size={14} aria-hidden="true" fill={isFavorite(track.id)?"currentColor":"none"}/> {isFavorite(track.id)?"Added to favorites":"Add to favorites"}</button><button style={{ opacity: "0.8" }} type="button" aria-expanded={detailsOpen} aria-controls="track-details" onClick={()=>setDetailsOpen(open=>!open)}><MoreHorizontal size={16} aria-hidden="true"/> More</button></div><div className={`queue-panel ${queueOpen?"queue-open":""}`} id="queue-panel" aria-labelledby="queue-heading"><b id="queue-heading">Up next</b><p>{tracks[(tracks.findIndex(item=>item.id===track.id)+1)%tracks.length]?.title} · {tracks[(tracks.findIndex(item=>item.id===track.id)+1)%tracks.length]?.artist}</p></div><div className={`queue-panel details-panel ${detailsOpen?"queue-open":""}`} id="track-details" aria-labelledby="details-heading"><b id="details-heading">Track details</b><p>{track.title} · {track.artist} · {track.album} · {track.category}</p></div></>; }