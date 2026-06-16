import { lazy, Suspense, useEffect, useState } from "react";

// Per-theme experience layer (motion/FX), mounted in Layout inside the Router.
// Each theme's FX module is lazy-loaded only when that theme activates.
// FX modules are runtime ANNOTATORS: they select existing DOM, add classes /
// wrap spans / mount overlays; all visual effect lives in themes/vN.css under
// html[data-theme="vN"], so leftover annotations are inert in other themes.

const V1FX = lazy(() => import("./v1"));
const V2FX = lazy(() => import("./v2"));
const V3FX = lazy(() => import("./v3"));
const V4FX = lazy(() => import("./v4"));

function currentTheme(): string {
  return document.documentElement.dataset.theme ?? "base";
}

export function ThemeFX() {
  const [theme, setTheme] = useState<string>(() => currentTheme());

  useEffect(() => {
    const onTheme = (e: Event) => setTheme((e as CustomEvent<string>).detail ?? "base");
    window.addEventListener("wtp-theme", onTheme);
    // ThemeSwitch's effect (applyTheme + dispatch) runs before this listener
    // exists (sibling effect order) — re-read the attribute to catch up.
    setTheme(currentTheme());
    return () => window.removeEventListener("wtp-theme", onTheme);
  }, []);

  return (
    <Suspense fallback={null}>
      {theme === "v1" && <V1FX />}
      {theme === "v2" && <V2FX />}
      {theme === "v3" && <V3FX />}
      {theme === "v4" && <V4FX />}
    </Suspense>
  );
}
