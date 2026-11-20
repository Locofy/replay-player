"use client";
import { useState } from "react";
import { useAppearance, type ThemeChoice } from "@/components/appearance-context";
import { usePlayer } from "@/components/player-context";
import { tracks } from "@/lib/music";
import { Download, Headphones, Play, ShieldCheck, Shuffle, SkipForward, Volume2 } from "lucide-react";
import { settingsSections, type SettingsSection } from "@/components/settings/settings-navigation";

const ACCENTS = ["#fd8d47", "#c278ff", "#42b6a5", "#e96c87", "#6f9eff"];
const PLAYBACK_TOGGLES = [
  ["autoplay", "Autoplay", "Keep the music going when your queue ends."],
  ["crossfade", "Crossfade", "Blend the end of one track into the next."],
  ["normalize", "Normalize volume", "Keep songs at a consistent listening level."],
] as const;
const NOTIFICATIONS = [
  ["releases", "New releases", "Get updates when artists you follow release music."],
  ["picks", "Playlist picks", "A weekly mix of new playlists and recommendations."],
  ["activity", "Listening activity", "Occasional listening summaries and highlights."],
  ["announcements", "Product announcements", "Tips, features, and updates from Replay."],
  ["friends", "Friend activity", "When people you follow share a playlist."],
] as const;
const INITIAL = { autoplay: true, crossfade: false, duration: "5s", normalize: true, quality: "High", mobile: "Ask", downloadMobile: false, animated: true, releases: true, picks: false, activity: false, announcements: true, friends: false };
type Prefs = typeof INITIAL;

function Switch({ on, onChange, label }: { on: boolean; onChange: (on: boolean) => void; label: string }) {
  return <button type="button" role="switch" aria-label={label} aria-checked={on} className="ls-switch" onClick={() => onChange(!on)}><i aria-hidden="true"/></button>;
}

function Pills({ options, value, onChange, label }: { options: readonly string[]; value: string; onChange: (value: string) => void; label: string }) {
  return <div className="ls-pills" role="group" aria-label={label}>{options.map(option => <button key={option} type="button" aria-pressed={value === option} onClick={() => onChange(option)}>{option}</button>)}</div>;
}

function Row({ title, description, children }: { title: string; description: string; children?: React.ReactNode }) {
  return <div className="ls-row"><div className="ls-row-copy"><b>{title}</b><small>{description}</small></div>{children}</div>;
}

