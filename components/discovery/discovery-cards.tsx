import Link from "next/link";
import { CoverArt, SongCard } from "@/components/music-ui";
import { tracks } from "@/lib/music";

export function ArtistCard({ name = "Lana Rivers", genre = "Dream pop · Indie", cover = "/covers/02.png", href = "/songs" }: {name?:string;genre?:string;cover?:string;href?:string}) {
  return <Link href={href} className="artist-card"><CoverArt src={cover} alt={`${name} portrait`}/><b>{name}</b><small>{genre}</small></Link>;
}
export function CollectionCard({title="Midnight City",description="24 songs · A soundtrack for late night drives",cover="/covers/03.png",href="/songs"}:{title?:string;description?:string;cover?:string;href?:string}) {
 return <Link href={href} className="collection-card"><CoverArt src={cover} alt={`${title} artwork`}/><div><b>{title}</b><p>{description}</p><span>Explore collection →</span></div></Link>;
}
export function StatCard({label="Songs discovered",value="128",detail="Your listening journey"}:{label?:string;value?:string;detail?:string}) {
 return <div className="stat-card"><small>{label}</small><strong>{value}</strong><p>{detail}</p></div>;
}
export function DiscoveryLinks() {
 return <nav style={{ display: "grid", flexDirection: "row" }} className="discovery-links" aria-label="Discover more music">{[["Artists","Meet your next favorite artist","/artists"],["Playlists","Find a mix for your mood","/playlists"],["Recently played","Pick up where you left off","/recently-played"],["Discover","Explore the full collection","/search"]].map(([title,description,href])=><Link href={href} key={href}><b>{title}</b><small>{description}</small><span aria-hidden="true">↗</span></Link>)}</nav>;
}
export function TrackShelf({items=tracks.slice(0,6)}:{items?:typeof tracks}) {
 return <div className="card-row">{items.map(track=><SongCard key={track.id} track={track}/>)}</div>;
}
