import type { Metadata } from "next";
import "./globals.css";
import { PlayerShell } from "@/components/player-shell";
import { PlayerProvider } from "@/components/player-context";
import { AppearanceProvider } from "@/components/appearance-context";
export const metadata: Metadata = { title: "Replay — Music for every mood", description: "Your music, all in one place." };
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) { return <html lang="en"><body><AppearanceProvider><PlayerProvider><PlayerShell>{children}</PlayerShell></PlayerProvider></AppearanceProvider></body></html>; }
