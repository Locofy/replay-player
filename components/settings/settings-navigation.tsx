"use client";
import Link from "next/link";
import { useRef } from "react";



import { Bell, CircleUserRound, Music2, Palette } from "lucide-react";



export const settingsSections = [
  { id: "Playback", icon: Music2, description: "Audio quality, streaming, and playback behavior." },
  { id: "Appearance", icon: Palette, description: "Choose the look and feel of Replay." },
  { id: "Notifications", icon: Bell, description: "Choose which updates you want to receive." },
  { id: "Account", icon: CircleUserRound, description: "Your profile, plan, and account details." },
] as const;


export type SettingsSection = (typeof settingsSections)[number]["id"];
export function SettingsNavigation({section,onSelect}:{section:SettingsSection;onSelect:(section:SettingsSection)=>void}) {
 const tabRefs=useRef<Array<HTMLButtonElement|null>>([]);
 return <nav className="settings-tabs" aria-label="Settings sections" role="tablist" onKeyDown={event=>{const current=settingsSections.findIndex(item=>item.id===section);let next=current;if(event.key==="ArrowRight"||event.key==="ArrowDown")next=(current+1)%settingsSections.length;else if(event.key==="ArrowLeft"||event.key==="ArrowUp")next=(current-1+settingsSections.length)%settingsSections.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=settingsSections.length-1;else return;event.preventDefault();onSelect(settingsSections[next].id);tabRefs.current[next]?.focus();}}>
        {settingsSections.map(({ id, icon: Icon },index) => <button key={id} ref={element=>{tabRefs.current[index]=element}} id={`settings-tab-${id.toLowerCase()}`} type="button" role="tab" aria-controls="settings-tabpanel" aria-selected={section === id} tabIndex={section===id?0:-1} className={section === id ? "setting-selected" : ""} onClick={() => onSelect(id)}><Icon size={15} aria-hidden="true"/><span>{id}</span></button>)}
      </nav>;
}
