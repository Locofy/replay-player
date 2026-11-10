import { AlbumContent } from "@/components/album/album-content";
export default async function Album({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <div className="page-surface" style={{ backgroundColor: "var(--bg)", color: "var(--white)" }}><AlbumContent slug={slug} /></div>;
}
