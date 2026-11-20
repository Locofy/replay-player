"use client";
import { LiveSettings } from "@/components/settings/live-settings";

export default function Settings() {
  return <div className="settings-page">
    <h1>Settings</h1>
    <p className="subheading">Make Replay feel like yours.</p>
    <LiveSettings/>
  </div>;
}
