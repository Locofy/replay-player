import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import type { Track } from "@/lib/music";
import { MAX_UPLOAD_BYTES, isSupportedAudio } from "@/lib/uploads";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const MANIFEST = path.join(UPLOAD_DIR, "manifest.json");

async function readManifest(): Promise<Track[]> {
  try { return JSON.parse(await readFile(MANIFEST, "utf8")); } catch { return []; }
}

const slug = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "track";
const extension = (name: string, fallback: string) => path.extname(name).toLowerCase() || fallback;

export async function GET() {
  return Response.json(await readManifest());
}

export async function POST(request: Request) {
  const form = await request.formData();
  const audio = form.get("audio");
  const cover = form.get("cover");
  const title = String(form.get("title") ?? "").trim();
  const artist = String(form.get("artist") ?? "").trim();
  if (!(audio instanceof File)) return Response.json({ error: "Choose an audio file to upload." }, { status: 400 });
  if (!isSupportedAudio(audio)) return Response.json({ error: "This file type is not supported. Use MP3, WAV, FLAC or M4A." }, { status: 415 });
  if (audio.size > MAX_UPLOAD_BYTES) return Response.json({ error: "This file is over 200 MB." }, { status: 413 });
  if (!title || !artist) return Response.json({ error: "Add a title and an artist." }, { status: 400 });

  await mkdir(UPLOAD_DIR, { recursive: true });
  const id = `${slug(title)}-${randomUUID().slice(0, 8)}`;
  const audioName = `${id}${extension(audio.name, ".mp3")}`;
  await writeFile(path.join(UPLOAD_DIR, audioName), Buffer.from(await audio.arrayBuffer()));
  let coverUrl = "";
  if (cover instanceof File && cover.size && cover.type.startsWith("image/")) {
    const coverName = `${id}-cover${extension(cover.name, ".png")}`;
    await writeFile(path.join(UPLOAD_DIR, coverName), Buffer.from(await cover.arrayBuffer()));
    coverUrl = `/uploads/${coverName}`;
  }
  const track: Track = {
    id, title, artist,
    album: String(form.get("album") ?? "").trim() || "Uploads",
    category: String(form.get("category") ?? "Relax"),
    duration: String(form.get("duration") ?? "0:00"),
    cover: coverUrl,
    audio: `/uploads/${audioName}`,
    uploaded: true,
  };
  await writeFile(MANIFEST, JSON.stringify([track, ...(await readManifest())], null, 2));
  return Response.json(track, { status: 201 });
}
