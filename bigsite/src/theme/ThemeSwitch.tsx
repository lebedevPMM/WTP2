import { useEffect, useState } from "react";

// Site-wide design-direction switcher for the 2026-06-12 design round.
// Sets data-theme on <html>; themes/*.css restyle the whole app via that attribute.
// Activation order: ?theme= param → localStorage → base (current production look).

export const THEMES = [
  { id: "base", label: "Base" },
  { id: "v1", label: "V1 Ledger" },
  { id: "v2", label: "V2 Control" },
  { id: "v3", label: "V3 Midnight" },
  { id: "v4", label: "V4 Daylight" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

const FONT_LINKS: Record<string, string> = {
  v1: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Newsreader:ital,opsz,wght@0,6..72,400..700;1,6..72,400..700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
  v2: "https://fonts.googleapis.com/css2?family=Archivo:ital,wdth,wght@0,62..125,100..900;1,62..125,100..900&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
  v3: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Albert+Sans:ital,wght@0,300..800;1,300..800&display=swap",
  // v4 Daylight = light edition of Midnight Route, same type system
  v4: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Albert+Sans:ital,wght@0,300..800;1,300..800&display=swap",
};

function injectFonts(id: string) {
  const url = FONT_LINKS[id];
  if (!url) return;
  const linkId = `theme-fonts-${id}`;
  if (document.getElementById(linkId)) return;
  const link = document.createElement("link");
  link.id = linkId;
  link.rel = "stylesheet";
  link.href = url;
  document.head.appendChild(link);
}

function initialTheme(): ThemeId {
  const fromUrl = new URLSearchParams(window.location.search).get("theme");
  const known = THEMES.map((t) => t.id) as string[];
  if (fromUrl && known.includes(fromUrl)) return fromUrl as ThemeId;
  const stored = localStorage.getItem("wtp_theme");
  if (stored && known.includes(stored)) return stored as ThemeId;
  return "base";
}

export function applyTheme(id: ThemeId) {
  if (id === "base") delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = id;
  localStorage.setItem("wtp_theme", id);
  injectFonts(id);
  window.dispatchEvent(new CustomEvent("wtp-theme", { detail: id }));
}

export function ThemeSwitch() {
  const [theme, setTheme] = useState<ThemeId>(() => initialTheme());

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return (
    <div
      style={{
        position: "fixed",
        left: 14,
        bottom: 14,
        zIndex: 998,
        display: "flex",
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: "rgba(16,16,19,.86)",
        border: "1px solid rgba(255,255,255,.16)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 30px rgba(0,0,0,.35)",
      }}
    >
      {THEMES.map((t) => (
        <button
          key={t.id}
          onClick={() => setTheme(t.id)}
          style={{
            border: 0,
            cursor: "pointer",
            borderRadius: 999,
            padding: "6px 12px",
            fontSize: 11.5,
            fontWeight: 600,
            letterSpacing: "0.02em",
            fontFamily: "system-ui, sans-serif",
            background: theme === t.id ? "rgba(255,255,255,.92)" : "transparent",
            color: theme === t.id ? "#101013" : "rgba(255,255,255,.75)",
            transition: "background .15s ease, color .15s ease",
          }}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
