"use client";
import Link from "next/link";

import { usePlayer, formatTime } from "@/components/player-context";

import { type Track } from "@/lib/music";




export function TrackTimeline(){const {currentTime,duration,seek,isPlaying}=usePlayer();return <><div className={`playing-timeline${isPlaying?" is-playing":""}`} style={{"--progress":`${duration?currentTime/duration*100:0}%`} as React.CSSProperties}><input className="playing-range" aria-label="Track progress" type="range" min="0" max={duration} value={currentTime} onChange={e=>seek(Number(e.target.value))}/><span className="playing-wave" aria-hidden="true"/></div><div className="time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></>; }