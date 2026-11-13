"use client";
import Link from "next/link";

import { usePlayer, formatTime } from "@/components/player-context";

import { type Track } from "@/lib/music";



export function TrackTimeline(){const {currentTime,duration,seek}=usePlayer();return <><div className="timeline-wrap" style={{"--progress":`${duration?currentTime/duration*100:0}%`} as React.CSSProperties}><div className="timeline-wave" aria-hidden="true"/><input className="playing-range" aria-label="Track progress" type="range" min="0" max={duration} value={currentTime} onChange={e=>seek(Number(e.target.value))}/></div><div className="time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></>; }
