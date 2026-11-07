"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePlayer, formatTime } from "@/components/player-context";
import { useAppearance, type ThemeChoice } from "@/components/appearance-context";
import { tracks, categories, playlists, type Track } from "@/lib/music";
import { ArrowLeft, Bell, BellRing, Check, ChevronDown, ChevronRight, CircleUserRound, Disc3, Download, Heart, Headphones, ListMusic, Monitor, MoreHorizontal, Moon, Music2, Palette, Pause, Play, Radio, Repeat2, ShieldCheck, Shuffle, SkipBack, SkipForward, Sun, ChevronLeft, ChevronRight as ArrowRight } from "lucide-react";
import { CategoryChips, CoverArt, EmptyState, HeartPlaceholder, PageHeading, PlaylistTile, SectionHeading, SongCard, SongList, ToggleRow } from "@/components/music-ui";

const heroSlides = tracks.map(track => track.id === "echoes-of-midnight" ? { ...track, cover: "/covers/13.png" } : track);
const initialHeroIndex = heroSlides.findIndex(track => track.id === "echoes-of-midnight");

export function HomeView() {
  const {play}=usePlayer();
  const [active, setActive] = useState("All");
  const [heroIndex,setHeroIndex]=useState(initialHeroIndex);
  const touchStart=useRef<number|null>(null);
  const heroTrack=heroSlides[heroIndex]??heroSlides[initialHeroIndex];
  const moveHero=(step:number)=>setHeroIndex(index=>(index+step+heroSlides.length)%heroSlides.length);
  const selectHero=(index:number)=>setHeroIndex((index+heroSlides.length)%heroSlides.length);
  const visibleTracks = tracks.filter(track => active === "All" || track.category === active);
  return <>
    <section className="hero" aria-roledescription="carousel" aria-label="Featured songs" onTouchStart={event=>{touchStart.current=event.touches[0]?.clientX??null}} onTouchEnd={event=>{if(touchStart.current===null)return;const distance=(event.changedTouches[0]?.clientX??touchStart.current)-touchStart.current;if(Math.abs(distance)>42)moveHero(distance<0?1:-1);touchStart.current=null}}>
      <div className="hero-side hero-left">{[-4,-3,-2,-1].map((offset,i)=>{const index=(heroIndex+offset+heroSlides.length)%heroSlides.length;const item=heroSlides[index];return <button type="button" key={item.id} className={`hero-small h${i}`} aria-label={`Show ${item.title}`} onClick={()=>selectHero(index)}><CoverArt className="hero-small-art" src={item.cover} alt=""/></button>})}</div>
      <CoverArt key={heroTrack.id} className="hero-main" src={heroTrack.cover} alt={`${heroTrack.album} album cover`}/>
      <div className="hero-caption"><span aria-live="polite" aria-atomic="true"><b>{heroTrack.title}</b><small>{heroTrack.artist}</small></span><Link href={`/playing/${heroTrack.id}`} className="hero-play" aria-label={`Play ${heroTrack.title}`} onClick={()=>play(heroTrack)}><Play size={14} fill="currentColor" aria-hidden="true"/></Link></div>
      <div className="hero-side hero-right">{[1,2,3,4].map((offset,i)=>{const index=(heroIndex+offset)%heroSlides.length;const item=heroSlides[index];return <button type="button" key={item.id} className={`hero-small h${i}`} aria-label={`Show ${item.title}`} onClick={()=>selectHero(index)}><CoverArt className="hero-small-art" src={item.cover} alt=""/></button>})}</div>
      <button type="button" className="hero-arrow hero-arrow-prev" aria-label="Previous featured song" onClick={()=>moveHero(-1)}><ChevronLeft size={20}/></button><button type="button" className="hero-arrow hero-arrow-next" aria-label="Next featured song" onClick={()=>moveHero(1)}><ArrowRight size={20}/></button>
    </section>
    <section className="category-section"><SectionHeading title="Select Categories" moreLabel=""/><CategoryChips initialValue="All" onSelect={setActive}/></section>
    <section><SectionHeading title={active === "All" ? "Popular songs" : `${active} songs`}/>{visibleTracks.length ? <div className="card-row">{visibleTracks.slice(0, 7).map(track => <SongCard key={track.id} track={track}/>)}</div> : <EmptyState title={`No ${active.toLowerCase()} songs yet`} description="Try another category to find something to play."/>}</section>
    <section className="lower-home"><SectionHeading title="Made for your mood"/><div className="playlist-grid">{playlists.slice(0, 4).map((title, i) => <PlaylistTile key={title} title={title} description={`${18 + i * 2} tracks · Curated for you`} cover={tracks[i]?.cover}/>)}</div></section>
  </>;
}

