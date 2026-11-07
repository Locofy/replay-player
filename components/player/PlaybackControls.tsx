"use client";
import Link from "next/link";

import { usePlayer } from "@/components/player-context";


import { Pause, Play, Repeat2, Shuffle, SkipBack, SkipForward } from "lucide-react";



export function PlaybackControls(){const {shuffle,repeat,toggleShuffle,toggleRepeat,previous,next,isPlaying,togglePlayback}=usePlayer();return <><div className="big-controls"><button className={shuffle?"control-active":""} aria-label={shuffle?"Disable shuffle":"Enable shuffle"} aria-pressed={shuffle} onClick={toggleShuffle}><Shuffle size={18}/></button><button aria-label="Previous" onClick={previous}><SkipBack size={19}/></button><button className="large-play" aria-label={isPlaying?"Pause":"Play"} onClick={togglePlayback}>{isPlaying?<Pause size={19} fill="currentColor"/>:<Play size={19} fill="currentColor"/>}</button><button aria-label="Next" onClick={next}><SkipForward size={19}/></button><button className={repeat?"control-active":""} aria-label={repeat?"Disable repeat":"Enable repeat"} aria-pressed={repeat} onClick={toggleRepeat}><Repeat2 size={18}/></button></div></>; }