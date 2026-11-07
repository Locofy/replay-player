"use client";
import Link from "next/link";



import { tracks, categories } from "@/lib/music";




export function CategoryGrid(){ return <div className="category-grid">{categories.slice(1).map((category, i) => <Link key={category} href={`/songs?category=${category}`} className={`category-card category-${i}`}><span>0{i + 1}</span><b>{category}</b><small>{tracks.filter(track => track.category === category).length + 7} songs</small></Link>)}</div>; }