export function SongsView() {
  const [category,setCategory]=useState("All"),[sort,setSort]=useState("All tracks"); const {play}=usePlayer();
  useEffect(()=>{const value=new URLSearchParams(window.location.search).get("category");if(value)setCategory(value)},[]);
  const filtered=tracks.filter(t=>category==="All"||t.category===category); const popularity=["golden-days","fading-horizon","shadows-and-light","waves-of-time","echoes-of-midnight","city-lights","slow-motion","electric-dreams","whispers-in-the-night","stay-awake","blue-hour","warmth"]; const visible=sort==="Recently added"?[...filtered].reverse():sort==="Most played"?[...filtered].sort((a,b)=>popularity.indexOf(a.id)-popularity.indexOf(b.id)):filtered;
  return <><PageHeading eyebrow="YOUR LIBRARY" title={category==="All"?"All songs":category} description="A little something for every moment." action={<button type="button" className="primary-button" onClick={()=>filtered[0]&&play(filtered[0])}><Play size={14} fill="currentColor" aria-hidden="true"/> Play all</button>}/><div className="filter-row" role="group" aria-label="Sort songs">{["All tracks","Recently added","Most played"].map(item=><button type="button" key={item} aria-pressed={sort===item} className={sort===item?"filter-active":""} onClick={()=>setSort(item)}>{item}</button>)}<span className="song-count" aria-live="polite">{visible.length} songs</span></div><SongList items={visible}/></>;
}

export function FavoritesView() {
  const {favorites:favoriteIds,play}=usePlayer();
  const favorites = tracks.filter(track => favoriteIds.includes(track.id));
  return <>
    <div className="feature-heading"><HeartPlaceholder/><div><p className="eyebrow">YOUR COLLECTION</p><h1>Liked songs</h1><p className="subheading">{favorites.length} songs you want to keep close.</p><button className="primary-button" onClick={()=>favorites[0]&&play(favorites[0])}><Play size={14} fill="currentColor"/> Play favorites</button></div></div>
    <SectionHeading title="Your favorites" moreLabel=""/>
    <SongList items={favorites}/>
  </>;
}

export function CategoriesView() {
  return <>
    <PageHeading eyebrow="EXPLORE" title="Find your sound" description="Pick a mood and let the music take it from there."/>
    <div className="category-grid">{categories.slice(1).map((category, i) => <Link key={category} href={`/songs?category=${category}`} className={`category-card category-${i}`}><span>0{i + 1}</span><b>{category}</b><small>{tracks.filter(track => track.category === category).length + 7} songs</small></Link>)}</div>
    <SectionHeading title="Popular right now"/><div className="card-row">{tracks.slice(0, 6).map(track => <SongCard key={track.id} track={track}/>)}</div>
  </>;
}

const settingsSections = [
  { id: "Playback", icon: Music2, description: "Audio quality, streaming, and playback behavior." },
  { id: "Appearance", icon: Palette, description: "Choose the look and feel of Replay." },
  { id: "Notifications", icon: Bell, description: "Choose which updates you want to receive." },
  { id: "Account", icon: CircleUserRound, description: "Your profile, plan, and account details." },
] as const;

