"use client";
import { useState } from "react";


import { settingsSections, SettingsNavigation } from "@/components/settings/settings-navigation";
import { PlaybackSettings } from "@/components/settings/playback";
import { AppearanceSettings } from "@/components/settings/appearance";
import { NotificationsSettings } from "@/components/settings/notifications";
import { AccountSettings } from "@/components/settings/account";
export default function Settings() {
  const [section, setSection] = useState<(typeof settingsSections)[number]["id"]>("Playback");
  return <div className="settings-console">
    <h1 className="settings-title">Settings</h1>
    <p className="settings-sub">Make Replay feel like yours.</p>
    <SettingsNavigation section={section} onSelect={setSection}/>
    <section className="settings-console-panel" key={section} id="settings-tabpanel" role="tabpanel" aria-labelledby={`settings-tab-${section.toLowerCase()}`} tabIndex={0}>
      {section === "Playback" && <PlaybackSettings/>}
      {section === "Appearance" && <div className="settings-card"><AppearanceSettings/></div>}
      {section === "Notifications" && <div className="settings-card"><NotificationsSettings/></div>}
      {section === "Account" && <div className="settings-card"><AccountSettings/></div>}
    </section>
  </div>;
}
