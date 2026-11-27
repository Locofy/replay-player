"use client";
import { useState } from "react";

import { type SettingsSection, SettingsNavigation } from "@/components/settings/settings-navigation";
import { defaultPlaybackPrefs, PlaybackSettings, type PlaybackPrefs } from "@/components/settings/playback";
import { AppearanceSettings } from "@/components/settings/appearance";
import { NotificationsSettings } from "@/components/settings/notifications";
import { AccountSettings } from "@/components/settings/account";
import { SettingsPreview } from "@/components/settings/settings-preview";

export default function Settings() {
  const [section, setSection] = useState<SettingsSection>("Playback");
  const [playback, setPlayback] = useState<PlaybackPrefs>(defaultPlaybackPrefs);
  return <>
    <div className="page-heading settings-page-heading"><div><h1>Settings</h1><p className="subheading">Make Replay feel like yours.</p></div></div>
    <SettingsNavigation section={section} onSelect={setSection}/>
    <div className="settings-layout">
      <section className="settings-panel" id="settings-tabpanel" role="tabpanel" aria-labelledby={`settings-tab-${section.toLowerCase()}`} tabIndex={0}>
        {section === "Playback" && <PlaybackSettings prefs={playback} onChange={setPlayback}/>}
        {section === "Appearance" && <AppearanceSettings/>}
        {section === "Notifications" && <NotificationsSettings/>}
        {section === "Account" && <AccountSettings/>}
      </section>
      <SettingsPreview prefs={playback}/>
    </div>
  </>;
}
