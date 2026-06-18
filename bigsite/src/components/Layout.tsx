import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MegaNav } from "./MegaNav";
import { Footer } from "./Footer";
import { ThemeSwitch } from "../theme/ThemeSwitch";
import { ThemeFX } from "../theme/fx/ThemeFX";
import ContourBackground from "./ContourBackground";

export function Layout() {
  const loc = useLocation();
  const isHome = loc.pathname === "/";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loc.pathname]);

  return (
    <>
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          left: "-9999px",
          top: 8,
          zIndex: 1000,
          background: "var(--gold, #c9a24b)",
          color: "#101013",
          padding: "8px 14px",
          borderRadius: 8,
          fontWeight: 600,
          fontSize: 14,
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = "8px";
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = "-9999px";
        }}
      >
        Skip to content
      </a>
      <ContourBackground />
      {/* Dev-only design-direction switcher. Gated out of prod: data-theme is the
          single source of theme (themed() + ThemeFX read it; only applyTheme inside
          ThemeSwitch sets it). With no switcher in prod it's never set, so ?theme=
          links and pinned localStorage stay inert and base is the sole public face. */}
      {import.meta.env.DEV && <ThemeSwitch />}
      <ThemeFX />
      <MegaNav transparent={isHome} />
      <main id="main-content" tabIndex={-1} style={{ minHeight: "60vh", paddingTop: isHome ? 0 : 66, outline: "none" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
