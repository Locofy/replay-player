# Replay

Replay is a responsive music player demo built with Next.js. It uses a curated set of sample tracks and album artwork to demonstrate a complete music browsing and playback interface. Audio playback is simulated; no music files or streaming service are required.

## Features

- Home page with an interactive featured song carousel, category filters, popular tracks, and playlists
- Song library, favorites, album pages, and a dedicated now playing screen
- Playback controls for play/pause, next, previous, shuffle, repeat, seeking, and volume
- Favorites that can be added and removed from the player or song lists
- Settings for playback, appearance, notifications, and account preferences
- Dark, light, and system themes, plus selectable accent colors
- Responsive desktop and mobile layouts, with accessible labels and keyboard focus styles
- Reusable UI components with default placeholder content

## Requirements

- Node.js 20.9 or newer
- npm

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser. To use another port, pass it to Next.js, for example `npm run dev -- --port 3001`.

## Production build

```bash
npm run build
npm start
```

The production server uses port 3000 by default. Set the `PORT` environment variable to change it.

## Routes

| Route | Page |
| --- | --- |
| `/` | Home and featured carousel |
| `/songs` | Song library |
| `/favorites` | Favorite songs |
| `/categories` | Browse music by category |
| `/album/[slug]` | Album details and tracks |
| `/playing/[id]` | Dedicated player for a track |
| `/settings` | Playback, appearance, notifications, and account settings |

## Project structure

```text
app/                 Next.js routes, shared layout, and global styles
components/          Player shell, playback and appearance state, reusable views and UI
lib/music.ts         Sample tracks, categories, playlists, and placeholder defaults
public/covers/       Sample album artwork and profile image
```

## Notes

- Track metadata and artwork are local demo data in `lib/music.ts` and `public/covers/`.
- Playback controls update the demo player state and progress timer; they do not stream audio.
- Appearance preferences are saved in browser storage when available.

## Tech stack

- Next.js App Router
- React 19 and TypeScript
- Lucide React icons
- CSS-based responsive styling
