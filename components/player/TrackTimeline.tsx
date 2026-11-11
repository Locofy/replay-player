"use client";
import { usePlayer, formatTime } from "@/components/player-context";

const BARS = Array.from({ length: 56 }, (_, i) => 0.3 + 0.7 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.45)));

export function TrackTimeline(){const {currentTime,duration,seek,isPlaying}=usePlayer();const pct=duration?currentTime/duration*100:0;return <><div className={`wave-track${isPlaying?" is-playing":""}`}><div className="wave-bars" aria-hidden="true">{BARS.map((h,i)=><span key={i} className={i/BARS.length*100<pct?"played":undefined} style={{"--h":h,animationDelay:`${-(i*137)%900}ms`} as React.CSSProperties}/>)}</div><input className="playing-range wave-range" aria-label="Track progress" type="range" min="0" max={duration} value={currentTime} onChange={e=>seek(Number(e.target.value))}/></div><div className="time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div></>; }
