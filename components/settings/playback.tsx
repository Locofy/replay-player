"use client";
import Link from "next/link";



import { tracks } from "@/lib/music";
import { ChevronDown, Download } from "lucide-react";
import { ToggleRow } from "@/components/music-ui";


export function PlaybackSettings(){ return <>
          <div className="settings-group-label">LISTENING</div>
          <ToggleRow title="Autoplay" description="Keep the music going when your queue ends." defaultChecked/>
          <ToggleRow title="Crossfade" description="Blend the end of one track into the next."/>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="crossfade-duration"><b>Crossfade duration</b><small id="crossfade-duration-help">Time to blend between tracks.</small></label><span className="select-control"><select id="crossfade-duration" aria-describedby="crossfade-duration-help" defaultValue="5 seconds"><option>3 seconds</option><option>5 seconds</option><option>8 seconds</option><option>12 seconds</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Normalize volume" description="Keep songs at a consistent listening level." defaultChecked/>
          <div className="settings-group-label settings-group-spaced">STREAMING</div>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="audio-quality"><b>Audio quality</b><small id="audio-quality-help">Higher quality uses more data.</small></label><span className="select-control"><select id="audio-quality" aria-describedby="audio-quality-help" defaultValue="High"><option>Low</option><option>Normal</option><option>High</option><option>Very high</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="mobile-streaming"><b>Streaming over mobile data</b><small id="mobile-streaming-help">Choose when Replay can use cellular data.</small></label><span className="select-control"><select id="mobile-streaming" aria-describedby="mobile-streaming-help" defaultValue="Ask every time"><option>Always</option><option>Ask every time</option><option>Never</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Download over mobile data" description="Allow offline downloads without Wi-Fi."/>
        </>; }
