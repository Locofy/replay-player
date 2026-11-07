"use client";
import { useState } from "react";
import { FeaturedCarousel, HomeCategoryPicker, MoodPlaylistsSection, PopularSongsSection } from "@/components/home-sections";
import { DiscoveryLinks } from "@/components/discovery/discovery-cards";
export default function Home() {
  const [active, setActive] = useState("All");
  return <>
    <FeaturedCarousel/>
    <HomeCategoryPicker onSelect={setActive}/>
    <PopularSongsSection category={active}/>
    <MoodPlaylistsSection/>
    <DiscoveryLinks/>
  </>;
}
