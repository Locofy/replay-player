import { PlayingView } from "@/components/views";
export default async function Playing({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <PlayingView id={id} />;
}
