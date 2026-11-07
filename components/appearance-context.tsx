"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type ThemeChoice = "Dark" | "Light" | "System";
type AppearanceValue = {
  theme: ThemeChoice;
  accent: string;
  compact: boolean;
  setCompact: (compact: boolean) => void;
  setTheme: (theme: ThemeChoice) => void;
  setAccent: (accent: string) => void;
};

const AppearanceContext = createContext<AppearanceValue | null>(null);
const STORAGE_KEY = "replay-appearance";
const DEFAULT_ACCENT = "#fd8d47";
const isThemeChoice = (value: unknown): value is ThemeChoice => value === "Dark" || value === "Light" || value === "System";
function relativeLuminance(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)?.map(value => parseInt(value, 16) / 255) ?? [0, 0, 0];
  const linear = channels.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return linear[0] * 0.2126 + linear[1] * 0.7152 + linear[2] * 0.0722;
}
function readableAccent(hex: string) {
  const channels = hex.slice(1).match(/.{2}/g)?.map(value => parseInt(value, 16)) ?? [0, 0, 0];
  for (let amount = 0; amount <= 1; amount += 0.01) {
    const candidate = channels.map(value => Math.round(value * (1 - amount))).map(value => value / 255);
    const luminance = candidate.map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4).reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
    if ((1.05 / (luminance + 0.05)) >= 4.5) return `#${channels.map(value => Math.round(value * (1 - amount)).toString(16).padStart(2, "0")).join("")}`;
  }
  return "#111111";
}

export function AppearanceProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeChoice>("Dark");
  const [accent, setAccentState] = useState(DEFAULT_ACCENT);
  const [compact, setCompactState] = useState(false);
  const [preferencesReady, setPreferencesReady] = useState(false);

  useEffect(() => {
    try {
      let saved: string | null = null;
      try { saved = window.localStorage?.getItem(STORAGE_KEY) ?? null; } catch { /* Try the cookie fallback below. */ }
      if (!saved) {
        const cookie = document.cookie.split("; ").find(item => item.startsWith(`${STORAGE_KEY}=`))?.slice(STORAGE_KEY.length + 1);
        saved = cookie ? decodeURIComponent(cookie) : null;
      }
      if (saved) {
        const value: unknown = JSON.parse(saved);
        if (value && typeof value === "object") {
          const prefs = value as { theme?: unknown; accent?: unknown; compact?: unknown };
          if (isThemeChoice(prefs.theme)) setThemeState(prefs.theme);
          if (typeof prefs.accent === "string" && /^#[\da-f]{6}$/i.test(prefs.accent)) setAccentState(prefs.accent);
          if (typeof prefs.compact === "boolean") setCompactState(prefs.compact);
        }
      }
    } catch {
      // Keep the defaults if saved preferences are unavailable.
    } finally {
      setPreferencesReady(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.compact = String(compact);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--orange", accent);
    root.style.setProperty("--accent-contrast", relativeLuminance(accent) > 0.179 ? "#17191c" : "#ffffff");
    root.style.setProperty("--accent-readable", readableAccent(accent));
    const media = window.matchMedia("(prefers-color-scheme: light)");
    const applyTheme = () => {
      const useLight = theme === "Light" || (theme === "System" && media.matches);
      root.dataset.theme = useLight ? "light" : "dark";
    };
    applyTheme();
    if (theme === "System") media.addEventListener("change", applyTheme);
    return () => media.removeEventListener("change", applyTheme);
  }, [theme, accent, compact]);

  useEffect(() => {
    if (!preferencesReady) return;
    const serialized = JSON.stringify({ theme, accent, compact });
    try { document.cookie = `${STORAGE_KEY}=${encodeURIComponent(serialized)}; max-age=31536000; path=/; samesite=lax`; } catch { /* Keep the current session if cookies are unavailable. */ }
    try {
      window.localStorage?.setItem(STORAGE_KEY, serialized);
    } catch {
      // Preferences still work for this session if storage is unavailable.
    }
  }, [theme, accent, compact, preferencesReady]);

  const setTheme = useCallback((value: ThemeChoice) => setThemeState(value), []);
  const setAccent = useCallback((value: string) => setAccentState(value), []);
  const setCompact = useCallback((value: boolean) => setCompactState(value), []);
  const value = useMemo(() => ({ theme, accent, compact, setTheme, setAccent, setCompact }), [theme, accent, compact, setTheme, setAccent, setCompact]);
  return <AppearanceContext.Provider value={value}>{children}</AppearanceContext.Provider>;
}

export function useAppearance() {
  const value = useContext(AppearanceContext);
  if (!value) throw new Error("useAppearance must be used within AppearanceProvider");
  return value;
}
