import { useEffect, useState } from "react";
import { L as Link } from "../i18n/lang";
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

  useEffect(() => {
    if (!TRACKERS_CONFIGURED) return;
    if (!isConsentDecided()) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

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
    <div className="consent-banner" role="region" aria-label="Cookie consent">
      <p className="consent-text">
        We use necessary cookies to make this site work. With your consent, we also use analytics
        (Google&nbsp;Analytics) and marketing (Meta&nbsp;Pixel) cookies — nothing loads until you choose.
      </p>
      <div className="consent-actions">
        <button type="button" className="btn consent-btn" onClick={() => decide(true)}>
          Accept all
        </button>
        <button type="button" className="btn btn-ghost consent-btn" onClick={() => decide(false)}>
          Necessary only
        </button>
        <Link to="/legal/cookies" className="consent-link">
          Cookie policy
        </Link>
      </div>
    </div>
  );
}
