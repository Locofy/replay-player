import { PlayingContent } from "@/components/player/playing-content";
export default async function Playing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <div className="page-surface" style={{ backgroundColor: "var(--bg)", color: "var(--white)" }}><PlayingContent id={id} /></div>;
}
