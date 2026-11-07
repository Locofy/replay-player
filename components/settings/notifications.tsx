"use client";
import Link from "next/link";




import { BellRing } from "lucide-react";
import { ToggleRow } from "@/components/music-ui";


export function NotificationsSettings(){ return <>
          <div className="settings-callout"><span><BellRing size={17}/></span><p>Stay in the loop. Choose the updates that matter to you.</p></div>
          <div className="settings-group-label">EMAIL UPDATES</div>
          <ToggleRow title="New releases" description="Get updates when artists you follow release music." defaultChecked/>
          <ToggleRow title="Playlist picks" description="A weekly mix of new playlists and recommendations."/>
          <ToggleRow title="Listening activity" description="Occasional listening summaries and highlights."/>
          <div className="settings-group-label settings-group-spaced">IN-APP</div>
          <ToggleRow title="Product announcements" description="Tips, features, and updates from Replay." defaultChecked/>
          <ToggleRow title="Friend activity" description="When people you follow share a playlist."/>
        </>; }
