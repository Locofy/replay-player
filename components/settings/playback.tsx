"use client";
import { useState } from "react";
import Link from "next/link";



import { tracks } from "@/lib/music";
import { ChevronDown, Download } from "lucide-react";
import { ToggleRow } from "@/components/music-ui";


const qualities=["Low","Normal","High","Very high"];
export function PlaybackSettings(){ const [autoplay,setAutoplay]=useState(true); const [quality,setQuality]=useState(2); return <>
          <div style={{ fontSize: "14px", color: "var(--accent)" }} className="settings-group-label">LISTENING</div>
          <div className="setting-select"><div className="setting-select-label"><b>Autoplay</b><small>Keep the music going when your queue ends.</small></div><div className="segmented-toggle" role="group" aria-label="Autoplay"><button type="button" aria-pressed={autoplay} onClick={()=>setAutoplay(true)}>On</button><button type="button" aria-pressed={!autoplay} onClick={()=>setAutoplay(false)}>Off</button></div></div>
          <ToggleRow title="Crossfade" description="Blend the end of one track into the next."/>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="crossfade-duration"><b>Crossfade duration</b><small id="crossfade-duration-help">Time to blend between tracks.</small></label><span className="select-control"><select id="crossfade-duration" aria-describedby="crossfade-duration-help" defaultValue="5 seconds"><option>3 seconds</option><option>5 seconds</option><option>8 seconds</option><option>12 seconds</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Normalize volume" description="Keep songs at a consistent listening level." defaultChecked/>
          <div style={{ fontSize: "14px", color: "var(--accent)" }} className="settings-group-label settings-group-spaced">STREAMING</div>
          <div className="setting-select"><label className="setting-select-label" htmlFor="audio-quality"><b>Audio quality</b><small id="audio-quality-help">Higher quality uses more data.</small></label><span className="quality-slider"><input id="audio-quality" type="range" min="0" max="3" step="1" value={quality} aria-describedby="audio-quality-help" aria-valuetext={qualities[quality]} onChange={e=>setQuality(Number(e.target.value))} style={{"--progress":`${quality/3*100}%`} as React.CSSProperties}/><output htmlFor="audio-quality">{qualities[quality]}</output></span></div>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="mobile-streaming"><b>Streaming over mobile data</b><small id="mobile-streaming-help">Choose when Replay can use cellular data.</small></label><span className="select-control"><select id="mobile-streaming" aria-describedby="mobile-streaming-help" defaultValue="Ask every time"><option>Always</option><option>Ask every time</option><option>Never</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Download over mobile data" description="Allow offline downloads without Wi-Fi."/>
        </>; }
