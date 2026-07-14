import { createContext, useContext, useMemo } from "react";
import { Link, useLocation, type LinkProps } from "react-router-dom";

// i18n core. The site is served in two languages via URL prefix: EN at "/", RU at "/ru/*".
// A single LangProvider wraps each subtree (see App.tsx); everything below reads the active
// lang from context. Links are localized by <L> so the RU subtree stays inside /ru.

export type Lang = "en" | "ru";
export const LANGS: Lang[] = ["en", "ru"];
export const DEFAULT_LANG: Lang = "en";

const LangContext = createContext<Lang>(DEFAULT_LANG);

export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
}

export function useLang(): Lang {
  return useContext(LangContext);
}

// True for links we must never prefix (external, in-page, protocol, or already-localized).
function isUnlocalizable(path: string): boolean {
  return (
    !path.startsWith("/") || // http(s), mailto, tel, relative, "#..."
    path.startsWith("//") || // protocol-relative external
    path === "/ru" ||
    path.startsWith("/ru/")
  );
}

// Prefix an internal path with /ru for the RU subtree. EN passes through unchanged.
export function localize(path: string, lang: Lang): string {
  if (lang !== "ru" || isUnlocalizable(path)) return path;
  return path === "/" ? "/ru" : "/ru" + path;
}

// Hook form for imperative callers.
export function useLocalize(): (path: string) => string {
  const lang = useLang();
  return useMemo(() => (path: string) => localize(path, lang), [lang]);
}

// Strip the /ru prefix back to the EN equivalent path.
export function stripLang(pathname: string): string {
  if (pathname === "/ru") return "/";
  if (pathname.startsWith("/ru/")) return pathname.slice(3); // "/ru/x" -> "/x"
  return pathname;
}

// The current location expressed in the other language, preserving search + hash.
// Used by the language switcher.
export function useAltLangPath(): { lang: Lang; path: string } {
  const lang = useLang();
  const { pathname, search, hash } = useLocation();
  const en = stripLang(pathname);
  const other: Lang = lang === "ru" ? "en" : "ru";
  const base = other === "ru" ? localize(en, "ru") : en;
  return { lang: other, path: base + search + hash };
}

// Lang-aware <Link>. Drop-in for react-router's Link: localizes a string `to`, forwards the rest.
export function L({ to, ...rest }: LinkProps) {
  const lang = useLang();
  const localized = typeof to === "string" ? localize(to, lang) : to;
  return <Link to={localized} {...rest} />;
}
