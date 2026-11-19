"use client";
import { useState } from "react";


import { PageHeading } from "@/components/music-ui";


import { settingsSections, SettingsNavigation } from "@/components/settings/settings-navigation";
import { PlaybackSettings } from "@/components/settings/playback";
import { AppearanceSettings } from "@/components/settings/appearance";
import { NotificationsSettings } from "@/components/settings/notifications";
import { AccountSettings } from "@/components/settings/account";
export default function Settings() {
  const [section, setSection] = useState<(typeof settingsSections)[number]["id"]>("Playback");
  const selected = settingsSections.find(item => item.id === section) ?? settingsSections[0];
  const SectionIcon = selected.icon;
  return <>
    <PageHeading eyebrow="PREFERENCES" title="Settings" description="Make Replay feel like yours."/>
    <div className="settings-layout">
      <SettingsNavigation section={section} onSelect={setSection}/>
      <section className="settings-panel" id="settings-tabpanel" role="tabpanel" aria-labelledby={`settings-tab-${section.toLowerCase()}`} tabIndex={0}>
        <div className="settings-panel-heading"><span className="settings-heading-icon"><SectionIcon size={18}/></span><div><h2>{section}</h2><p>{selected.description}</p></div></div>
        {section === "Playback" && <PlaybackSettings/>}
        {section === "Appearance" && <AppearanceSettings/>}
        {section === "Notifications" && <NotificationsSettings/>}
        {section === "Account" && <AccountSettings/>}
      </section>
    </div>
  </>;
}
