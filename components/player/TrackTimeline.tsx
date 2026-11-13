"use client";
import Link from "next/link";

import { usePlayer, formatTime } from "@/components/player-context";

import { type Track } from "@/lib/music";




export function TrackTimeline(){const {currentTime,duration,seek}=usePlayer();const progress=`${duration?currentTime/duration*100:0}%`;return <><div className="progress-zigzag" style={{"--progress":progress} as React.CSSProperties}><span className="progress-zigzag-fill" aria-hidden/><input className="playing-range" aria-label="Track progress" type="range" min="0" max={duration} value={currentTime} onChange={e=>seek(Number(e.target.value))} style={{"--progress":progress} as React.CSSProperties}/></div><div className="time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></>; }