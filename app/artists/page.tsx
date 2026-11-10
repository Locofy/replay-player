import { PageHeading, SectionHeading } from "@/components/music-ui";
import { ArtistCard, DiscoveryLinks, TrackShelf } from "@/components/discovery/discovery-cards";
import { tracks } from "@/lib/music";
export default function Artists(){return <div className="page-surface" style={{ backgroundColor: "var(--bg)", color: "var(--white)" }}><PageHeading eyebrow="THE PEOPLE BEHIND THE MUSIC" title="Artists" description="Fresh voices, familiar favorites, and everyone in between."/><div className="artist-grid">{tracks.map(track=><ArtistCard key={track.id} name={track.artist} genre={track.category} cover={track.cover} href={`/album/${encodeURIComponent(track.album.toLowerCase().replaceAll(" ","-"))}`}/>)}</div><SectionHeading title="From these artists"/><TrackShelf/><DiscoveryLinks/></div>}
