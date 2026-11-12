"use client";
import { useEffect, useRef, useState } from "react";
import { Check, FileAudio, ImagePlus, Play, Upload, WifiOff, X } from "lucide-react";
import { CoverArt } from "@/components/music-ui";
import { usePlayer } from "@/components/player-context";
import { categories, type Track } from "@/lib/music";
import { AUDIO_EXTENSIONS, MAX_UPLOAD_BYTES, formatBytes, isSupportedAudio } from "@/lib/uploads";

type Step = "pick" | "details" | "uploading" | "failed" | "done";
type Details = { title: string; artist: string; album: string; category: string };

const ACCEPT = ["audio/mpeg", "audio/wav", "audio/flac", "audio/mp4", ...AUDIO_EXTENSIONS].join(",");
const UPLOAD_CATEGORIES = categories.filter(item => item !== "All");
const DEFAULT_ARTIST = "Josh Wesley";

const titleFromFile = (name: string) => {
  const base = name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ").trim();
  return base.replace(/\b\w/g, letter => letter.toUpperCase());
};
const formatDuration = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;

function readDuration(file: File) {
  return new Promise<string>(resolve => {
    const url = URL.createObjectURL(file);
    const audio = new Audio();
    const done = (value: string) => { URL.revokeObjectURL(url); resolve(value); };
    audio.preload = "metadata";
    audio.onloadedmetadata = () => done(Number.isFinite(audio.duration) ? formatDuration(audio.duration) : "0:00");
    audio.onerror = () => done("0:00");
    audio.src = url;
  });
}

export function UploadButton() {
  const [open, setOpen] = useState(false);
  return <>
    <button type="button" className="upload-entry" onClick={() => setOpen(true)} aria-haspopup="dialog"><Upload size={14} aria-hidden="true"/> Upload music</button>
    {open && <UploadModal onClose={() => setOpen(false)}/>}
  </>;
}

