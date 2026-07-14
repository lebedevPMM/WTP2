import { useEffect, useState } from "react";
import { L as Link, useLang } from "../i18n/lang";
import { isConsentDecided, setConsent } from "../lib/consent";
import { TRACKERS_CONFIGURED, removeTrackerCookies, trackersLoaded } from "../lib/analytics";

const OPEN_EVENT = "wtp:consent-open";

/** Reopen the banner (footer "Cookie settings"). No-op while no trackers are configured. */
export function openConsentSettings(): void {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

// Non-blocking bottom bar (not a modal): appears only when a tracker ID is
// configured AND the visitor hasn't decided yet. Styles live in index.css
// (.consent-banner) — the slide-up is gated behind prefers-reduced-motion.
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const lang = useLang();

  useEffect(() => {
    if (!TRACKERS_CONFIGURED) return;
    if (!isConsentDecided()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  const t =
    lang === "ru"
      ? {
          ariaLabel: "Согласие на использование cookie",
          // ВЫЧИТКА ОЛЕ: legally-operative cookie-consent disclosure (GDPR / ePrivacy)
          text:
            "Мы используем необходимые файлы cookie для работы сайта. С вашего согласия мы также используем аналитические (Google Analytics) и маркетинговые (Meta Pixel) файлы cookie — ничего не загружается, пока вы не сделаете выбор.",
          acceptAll: "Принять все",
          necessaryOnly: "Только необходимые",
          cookiePolicy: "Политика cookie",
        }
      : {
          ariaLabel: "Cookie consent",
          // ВЫЧИТКА ОЛЕ: legally-operative cookie-consent disclosure (GDPR / ePrivacy)
          text:
            "We use necessary cookies to make this site work. With your consent, we also use analytics (Google Analytics) and marketing (Meta Pixel) cookies — nothing loads until you choose.",
          acceptAll: "Accept all",
          necessaryOnly: "Necessary only",
          cookiePolicy: "Cookie policy",
        };

  if (!open) return null;

  function decide(accepted: boolean) {
    setConsent({ analytics: accepted, marketing: accepted });
    if (!accepted) {
      removeTrackerCookies();
      // Downgrading after a tracker already loaded this session: a reload is
      // the only honest way to actually stop it.
      if (trackersLoaded()) window.location.reload();
    }
    setOpen(false);
  }

  return (
    <div className="consent-banner" role="region" aria-label={t.ariaLabel}>
      <p className="consent-text">{t.text}</p>
      <div className="consent-actions">
        <button type="button" className="btn consent-btn" onClick={() => decide(true)}>
          {t.acceptAll}
        </button>
        <button type="button" className="btn btn-ghost consent-btn" onClick={() => decide(false)}>
          {t.necessaryOnly}
        </button>
        <Link to="/legal/cookies" className="consent-link">
          {t.cookiePolicy}
        </Link>
      </div>
    </div>
  );
}
