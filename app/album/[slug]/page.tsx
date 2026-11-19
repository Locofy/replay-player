import { AlbumContent } from "@/components/album/album-content";
export default async function Album({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AlbumContent slug={slug} />;
}
