import { AlbumView } from "@/components/views";
export default async function Album({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <AlbumView slug={slug} />;
}
