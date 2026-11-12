export const MAX_UPLOAD_BYTES = 200 * 1024 * 1024;
export const AUDIO_TYPES = ["audio/mpeg", "audio/mp3", "audio/wav", "audio/x-wav", "audio/wave", "audio/flac", "audio/x-flac", "audio/mp4", "audio/x-m4a", "audio/aac"];
export const AUDIO_EXTENSIONS = [".mp3", ".wav", ".flac", ".m4a"];

export function isSupportedAudio(file: { name: string; type: string }) {
  const name = file.name.toLowerCase();
  return AUDIO_TYPES.includes(file.type) || AUDIO_EXTENSIONS.some(ext => name.endsWith(ext));
}

export function formatBytes(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