export function UploadModal({ onClose }: { onClose: () => void }) {
  const { addUpload, play } = usePlayer();
  const [step, setStep] = useState<Step>("pick");
  const [file, setFile] = useState<File | null>(null);
  const [duration, setDuration] = useState("0:00");
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [details, setDetails] = useState<Details>({ title: "", artist: DEFAULT_ARTIST, album: "", category: "Relax" });
  const [fileError, setFileError] = useState("");
  const [formError, setFormError] = useState("");
  const [failure, setFailure] = useState("");
  const [progress, setProgress] = useState({ loaded: 0, total: 0, started: 0 });
  const [dragging, setDragging] = useState(false);
  const [uploaded, setUploaded] = useState<Track | null>(null);
  const request = useRef<XMLHttpRequest | null>(null);
  const audioInput = useRef<HTMLInputElement>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  useEffect(() => () => { if (coverPreview) URL.revokeObjectURL(coverPreview); }, [coverPreview]);

  const chooseFile = async (picked: File | undefined) => {
    if (!picked) return;
    if (!isSupportedAudio(picked)) { setFileError(`${picked.name} is not an audio file we support. Use MP3, WAV, FLAC or M4A.`); return; }
    if (picked.size > MAX_UPLOAD_BYTES) { setFileError(`${picked.name} is ${formatBytes(picked.size)}. Files can be up to 200 MB.`); return; }
    setFileError("");
    setFile(picked);
    setDetails(value => ({ ...value, title: titleFromFile(picked.name) }));
    setDuration(await readDuration(picked));
    setStep("details");
  };

  const chooseCover = (picked: File | undefined) => {
    if (!picked || !picked.type.startsWith("image/")) return;
    setCover(picked);
    setCoverPreview(URL.createObjectURL(picked));
  };

  const send = () => {
    if (!file) return;
    if (!details.title.trim() || !details.artist.trim()) { setFormError("Add a title and an artist."); return; }
    setFormError("");
    const body = new FormData();
    body.append("audio", file);
    if (cover) body.append("cover", cover);
    Object.entries(details).forEach(([key, value]) => body.append(key, value));
    body.append("duration", duration);
    const xhr = new XMLHttpRequest();
    request.current = xhr;
    setProgress({ loaded: 0, total: file.size, started: Date.now() });
    setStep("uploading");
    xhr.upload.onprogress = event => setProgress(value => ({ ...value, loaded: event.loaded, total: event.total || value.total }));
    xhr.onload = () => {
      request.current = null;
      if (xhr.status >= 200 && xhr.status < 300) {
        const track = JSON.parse(xhr.responseText) as Track;
        addUpload(track);
        setUploaded(track);
        setStep("done");
      } else {
        let message = "The server could not save this track.";
        try { message = JSON.parse(xhr.responseText).error ?? message; } catch {}
        setFailure(message);
        setStep("failed");
      }
    };
    xhr.onerror = () => { request.current = null; setFailure("Your connection dropped."); setStep("failed"); };
    xhr.open("POST", "/api/uploads");
    xhr.send(body);
  };

  const cancel = () => { request.current?.abort(); request.current = null; setStep("details"); };
  const reset = () => { setFile(null); setCover(null); setCoverPreview(""); setUploaded(null); setDetails({ title: "", artist: DEFAULT_ARTIST, album: "", category: "Relax" }); setStep("pick"); };

  const percent = progress.total ? Math.round(progress.loaded / progress.total * 100) : 0;
  const elapsed = (Date.now() - progress.started) / 1000;
  const remaining = progress.loaded && elapsed > 1 ? Math.max(1, Math.round((progress.total - progress.loaded) / (progress.loaded / elapsed))) : null;

  const fileRow = file && <div className="upload-file"><FileAudio size={20} aria-hidden="true"/><span><b>{file.name}</b><small>{formatBytes(file.size)} · {duration}</small></span>
    {step === "details" && <button type="button" className="upload-link" onClick={() => audioInput.current?.click()}>Change file</button>}</div>;

  const heading: Record<Step, [string, string?]> = {
    pick: ["Upload music", "Add your own tracks to your Replay library."],
    details: ["Track details", "This is how it shows in your library."],
    uploading: ["Uploading", "You can keep listening while this finishes."],
    failed: ["Upload stopped"],
    done: ["Upload complete"],
  };
  const [title, subtitle] = heading[step];

  return <div className="upload-scrim" onMouseDown={event => { if (event.target === event.currentTarget && step !== "uploading") onClose(); }}>
    <div className="upload-modal" role="dialog" aria-modal="true" aria-labelledby="upload-title">
      <input ref={audioInput} type="file" accept={ACCEPT} hidden onChange={event => { chooseFile(event.target.files?.[0]); event.target.value = ""; }}/>
      <div className="upload-head"><div><h2 id="upload-title">{title}</h2>{subtitle && <p>{subtitle}</p>}</div>
        <button type="button" className="upload-close" aria-label="Close upload" onClick={onClose}><X size={16} aria-hidden="true"/></button></div>

      {step === "pick" && <>
        <div className={`upload-drop ${dragging ? "dragging" : ""}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); chooseFile(event.dataTransfer.files[0]); }}>
          <span className="upload-drop-icon"><Upload size={22} aria-hidden="true"/></span>
          <b>Drop audio files here</b><small>MP3, WAV, FLAC or M4A, up to 200 MB each</small>
          <button type="button" className="upload-btn upload-primary" onClick={() => audioInput.current?.click()}>Choose files</button>
        </div>
        {fileError && <p className="upload-error" role="alert">{fileError}</p>}
        <small className="upload-fine">Only upload music you own or have the rights to share.</small>
      </>}

      {step === "details" && <>
        {fileRow}
        <div className="upload-form">
          <button type="button" className="upload-cover" onClick={() => coverInput.current?.click()} aria-label={cover ? "Change cover" : "Add cover"}>
            {coverPreview ? <img src={coverPreview} alt=""/> : <><ImagePlus size={20} aria-hidden="true"/>Add cover</>}
          </button>
          <input ref={coverInput} type="file" accept="image/*" hidden onChange={event => chooseCover(event.target.files?.[0])}/>
          <div className="upload-fields">
            {(["title", "artist", "album"] as const).map(key => <div className="upload-field" key={key}>
              <label htmlFor={`upload-${key}`}>{key[0].toUpperCase() + key.slice(1)}</label>
              <input id={`upload-${key}`} value={details[key]} placeholder={key === "album" ? "Uploads" : undefined} aria-invalid={key !== "album" && !!formError && !details[key].trim()} onChange={event => setDetails(value => ({ ...value, [key]: event.target.value }))}/>
            </div>)}
          </div>
        </div>
        <div className="upload-field"><span className="upload-label" id="upload-category">Category</span>
          <div className="upload-chips" role="group" aria-labelledby="upload-category">{UPLOAD_CATEGORIES.map(item => <button key={item} type="button" aria-pressed={details.category === item} onClick={() => setDetails(value => ({ ...value, category: item }))}>{item}</button>)}</div></div>
        {formError && <p className="upload-error" role="alert">{formError}</p>}
        <div className="upload-foot"><button type="button" className="upload-btn upload-ghost" onClick={onClose}>Cancel</button><button type="button" className="upload-btn upload-primary" onClick={send}><Upload size={15} aria-hidden="true"/> Upload track</button></div>
      </>}

      {step === "uploading" && <>
        <div className="upload-progress" aria-live="polite">
          {fileRow}
          <div className="upload-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}><i style={{ width: `${percent}%` }}/></div>
          <div className="upload-row"><span>{formatBytes(progress.loaded)} of {formatBytes(progress.total)}</span><span>{percent >= 100 ? "Processing" : remaining ? `About ${remaining} seconds left` : `${percent}%`}</span></div>
        </div>
        <div className="upload-foot"><button type="button" className="upload-btn upload-ghost" onClick={cancel}>Cancel upload</button></div>
      </>}

      {step === "failed" && <>
        <div className="upload-alert" role="alert"><WifiOff size={18} aria-hidden="true"/><div><b>{failure}{percent > 0 && percent < 100 ? ` Stopped at ${percent}%.` : ""}</b><p>Your track details are kept, so you can try again.</p></div></div>
        {fileRow}
        <div className="upload-foot"><button type="button" className="upload-btn upload-ghost" onClick={() => setStep("details")}>Edit details</button><button type="button" className="upload-btn upload-primary" onClick={send}>Try again</button></div>
      </>}

      {step === "done" && uploaded && <>
        <div className="upload-done"><div className="upload-done-art"><CoverArt src={uploaded.cover} alt={`${uploaded.title} cover`}/><span className="upload-done-badge"><Check size={16} strokeWidth={3} aria-hidden="true"/></span></div>
          <h3>{uploaded.title}</h3><p>{uploaded.artist} · {uploaded.album} · {uploaded.category}</p><p>Added to your library.</p></div>
        <div className="upload-foot"><button type="button" className="upload-btn upload-ghost" onClick={reset}>Upload another</button><button type="button" className="upload-btn upload-primary" onClick={() => { play(uploaded); onClose(); }}><Play size={14} fill="currentColor" aria-hidden="true"/> Play now</button></div>
      </>}
    </div>
  </div>;
}
