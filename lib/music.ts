export type Track = { id: string; title: string; artist: string; album: string; duration: string; category: string; cover: string; favorite?: boolean; audio?: string; uploaded?: boolean };
export const tracks: Track[] = [
  { id:"golden-days", title:"Golden Days", artist:"Felix Carter", album:"Echoes", duration:"3:42", category:"Relax", cover:"/covers/01.png", favorite:true },
  { id:"waves-of-time", title:"Waves of Time", artist:"Lana Rivers", album:"Afterglow", duration:"4:08", category:"Sad", cover:"/covers/02.png" },
  { id:"fading-horizon", title:"Fading Horizon", artist:"Ella Hunt", album:"Postcards", duration:"3:21", category:"Relaxing", cover:"/covers/03.png", favorite:true },
  { id:"electric-dreams", title:"Electric Dreams", artist:"Mia Lowell", album:"Electric Dreams", duration:"3:56", category:"Energetic", cover:"/covers/04.png" },
  { id:"shadows-and-light", title:"Shadows & Light", artist:"Ryan Miles", album:"Midnight Stories", duration:"4:12", category:"Jazz", cover:"/covers/05.png", favorite:true },
  { id:"echoes-of-midnight", title:"Echoes of Midnight", artist:"Jon Hickman", album:"Echoes of Midnight", duration:"3:42", category:"Alternative", cover:"/covers/06.png" },
  { id:"city-lights", title:"City Lights", artist:"The Paper Kites", album:"Night Drive", duration:"3:35", category:"Party", cover:"/covers/07.png" },
  { id:"slow-motion", title:"Slow Motion", artist:"June Wilder", album:"Sunday Afternoon", duration:"4:01", category:"Romance", cover:"/covers/08.png", favorite:true },
  { id:"blue-hour", title:"Blue Hour", artist:"Nora Vale", album:"Quiet Hours", duration:"2:58", category:"Relax", cover:"/covers/09.png" },
  { id:"stay-awake", title:"Stay Awake", artist:"Milo Grey", album:"Afterglow", duration:"3:47", category:"Energetic", cover:"/covers/10.png" },
  { id:"whispers-in-the-night", title:"Whispers in the night", artist:"Celene James", album:"Soft Focus", duration:"3:42", category:"Relaxing", cover:"/covers/current.png", favorite:true },
  { id:"warmth", title:"Warmth", artist:"Oliver Stone", album:"Soft Focus", duration:"3:28", category:"Romance", cover:"/covers/12.png" }
];
export const playlists = ["Midnight City","Sunday Afternoon","Late Night Drive","Morning Commute","Focus Flow","Rainy Days","Quiet Hours","Weekend Brunch"];
export const categories = ["All","Relax","Sad","Party","Romance","Energetic","Relaxing","Jazz","Alternative"];
export const currentTrack = tracks[10];
