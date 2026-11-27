"use client";
import { Headphones, Pause, Play, Repeat, SkipForward, Volume2 } from "lucide-react";
import { CoverArt } from "@/components/music-ui";
import { usePlayer } from "@/components/player-context";
import type { PlaybackPrefs } from "@/components/settings/playback";

/** Shows what the current playback settings mean for the track that is playing. */
export function SettingsPreview({ prefs }: { prefs: PlaybackPrefs }) {
  const { currentTrack, isPlaying, togglePlayback, currentTime, duration } = usePlayer();
  const progress = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;
  return <aside className="settings-preview" aria-label="How your settings sound">
    <h3>How it sounds</h3>
    <CoverArt src={currentTrack.cover} alt={`${currentTrack.album} cover`} className="settings-preview-cover"/>
    <div className="settings-preview-track">
      <div><b>{currentTrack.title}</b><small>{currentTrack.artist}</small></div>
      <button type="button" className="settings-preview-play" onClick={togglePlayback} aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause size={15} fill="currentColor"/> : <Play size={15} fill="currentColor"/>}
      </button>
    </div>
    <div className="settings-preview-progress" aria-hidden="true"><i style={{ width: `${progress}%` }}/></div>
    <div className="settings-preview-transition">
      {prefs.crossfade
        ? <><span className="settings-preview-blend" aria-hidden="true"/>Blends into the next track over {prefs.crossfadeDuration.replace("s", " seconds")}</>
        : <><SkipForward size={14} aria-hidden="true"/>Next track starts after a short pause</>}
    </div>
    <ul className="settings-preview-tags">
      <li><Headphones size={12} aria-hidden="true"/>{prefs.quality} quality</li>
      <li><Volume2 size={12} aria-hidden="true"/>{prefs.normalize ? "Normalized" : "Original levels"}</li>
      <li><Repeat size={12} aria-hidden="true"/>{prefs.autoplay ? "Autoplay on" : "Stops when the queue ends"}</li>
    </ul>
  </aside>;
}
