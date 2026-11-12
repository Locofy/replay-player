import { PageHeading, SectionHeading } from "@/components/music-ui";
import { CollectionCard, DiscoveryLinks } from "@/components/discovery/discovery-cards";
import { playlists, tracks } from "@/lib/music";
export default function Playlists(){return <div className="page-surface" style={{ backgroundColor: "var(--bg)", color: "var(--white)" }}><PageHeading eyebrow="CURATED FOR YOU" title="Playlists" description="A little inspiration for whatever today brings."/><div className="collection-grid">{playlists.map((title,index)=><CollectionCard key={title} title={title} description={`${18+index*2} songs · A mix made for your mood`} cover={tracks[index%tracks.length].cover}/>)}</div><SectionHeading title="Start somewhere new" moreLabel=""/><CollectionCard/><DiscoveryLinks/></div>}
