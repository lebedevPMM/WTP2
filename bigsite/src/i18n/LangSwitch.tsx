import { Link } from "react-router-dom";
import { useLang, useAltLangPath, type Lang } from "./lang";

// EN / RU toggle. The active language is inert text; the other is a real <Link> to the same
// route in that language (useAltLangPath preserves path + search + hash). Uses a plain react-router
// Link because the target is already the final localized path — <L> would double-prefix it.

const LABEL: Record<Lang, string> = { en: "EN", ru: "RU" };

export function LangSwitch({ className, style }: { className?: string; style?: React.CSSProperties }) {
  const lang = useLang();
  const alt = useAltLangPath(); // { lang: the OTHER language, path: this route in that language }

  const item = (code: Lang) => {
    const active = code === lang;
    if (active) {
      return (
        <span aria-current="true" style={{ color: "var(--ink)", fontWeight: 700 }}>
          {LABEL[code]}
        </span>
      );
    }
    return (
      <Link
        to={alt.path}
        hrefLang={code}
        aria-label={code === "ru" ? "Русская версия" : "English version"}
        style={{ color: "var(--ink-55)", fontWeight: 500 }}
      >
        {LABEL[code]}
      </Link>
    );
  };

  return (
    <div
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, ...style }}
      aria-label="Language selector"
    >
      {item("en")}
      <span aria-hidden="true" style={{ color: "var(--ink-40, rgba(255,255,255,.28))" }}>/</span>
      {item("ru")}
    </div>
  );
}
