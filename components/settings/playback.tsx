"use client";
import { useState } from "react";

import { ToggleRow } from "@/components/music-ui";

const waveBars = Array.from({ length: 48 }, (_, i) => 10 + Math.abs(Math.sin(i * 0.55) * 34) + (i % 5) * 3);

function ChoiceChips<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return <div className="choice-chips" role="radiogroup" aria-label={label}>{options.map(option => <button key={option} type="button" role="radio" aria-checked={value === option} onClick={() => onChange(option)}>{option}</button>)}</div>;
}

function ChoiceRow<T extends string>({ title, description, options, value, onChange }: { title: string; description: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return <div className="setting-switch"><div><b>{title}</b><small>{description}</small></div><ChoiceChips label={title} options={options} value={value} onChange={onChange}/></div>;
}

export function PlaybackSettings() {
  const [crossfade, setCrossfade] = useState(false);
  const [duration, setDuration] = useState<"3s" | "5s" | "8s" | "12s">("5s");
  const [quality, setQuality] = useState<"Low" | "Normal" | "High" | "Very high">("High");
  const [mobile, setMobile] = useState<"Always" | "Ask" | "Never">("Ask");
  return <div className="settings-reveal">
    <div className="sound-band">
      <div><h2>Your sound</h2><p>What you hear right now, at a glance.</p></div>
      <dl className="sound-facts"><div><dt>Quality</dt><dd>{quality}</dd></div><div><dt>Crossfade</dt><dd>{crossfade ? duration : "Off"}</dd></div><div><dt>Mobile data</dt><dd>{mobile}</dd></div></dl>
      <svg className="sound-wave" width="420" height="90" viewBox="0 0 420 90" aria-hidden="true">{waveBars.map((h, i) => <rect key={i} x={i * 9} y={90 - h} width="4" height={h} rx="2" opacity={0.15 + (i / 48) * 0.45}/>)}</svg>
    </div>
    <div className="settings-cards">
      <div className="settings-card"><h3>Listening</h3>
        <ToggleRow title="Autoplay" description="Keep the music going when your queue ends." defaultChecked/>
        <ToggleRow title="Crossfade" description="Blend the end of one track into the next." onChange={setCrossfade}/>
        <ChoiceRow title="Crossfade duration" description="Time to blend between tracks." options={["3s", "5s", "8s", "12s"] as const} value={duration} onChange={setDuration}/>
        <ToggleRow title="Normalize volume" description="Keep songs at a consistent listening level." defaultChecked/>
      </div>
      <div className="settings-card"><h3>Streaming</h3>
        <ChoiceRow title="Audio quality" description="Higher quality uses more data." options={["Low", "Normal", "High", "Very high"] as const} value={quality} onChange={setQuality}/>
        <ChoiceRow title="Streaming over mobile data" description="Choose when Replay can use cellular data." options={["Always", "Ask", "Never"] as const} value={mobile} onChange={setMobile}/>
        <ToggleRow title="Download over mobile data" description="Allow offline downloads without Wi-Fi."/>
      </div>
    </div>
  </div>;
}
