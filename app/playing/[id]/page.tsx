import { PlayingContent } from "@/components/player/playing-content";
export default async function Playing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlayingContent id={id} />;
}
