"use client";
import Link from "next/link";


import { useAppearance, type ThemeChoice } from "@/components/appearance-context";
import { tracks } from "@/lib/music";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { ToggleRow } from "@/components/music-ui";


export function AppearanceSettings(){const {theme,accent,compact,setTheme,setAccent,setCompact}=useAppearance(); return <>
          <div className="settings-group-label">THEME</div>
          <div className="theme-options">{[{name:"Dark",icon:Moon},{name:"Light",icon:Sun},{name:"System",icon:Monitor}].map(({name,icon:Icon})=><button key={name} type="button" className={`theme-option ${theme===name?"selected":""}`} onClick={()=>setTheme(name as ThemeChoice)} aria-pressed={theme===name}><span className={`theme-preview theme-${name.toLowerCase()}`}><Icon size={18}/></span><span>{name}</span>{theme===name&&<Check className="theme-check" size={15}/>}</button>)}</div>
          <div className="setting-select"><div><b>Accent color</b><small>Used for selected controls and highlights.</small></div><div className="accent-options" role="group" aria-label="Accent color">{["#fd8d47","#c278ff","#42b6a5","#e96c87","#6f9eff"].map(color=><button key={color} className={`accent-swatch ${accent===color?"selected":""}`} style={{"--swatch":color} as React.CSSProperties} onClick={()=>setAccent(color)} aria-label={`Choose accent ${color}`} aria-pressed={accent===color}/>)}</div></div>
          <ToggleRow title="Compact song list" description="Show more tracks in your library at once." defaultChecked={compact} onChange={setCompact}/>
          <ToggleRow title="Show animated artwork" description="Allow subtle motion on featured album covers." defaultChecked/>
        </>; }
