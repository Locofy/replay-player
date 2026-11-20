"use client";
import Link from "next/link";
import { useState } from "react";



import { tracks } from "@/lib/music";
import { ChevronDown, Download } from "lucide-react";
import { ToggleRow } from "@/components/music-ui";

const qualities = ["Low", "Normal", "High", "Very high"];

function AutoplaySetting(){
  const [on, setOn] = useState(true);
  return <div className="setting-select setting-segmented-row"><div className="setting-select-label"><b id="autoplay-label">Autoplay</b><small>Keep the music going when your queue ends.</small></div><div className="segmented-control" role="radiogroup" aria-labelledby="autoplay-label">{[true, false].map(value => <button key={String(value)} type="button" role="radio" aria-checked={on === value} className={on === value ? "selected" : ""} onClick={() => setOn(value)}>{value ? "On" : "Off"}</button>)}</div></div>;
}

function AudioQualitySetting(){
  const [index, setIndex] = useState(2);
  return <div className="setting-select setting-slider-row"><label className="setting-select-label" htmlFor="audio-quality"><b>Audio quality</b><small id="audio-quality-help">Higher quality uses more data.</small></label><div className="quality-slider"><input id="audio-quality" type="range" min={0} max={qualities.length - 1} step={1} value={index} onChange={e => setIndex(Number(e.target.value))} aria-describedby="audio-quality-help" aria-valuetext={qualities[index]} style={{ "--progress": `${index / (qualities.length - 1) * 100}%` } as React.CSSProperties}/><div className="quality-slider-labels" aria-hidden="true">{qualities.map((q, i) => <span key={q} className={i === index ? "selected" : ""}>{q}</span>)}</div></div></div>;
}

export function PlaybackSettings(){ return <>
          <div style={{ fontSize: "14px", color: "var(--accent)" }} className="settings-group-label">LISTENING</div>
          <AutoplaySetting/>
          <ToggleRow title="Crossfade" description="Blend the end of one track into the next."/>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="crossfade-duration"><b>Crossfade duration</b><small id="crossfade-duration-help">Time to blend between tracks.</small></label><span className="select-control"><select id="crossfade-duration" aria-describedby="crossfade-duration-help" defaultValue="5 seconds"><option>3 seconds</option><option>5 seconds</option><option>8 seconds</option><option>12 seconds</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Normalize volume" description="Keep songs at a consistent listening level." defaultChecked/>
          <div style={{ color: "var(--accent)", fontSize: "14px" }} className="settings-group-label settings-group-spaced">STREAMING</div>
          <AudioQualitySetting/>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="mobile-streaming"><b>Streaming over mobile data</b><small id="mobile-streaming-help">Choose when Replay can use cellular data.</small></label><span className="select-control"><select id="mobile-streaming" aria-describedby="mobile-streaming-help" defaultValue="Ask every time"><option>Always</option><option>Ask every time</option><option>Never</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Download over mobile data" description="Allow offline downloads without Wi-Fi."/>
        </>; }