export function SettingsView() {
  const {isFavorite}=usePlayer();
  const [section, setSection] = useState<(typeof settingsSections)[number]["id"]>("Playback");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const {theme,accent,compact,setTheme,setAccent,setCompact}=useAppearance();
  const selected = settingsSections.find(item => item.id === section) ?? settingsSections[0];
  const SectionIcon = selected.icon;
  return <>
    <PageHeading eyebrow="PREFERENCES" title="Settings" description="Make Replay feel like yours."/>
    <div className="settings-layout">
      <nav className="settings-menu" aria-label="Settings sections" role="tablist" onKeyDown={event=>{const current=settingsSections.findIndex(item=>item.id===section);let next=current;if(event.key==="ArrowRight"||event.key==="ArrowDown")next=(current+1)%settingsSections.length;else if(event.key==="ArrowLeft"||event.key==="ArrowUp")next=(current-1+settingsSections.length)%settingsSections.length;else if(event.key==="Home")next=0;else if(event.key==="End")next=settingsSections.length-1;else return;event.preventDefault();setSection(settingsSections[next].id);tabRefs.current[next]?.focus();}}>
        {settingsSections.map(({ id, icon: Icon },index) => <button key={id} ref={element=>{tabRefs.current[index]=element}} id={`settings-tab-${id.toLowerCase()}`} type="button" role="tab" aria-controls="settings-tabpanel" aria-selected={section === id} tabIndex={section===id?0:-1} className={section === id ? "setting-selected" : ""} onClick={() => setSection(id)}><Icon size={16} aria-hidden="true"/><span>{id}</span><ChevronRight className="setting-nav-chevron" size={14} aria-hidden="true"/></button>)}
      </nav>
      <section className="settings-panel" id="settings-tabpanel" role="tabpanel" aria-labelledby={`settings-tab-${section.toLowerCase()}`} tabIndex={0}>
        <div className="settings-panel-heading"><span className="settings-heading-icon"><SectionIcon size={18}/></span><div><h2>{section}</h2><p>{selected.description}</p></div></div>
        {section === "Playback" && <>
          <div className="settings-group-label">LISTENING</div>
          <ToggleRow title="Autoplay" description="Keep the music going when your queue ends." defaultChecked/>
          <ToggleRow title="Crossfade" description="Blend the end of one track into the next."/>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="crossfade-duration"><b>Crossfade duration</b><small id="crossfade-duration-help">Time to blend between tracks.</small></label><span className="select-control"><select id="crossfade-duration" aria-describedby="crossfade-duration-help" defaultValue="5 seconds"><option>3 seconds</option><option>5 seconds</option><option>8 seconds</option><option>12 seconds</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Normalize volume" description="Keep songs at a consistent listening level." defaultChecked/>
          <div className="settings-group-label settings-group-spaced">STREAMING</div>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="audio-quality"><b>Audio quality</b><small id="audio-quality-help">Higher quality uses more data.</small></label><span className="select-control"><select id="audio-quality" aria-describedby="audio-quality-help" defaultValue="High"><option>Low</option><option>Normal</option><option>High</option><option>Very high</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <div className="setting-select setting-select-dropdown"><label className="setting-select-label" htmlFor="mobile-streaming"><b>Streaming over mobile data</b><small id="mobile-streaming-help">Choose when Replay can use cellular data.</small></label><span className="select-control"><select id="mobile-streaming" aria-describedby="mobile-streaming-help" defaultValue="Ask every time"><option>Always</option><option>Ask every time</option><option>Never</option></select><ChevronDown size={15} aria-hidden="true"/></span></div>
          <ToggleRow title="Download over mobile data" description="Allow offline downloads without Wi-Fi."/>
        </>}
        {section === "Appearance" && <>
          <div className="settings-group-label">THEME</div>
          <div className="theme-options">{[{name:"Dark",icon:Moon},{name:"Light",icon:Sun},{name:"System",icon:Monitor}].map(({name,icon:Icon})=><button key={name} type="button" className={`theme-option ${theme===name?"selected":""}`} onClick={()=>setTheme(name as ThemeChoice)} aria-pressed={theme===name}><span className={`theme-preview theme-${name.toLowerCase()}`}><Icon size={18}/></span><span>{name}</span>{theme===name&&<Check className="theme-check" size={15}/>}</button>)}</div>
          <div className="setting-select"><div><b>Accent color</b><small>Used for selected controls and highlights.</small></div><div className="accent-options" role="group" aria-label="Accent color">{["#fd8d47","#c278ff","#42b6a5","#e96c87","#6f9eff"].map(color=><button key={color} className={`accent-swatch ${accent===color?"selected":""}`} style={{"--swatch":color} as React.CSSProperties} onClick={()=>setAccent(color)} aria-label={`Choose accent ${color}`} aria-pressed={accent===color}/>)}</div></div>
          <ToggleRow title="Compact song list" description="Show more tracks in your library at once." defaultChecked={compact} onChange={setCompact}/>
          <ToggleRow title="Show animated artwork" description="Allow subtle motion on featured album covers." defaultChecked/>
        </>}
        {section === "Notifications" && <>
          <div className="settings-callout"><span><BellRing size={17}/></span><p>Stay in the loop. Choose the updates that matter to you.</p></div>
          <div className="settings-group-label">EMAIL UPDATES</div>
          <ToggleRow title="New releases" description="Get updates when artists you follow release music." defaultChecked/>
          <ToggleRow title="Playlist picks" description="A weekly mix of new playlists and recommendations."/>
          <ToggleRow title="Listening activity" description="Occasional listening summaries and highlights."/>
          <div className="settings-group-label settings-group-spaced">IN-APP</div>
          <ToggleRow title="Product announcements" description="Tips, features, and updates from Replay." defaultChecked/>
          <ToggleRow title="Friend activity" description="When people you follow share a playlist."/>
        </>}
        {section === "Account" && <>
          <div className="account-card"><img src="/covers/avatar.png" alt="Josh Wesley"/><div><b>Josh Wesley</b><small>josh.wesley@example.com</small><span className="account-status"><Check size={11}/> Verified account</span></div><button type="button" className="outline-button" onClick={()=>window.alert("Profile editing is available in this demo soon.")}>Edit profile</button></div>
          <div className="settings-group-label settings-group-spaced">YOUR PLAN</div>
          <div className="plan-card"><div className="plan-icon"><Headphones size={18}/></div><div className="plan-copy"><span className="plan-kicker">CURRENT PLAN</span><b>Replay Premium</b><small>Unlimited listening · High quality audio</small></div><span className="plan-badge">ACTIVE</span></div>
          <div className="account-details"><div><span>Member since</span><b>January 2024</b></div><div><span>Country or region</span><b>United States</b></div><div><span>Offline storage</span><b>2.4 GB used</b></div></div>
          <div className="settings-group-label settings-group-spaced">YOUR DEVICES</div>
          <div className="device-row"><span><Monitor size={16}/></span><div><b>This device</b><small>Mac · Active now</small></div><span className="device-current"><Radio size={12}/> Current</span></div>
          <div className="account-actions"><button type="button" onClick={()=>{const blob=new Blob([JSON.stringify({name:"Josh Wesley",email:"josh.wesley@example.com",favorites:tracks.filter(t=>isFavorite(t.id)).map(t=>t.title)},null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const anchor=document.createElement("a");anchor.href=url;anchor.download="replay-account-data.json";anchor.click();URL.revokeObjectURL(url)}}><Download size={14}/> Download your data</button><button type="button" onClick={()=>window.alert("Your demo account is private. No account data is shared.")}><ShieldCheck size={14}/> Privacy and security</button></div>
        </>}
      </section>
    </div>
  </>;
}

export function AlbumView({ slug }: { slug: string }) {
  const {play,toggleFavorite,isFavorite}=usePlayer();
  const album = tracks.find(track => track.album.toLowerCase().replaceAll(" ", "-") === decodeURIComponent(slug))?.album ?? "Echoes of Midnight";
  const albumTracks = tracks.filter(track => track.album === album);
  const albumSaved=albumTracks.length>0&&albumTracks.every(track=>isFavorite(track.id));
  const feature = albumTracks[0] ?? tracks[5];
  return <>
    <Link href="/songs" className="back-link"><ArrowLeft size={14}/> Back to songs</Link>
    <div className="album-header"><CoverArt src={feature?.cover} alt={`${album} cover`}/><div><p className="eyebrow">ALBUM</p><h1>{album}</h1><p className="subheading">{feature?.artist ?? "Artist name"} · 2024 · {albumTracks.length || 8} songs</p><div className="album-actions"><button type="button" className="primary-button" onClick={()=>albumTracks[0]&&play(albumTracks[0])}><Play size={14} fill="currentColor" aria-hidden="true"/> Play</button><button type="button" className="outline-button" aria-pressed={albumSaved} onClick={()=>albumTracks.forEach(track=>{if(albumSaved)isFavorite(track.id)&&toggleFavorite(track.id);else !isFavorite(track.id)&&toggleFavorite(track.id)})}><Heart size={14} aria-hidden="true" fill={albumSaved?"currentColor":"none"}/> {albumSaved?"Saved":"Save album"}</button></div></div></div>
    <div className="album-track-head"><SectionHeading title="Tracks" moreLabel=""/><span>3 hr 14 min</span></div>
    <SongList items={albumTracks.length ? albumTracks : tracks.slice(0, 6)}/>
  </>;
}

export function PlayingView({ id }: { id: string }) {
  const routeTrack=tracks.find(item=>item.id===id)??tracks[5]; const {currentTrack,play,isPlaying,togglePlayback,next,previous,currentTime,duration,seek,shuffle,repeat,toggleShuffle,toggleRepeat,toggleFavorite,isFavorite}=usePlayer();
  const [queueOpen,setQueueOpen]=useState(false),[detailsOpen,setDetailsOpen]=useState(false);
  useEffect(()=>{if(routeTrack&&routeTrack.id!==currentTrack.id)play(routeTrack)},[id]);
  const track=currentTrack;
  return <div className="playing-screen"><Link href="/" className="back-link"><ChevronDown size={15}/> Back to Replay</Link><div className="playing-card"><CoverArt src={track.cover} alt={`${track.album} cover`}/><p className="eyebrow">NOW PLAYING</p><h1>{track.title}</h1><p className="subheading">{track.artist} · {track.album}</p>
    <input className="playing-range" aria-label="Track progress" type="range" min="0" max={duration} value={currentTime} onChange={e=>seek(Number(e.target.value))} style={{"--progress":`${duration?currentTime/duration*100:0}%`} as React.CSSProperties}/><div className="time"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
    <div className="big-controls"><button className={shuffle?"control-active":""} aria-label={shuffle?"Disable shuffle":"Enable shuffle"} aria-pressed={shuffle} onClick={toggleShuffle}><Shuffle size={18}/></button><button aria-label="Previous" onClick={previous}><SkipBack size={19}/></button><button className="large-play" aria-label={isPlaying?"Pause":"Play"} onClick={togglePlayback}>{isPlaying?<Pause size={19} fill="currentColor"/>:<Play size={19} fill="currentColor"/>}</button><button aria-label="Next" onClick={next}><SkipForward size={19}/></button><button className={repeat?"control-active":""} aria-label={repeat?"Disable repeat":"Enable repeat"} aria-pressed={repeat} onClick={toggleRepeat}><Repeat2 size={18}/></button></div>
    <div className="playing-bottom"><button type="button" onClick={()=>toggleFavorite(track.id)} aria-pressed={isFavorite(track.id)}><Heart size={14} aria-hidden="true" fill={isFavorite(track.id)?"currentColor":"none"}/> {isFavorite(track.id)?"Added to favorites":"Add to favorites"}</button><button type="button" aria-expanded={queueOpen} aria-controls="queue-panel" onClick={()=>setQueueOpen(open=>!open)}><ListMusic size={14} aria-hidden="true"/> Queue</button><button type="button" aria-expanded={detailsOpen} aria-controls="track-details" onClick={()=>setDetailsOpen(open=>!open)}><MoreHorizontal size={16} aria-hidden="true"/> More</button></div><div className={`queue-panel ${queueOpen?"queue-open":""}`} id="queue-panel" aria-labelledby="queue-heading"><b id="queue-heading">Up next</b><p>{tracks[(tracks.findIndex(item=>item.id===track.id)+1)%tracks.length]?.title} · {tracks[(tracks.findIndex(item=>item.id===track.id)+1)%tracks.length]?.artist}</p></div><div className={`queue-panel details-panel ${detailsOpen?"queue-open":""}`} id="track-details" aria-labelledby="details-heading"><b id="details-heading">Track details</b><p>{track.title} · {track.artist} · {track.album} · {track.category}</p></div>
  </div></div>;
}
