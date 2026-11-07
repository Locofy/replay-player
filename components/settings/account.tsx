"use client";
import Link from "next/link";

import { usePlayer } from "@/components/player-context";

import { tracks } from "@/lib/music";
import { Check, Download, Headphones, Monitor, Radio, ShieldCheck } from "lucide-react";



export function AccountSettings(){const {isFavorite}=usePlayer(); return <>
          <AccountProfile/>
          <div className="settings-group-label settings-group-spaced">YOUR PLAN</div>
          <AccountPlan/>
          <AccountDetails/>
          <div className="settings-group-label settings-group-spaced">YOUR DEVICES</div>
          <AccountDevice/>
          <AccountActions/>
        </>; }

function AccountProfile(){  return <div className="account-card"><img src="/covers/avatar.png" alt="Josh Wesley"/><div><b>Josh Wesley</b><small>josh.wesley@example.com</small><span className="account-status"><Check size={11}/> Verified account</span></div><button type="button" className="outline-button" onClick={()=>window.alert("Profile editing is available in this demo soon.")}>Edit profile</button></div>; }

function AccountPlan(){  return <div className="plan-card"><div className="plan-icon"><Headphones size={18}/></div><div className="plan-copy"><span className="plan-kicker">CURRENT PLAN</span><b>Replay Premium</b><small>Unlimited listening · High quality audio</small></div><span className="plan-badge">ACTIVE</span></div>; }

function AccountDetails(){  return <div className="account-details"><div><span>Member since</span><b>January 2024</b></div><div><span>Country or region</span><b>United States</b></div><div><span>Offline storage</span><b>2.4 GB used</b></div></div>; }

function AccountDevice(){  return <div className="device-row"><span><Monitor size={16}/></span><div><b>This device</b><small>Mac · Active now</small></div><span className="device-current"><Radio size={12}/> Current</span></div>; }

function AccountActions(){ const {isFavorite}=usePlayer(); return <div className="account-actions"><button type="button" onClick={()=>{const blob=new Blob([JSON.stringify({name:"Josh Wesley",email:"josh.wesley@example.com",favorites:tracks.filter(t=>isFavorite(t.id)).map(t=>t.title)},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download="replay-account-data.json";anchor.click();URL.revokeObjectURL(url)}}><Download size={14}/> Download your data</button><button type="button" onClick={()=>window.alert("Your demo account is private. No account data is shared.")}><ShieldCheck size={14}/> Privacy and security</button></div>; }
