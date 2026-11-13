import { PageHeading, SectionHeading, SongList } from "@/components/music-ui";
import { StatCard, DiscoveryLinks } from "@/components/discovery/discovery-cards";
import { tracks } from "@/lib/music";
export default function RecentlyPlayed(){return <><PageHeading eyebrow="YOUR LISTENING JOURNEY" title="Recently played" description="A sample listening history full of songs worth revisiting."/><div className="stats-grid"><StatCard/><StatCard label="Favorite mood" value="Relax" detail="Time to slow things down"/><StatCard label="Artists explored" value="12" detail="Keep finding new voices"/></div><SectionHeading title="Sample listening history" moreLabel=""/><SongList items={tracks.slice(0,8)}/><DiscoveryLinks/></>}
