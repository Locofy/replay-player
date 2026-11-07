"use client";
import Link from "next/link";
import { useState } from "react";
import { usePlayer } from "@/components/player-context";
import { ArrowRight, Disc3, Heart, Music2, Play } from "lucide-react";
import { categories as defaultCategories, type Track } from "@/lib/music";

export const PLACEHOLDER_TRACK: Track = {
  id: "placeholder-track", title: "Song title", artist: "Artist name", album: "Album title",
  duration: "0:00", category: "Uncategorized", cover: "",
};

export function CoverArt({ src = "", alt = "Album artwork", className = "", rounded = true }: {
  src?: string; alt?: string; className?: string; rounded?: boolean;
}) {
  const [failed, setFailed] = useState(!src);
  const shapeClass = rounded ? "" : "cover-art-circle";
  return <span className={`cover-art ${shapeClass} ${className}`} aria-label={alt || undefined} role={alt ? "img" : undefined} aria-hidden={alt ? undefined : true}>
    {failed ? <span className="cover-art-placeholder"><Disc3 size={24} strokeWidth={1.5} aria-hidden="true"/></span> : <img src={src} alt="" aria-hidden="true" onError={() => setFailed(true)}/>}
  </span>;
}

export function PageHeading({ eyebrow = "YOUR LIBRARY", title = "Music library", description = "Your music will appear here.", action, className = "" }: {
  eyebrow?: string; title?: string; description?: string; action?: React.ReactNode; className?: string;
}) {
  return <div className={`page-heading ${className}`}><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="subheading">{description}</p></div>{action}</div>;
}

export function SectionHeading({ title = "Featured tracks", href = "/songs", moreLabel = "View all", className = "" }: {
  title?: string; href?: string; moreLabel?: string; className?: string;
}) {
  return <div className={`section-title ${className}`}><h2>{title}</h2>{moreLabel && <Link href={href}>{moreLabel} <ArrowRight size={14}/></Link>}</div>;
}

export function CategoryChips({ items = defaultCategories, initialValue = "All", onSelect, className = "" }: {
  items?: string[]; initialValue?: string; onSelect?: (category: string) => void; className?: string;
}) {
  const [selected, setSelected] = useState(initialValue);
  return <div className={`chips ${className}`} role="group" aria-label="Filter songs by category">{items.map(item => <button key={item} type="button" className={selected === item ? "selected" : ""} aria-pressed={selected === item} onClick={() => { setSelected(item); onSelect?.(item); }}>{item}</button>)}</div>;
}

export function SongCard({ track = PLACEHOLDER_TRACK, href, className = "" }: { track?: Track; href?: string; className?: string }) {
  const { play } = usePlayer();
  const destination = href ?? (track.id === PLACEHOLDER_TRACK.id ? "/songs" : `/album/${encodeURIComponent(track.album.toLowerCase().replaceAll(" ", "-"))}`);
  return <Link href={destination} className={`track-card ${className}`} onClick={() => track.id !== PLACEHOLDER_TRACK.id && play(track)}>
    <div className="cover-wrap"><CoverArt src={track.cover} alt={`${track.album || "Album"} cover`}/><span className="cover-play"><Play size={15} fill="currentColor"/></span></div>
    <b>{track.title || PLACEHOLDER_TRACK.title}</b><small>{track.artist || PLACEHOLDER_TRACK.artist}</small>
  </Link>;
}

export function SongList({ items = [], placeholderWhenEmpty = true, className = "" }: {
  items?: Track[]; placeholderWhenEmpty?: boolean; className?: string;
}) {
  const { toggleFavorite, isFavorite, play } = usePlayer();
  const rows = items.length ? items : placeholderWhenEmpty ? [PLACEHOLDER_TRACK] : [];
  if (!rows.length) return <EmptyState title="No songs yet" description="Add music to see it collected here."/>;
  return <div className={`track-table ${className}`} role="table" aria-label="Songs">
    <div className="table-head" role="row"><span role="columnheader">#</span><span role="columnheader">Title</span><span role="columnheader">Album</span><span role="columnheader">Duration</span><span role="columnheader">Actions</span></div>
    {rows.map((track, index) => {
      const placeholder = track.id === PLACEHOLDER_TRACK.id;
      return <div className={`track-row ${placeholder ? "placeholder-row" : ""}`} key={`${track.id}-${index}`} role="row">
        <span className="track-number" role="cell">{placeholder ? "—" : String(index + 1).padStart(2, "0")}</span>
        <div role="cell">{placeholder ? <div className="track-name"><CoverArt src={track.cover} alt="Placeholder album artwork"/><span><b>{track.title}</b><small>{track.artist}</small></span></div> : <Link href={`/playing/${track.id}`} className="track-name" onClick={()=>play(track)}><CoverArt src={track.cover} alt={`${track.album} cover`}/><span><b>{track.title}</b><small>{track.artist}</small></span></Link>}</div>
        <span className="track-album" role="cell">{placeholder ? track.album : <Link href={`/album/${encodeURIComponent(track.album.toLowerCase().replaceAll(" ", "-"))}`}>{track.album}</Link>}</span><span className="track-duration" role="cell">{track.duration}</span>
        <div role="cell">{placeholder ? <span aria-hidden="true"/> : <button type="button" className={`more-button ${isFavorite(track.id)?"favorite-active":""}`} aria-label={isFavorite(track.id)?`Remove ${track.title} from favorites`:`Add ${track.title} to favorites`} aria-pressed={isFavorite(track.id)} onClick={()=>toggleFavorite(track.id)}><Heart size={16} fill={isFavorite(track.id)?"currentColor":"none"} aria-hidden="true"/></button>}</div>
      </div>;
    })}
  </div>;
}

export function EmptyState({ title = "Nothing to play yet", description = "Your music will show up here once it is available.", icon: Icon = Music2 }: {
  title?: string; description?: string; icon?: React.ComponentType<{size?:number;strokeWidth?:number}>;
}) {
  return <div className="empty-state"><span><Icon size={23} strokeWidth={1.6}/></span><h2>{title}</h2><p>{description}</p></div>;
}

export function ToggleRow({ title = "Setting name", description = "Add a short explanation for this option.", defaultChecked = false, onChange }: {
  title?: string; description?: string; defaultChecked?: boolean; onChange?: (enabled: boolean) => void;
}) {
  const [enabled, setEnabled] = useState(defaultChecked);
  return <div className="setting-switch"><div><b>{title}</b><small>{description}</small></div><button type="button" onClick={() => { const next = !enabled; setEnabled(next); onChange?.(next); }} className={`switch ${enabled ? "on" : ""}`} aria-label={title} aria-pressed={enabled}><i aria-hidden="true"/></button></div>;
}

export function PlaylistTile({ title = "New playlist", description = "A playlist for your next mood.", cover = "", href = "/songs" }: {
  title?: string; description?: string; cover?: string; href?: string;
}) {
  return <Link href={href} className="playlist-tile"><CoverArt src={cover} alt={`${title} cover`}/><span><b>{title}</b><small>{description}</small></span><span className="tile-play"><Play size={14} fill="currentColor"/></span></Link>;
}

export function HeartPlaceholder() { return <div className="favorite-art"><Heart size={54} strokeWidth={1.5}/></div>; }