export function LiveSettings() {
  const [tab, setTab] = useState<SettingsSection>("Playback");
  const [prefs, setPrefs] = useState<Prefs>(INITIAL);
  const set = <K extends keyof Prefs>(key: K) => (value: Prefs[K]) => setPrefs(current => ({ ...current, [key]: value }));
  const appearance = useAppearance();
  const { isFavorite } = usePlayer();
  const downloadData = () => {
    const blob = new Blob([JSON.stringify({ name: "Josh Wesley", email: "josh.wesley@example.com", favorites: tracks.filter(t => isFavorite(t.id)).map(t => t.title) }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url; anchor.download = "replay-account-data.json"; anchor.click();
    URL.revokeObjectURL(url);
  };

  return <div className="live-settings">
    <div className="ls-tabs" role="tablist" aria-label="Settings sections">
      {settingsSections.map(({ id, icon: Icon }) => <button key={id} type="button" role="tab" id={`settings-tab-${id.toLowerCase()}`} aria-controls="settings-tabpanel" aria-selected={tab === id} onClick={() => setTab(id)}><Icon size={15} aria-hidden="true"/>{id}</button>)}
    </div>
    <div className="ls-body">
      <section className="ls-list" id="settings-tabpanel" role="tabpanel" aria-labelledby={`settings-tab-${tab.toLowerCase()}`}>
        {tab === "Playback" && <>
          {PLAYBACK_TOGGLES.map(([key, title, description]) => <Row key={key} title={title} description={description}><Switch label={title} on={prefs[key]} onChange={set(key)}/></Row>)}
          <Row title="Crossfade duration" description="Time to blend between tracks."><Pills label="Crossfade duration" options={["3s", "5s", "8s", "12s"]} value={prefs.duration} onChange={set("duration")}/></Row>
          <Row title="Audio quality" description="Higher quality uses more data."><Pills label="Audio quality" options={["Low", "Normal", "High", "Very high"]} value={prefs.quality} onChange={set("quality")}/></Row>
          <Row title="Streaming over mobile data" description="Choose when Replay can use cellular data."><Pills label="Streaming over mobile data" options={["Always", "Ask", "Never"]} value={prefs.mobile} onChange={set("mobile")}/></Row>
          <Row title="Download over mobile data" description="Allow offline downloads without Wi-Fi."><Switch label="Download over mobile data" on={prefs.downloadMobile} onChange={set("downloadMobile")}/></Row>
        </>}
        {tab === "Appearance" && <>
          <Row title="Theme" description="Dark, light, or follow your system."><Pills label="Theme" options={["Dark", "Light", "System"]} value={appearance.theme} onChange={value => appearance.setTheme(value as ThemeChoice)}/></Row>
          <Row title="Accent color" description="Used for selected controls and highlights."><div className="ls-swatches" role="group" aria-label="Accent color">{ACCENTS.map(color => <button key={color} type="button" aria-label={`Choose accent ${color}`} aria-pressed={appearance.accent === color} style={{ background: color }} onClick={() => appearance.setAccent(color)}/>)}</div></Row>
          <Row title="Compact song list" description="Show more tracks in your library at once."><Switch label="Compact song list" on={appearance.compact} onChange={appearance.setCompact}/></Row>
          <Row title="Show animated artwork" description="Allow subtle motion on featured album covers."><Switch label="Show animated artwork" on={prefs.animated} onChange={set("animated")}/></Row>
        </>}
        {tab === "Notifications" && NOTIFICATIONS.map(([key, title, description]) => <Row key={key} title={title} description={description}><Switch label={title} on={prefs[key]} onChange={set(key)}/></Row>)}
        {tab === "Account" && <>
          <div className="ls-profile"><img src="/covers/avatar.png" alt=""/><div className="ls-row-copy"><b>Josh Wesley</b><small>josh.wesley@example.com</small></div><button type="button" className="ls-button" onClick={() => window.alert("Profile editing is available in this demo soon.")}>Edit profile</button></div>
          <Row title="Plan" description="Replay Premium · Unlimited listening · High quality audio"/>
          <Row title="Member since" description="January 2024"/>
          <Row title="Country or region" description="United States"/>
          <Row title="This device" description="Mac · Active now"/>
          <Row title="Offline storage" description="2.4 GB used"><div className="ls-actions"><button type="button" className="ls-button" onClick={downloadData}><Download size={14}/> Download your data</button><button type="button" className="ls-button" onClick={() => window.alert("Your demo account is private. No account data is shared.")}><ShieldCheck size={14}/> Privacy</button></div></Row>
        </>}
      </section>
      <aside className="ls-preview" aria-label="Preview">
        <h3>How it sounds and looks</h3>
        <img className="ls-cover" src="/covers/02.png" alt="" style={{ filter: prefs.animated ? "none" : "saturate(.85)" }}/>
        <div className="ls-track"><div><b>Waves of Time</b><small>Lana Rivers</small></div><span className="ls-play"><Play size={15} fill="currentColor"/></span></div>
        <div className="ls-bar"><i/></div>
        <div className="ls-crossfade">{prefs.crossfade ? <><span/>Blends into next track over {prefs.duration}</> : <><SkipForward size={14}/>Next track starts after a pause</>}</div>
        <div className="ls-tags">
          <span><Headphones size={12}/>{prefs.quality}</span>
          <span><Volume2 size={12}/>{prefs.normalize ? "Normalized" : "Original levels"}</span>
          <span><Shuffle size={12}/>{prefs.autoplay ? "Autoplay on" : "Stops at end of queue"}</span>
        </div>
      </aside>
    </div>
  </div>;
}
