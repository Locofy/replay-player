"use client";
import { ToggleRow } from "@/components/music-ui";

export const qualityLevels = ["Low", "Normal", "High", "Very high"] as const;
export const crossfadeDurations = ["3s", "5s", "8s", "12s"] as const;
export const mobileStreamingChoices = ["Always", "Ask every time", "Never"] as const;

export type PlaybackPrefs = {
  autoplay: boolean;
  crossfade: boolean;
  crossfadeDuration: (typeof crossfadeDurations)[number];
  normalize: boolean;
  quality: (typeof qualityLevels)[number];
  mobileStreaming: (typeof mobileStreamingChoices)[number];
  downloadOverMobile: boolean;
};

export const defaultPlaybackPrefs: PlaybackPrefs = {
  autoplay: true,
  crossfade: false,
  crossfadeDuration: "5s",
  normalize: true,
  quality: "High",
  mobileStreaming: "Ask every time",
  downloadOverMobile: false,
};

function ChoiceRow<T extends string>({ title, description, options, value, onChange, disabled = false }: {
  title: string; description: string; options: readonly T[]; value: T; onChange: (value: T) => void; disabled?: boolean;
}) {
  return <div className={`setting-switch setting-choice ${disabled ? "setting-disabled" : ""}`}>
    <div><b>{title}</b><small>{description}</small></div>
    <div className="on-off-group" role="radiogroup" aria-label={title}>
      {options.map(option => <button key={option} type="button" role="radio" aria-checked={value === option} disabled={disabled} className={value === option ? "on-off-selected" : ""} onClick={() => onChange(option)}>{option}</button>)}
    </div>
  </div>;
}

export function PlaybackSettings({ prefs, onChange }: { prefs: PlaybackPrefs; onChange: (prefs: PlaybackPrefs) => void }) {
  const set = <K extends keyof PlaybackPrefs>(key: K) => (value: PlaybackPrefs[K]) => onChange({ ...prefs, [key]: value });
  return <>
    <div className="settings-group-label">LISTENING</div>
    <ToggleRow title="Autoplay" description="Keep the music going when your queue ends." checked={prefs.autoplay} onChange={set("autoplay")}/>
    <ToggleRow title="Crossfade" description="Blend the end of one track into the next." checked={prefs.crossfade} onChange={set("crossfade")}/>
    <ChoiceRow title="Crossfade duration" description={prefs.crossfade ? "Time to blend between tracks." : "Turn on Crossfade to choose a duration."} options={crossfadeDurations} value={prefs.crossfadeDuration} onChange={set("crossfadeDuration")} disabled={!prefs.crossfade}/>
    <ToggleRow title="Normalize volume" description="Keep songs at a consistent listening level." checked={prefs.normalize} onChange={set("normalize")}/>
    <div className="settings-group-label settings-group-spaced">STREAMING</div>
    <ChoiceRow title="Audio quality" description="Higher quality uses more data." options={qualityLevels} value={prefs.quality} onChange={set("quality")}/>
    <ChoiceRow title="Streaming over mobile data" description="Choose when Replay can use cellular data." options={mobileStreamingChoices} value={prefs.mobileStreaming} onChange={set("mobileStreaming")}/>
    <ToggleRow title="Download over mobile data" description="Allow offline downloads without Wi-Fi." checked={prefs.downloadOverMobile} onChange={set("downloadOverMobile")}/>
  </>;
}
