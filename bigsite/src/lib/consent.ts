// Cookie-consent state — the single gate in front of every tracker (see analytics.ts).
//
// Categories:
//   necessary — always granted, never asked (navigation, security, form state)
//   analytics — Google Analytics 4; loads only after explicit opt-in
//   marketing — Meta Pixel; loads only after explicit opt-in
//
// The decision persists in localStorage. `getConsent() === null` = no decision yet:
// the banner should show and nothing optional may load.

export type ConsentCategory = "necessary" | "analytics" | "marketing";

export interface ConsentState {
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of the decision — lets us re-prompt if the policy ever changes. */
  decidedAt: string;
}

const CONSENT_KEY = "wtp-consent-v1";

type Listener = (state: ConsentState) => void;
const listeners = new Set<Listener>();

/** The stored decision, or null if the visitor hasn't decided yet. */
export function getConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentState>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { analytics: parsed.analytics, marketing: parsed.marketing, decidedAt: parsed.decidedAt || "" };
  } catch {
    // localStorage unavailable (some private-browsing modes) → treat as undecided
    return null;
  }
}

export function isConsentDecided(): boolean {
  return getConsent() !== null;
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "necessary") return true;
  const c = getConsent();
  return c ? c[category] : false;
}

/** Persist a decision and notify subscribers (analytics.ts reacts by loading/staying off). */
export function setConsent(choice: { analytics: boolean; marketing: boolean }): void {
  const state: ConsentState = { ...choice, decidedAt: new Date().toISOString() };
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable — the in-memory broadcast below still applies for this session
  }
  listeners.forEach((l) => l(state));
}

/** Forget the decision (the banner will show again on next visit). */
export function resetConsent(): void {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // ignore
  }
}

/** Subscribe to consent changes. Returns an unsubscribe function. */
export function onConsentChange(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
