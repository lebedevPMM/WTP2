// Consent-gated analytics — GA4 + Meta Pixel loaders and the event API.
//
// Nothing here touches the network until the visitor opts in via the consent
// banner (GDPR/PDPL): the tracker <script> tags are injected dynamically and
// only after the matching consent category is granted. Without consent — or
// while the IDs below are empty — every track* call is a silent no-op.
//
// Events:
//   page_view    — SPA route changes (Layout → useLocation)     [GA4 + Pixel PageView]
//   lead_submit  — successful pre-screen form submit (Contact)  [GA4 + Pixel Lead]
//   pdf_download — clicks on .pdf/.zip links (global delegate)  [GA4]
//   cta_click    — PreScreenCTABlock button                     [GA4]

import { hasConsent, onConsentChange } from "./consent";

// GA4 Measurement ID — вписать G-XXXXXXXXXX, когда создана GA4-property.
// Пустая строка = GA4 никогда не грузится, все события — no-op.
export const GA4_ID = "";

// Meta Pixel ID — вписать числовой Pixel ID из Meta Events Manager.
// Пустая строка = Pixel никогда не грузится.
export const META_PIXEL_ID = "";

/**
 * True when at least one tracker ID is filled in. While false the site sets no
 * optional cookies at all, so the consent banner (and the footer "Cookie
 * settings" button) stays hidden — there is nothing to consent to.
 */
export const TRACKERS_CONFIGURED = Boolean(GA4_ID || META_PIXEL_ID);

type FbqFn = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[][];
  loaded?: boolean;
  version?: string;
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    fbq?: FbqFn;
    _fbq?: FbqFn;
  }
}

let ga4Initialized = false;
let pixelInitialized = false;

/** Dynamically load GA4 — called only once consent.analytics is granted. */
function initGA4(): void {
  if (!GA4_ID || ga4Initialized || typeof window === "undefined") return;
  if (!hasConsent("analytics")) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
  document.head.appendChild(script);

  // Exact Google-recommended dataLayer pattern: gtag.js parses queued entries
  // as Arguments objects, not plain arrays. send_page_view:false — SPA page
  // views are owned by trackPageView() so the landing page isn't double-counted.
  const inline = document.createElement("script");
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA4_ID}', { send_page_view: false });
  `;
  document.head.appendChild(inline);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };

  ga4Initialized = true;
}

/** Dynamically load the Meta Pixel — called only once consent.marketing is granted. */
function initMetaPixel(): void {
  if (!META_PIXEL_ID || pixelInitialized || typeof window === "undefined") return;
  if (!hasConsent("marketing")) return;

  if (!window.fbq) {
    // Standard fbevents stub: queue calls until the script arrives.
    const fbq: FbqFn = function (...args: unknown[]) {
      if (fbq.callMethod) fbq.callMethod(...args);
      else fbq.queue!.push(args);
    };
    fbq.queue = [];
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    document.head.appendChild(script);
  }

  // PageView is NOT sent here — trackPageView() below owns it, so the first
  // page isn't double-counted when init and the route effect run together.
  window.fbq("init", META_PIXEL_ID);

  pixelInitialized = true;
}

/** Remove tracker cookies when the visitor rejects (or downgrades) consent. */
export function removeTrackerCookies(): void {
  if (typeof document === "undefined") return;
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.split("=")[0].trim();
    if (name.startsWith("_ga") || name.startsWith("_gid") || name.startsWith("_fb")) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.${window.location.hostname}`;
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    }
  }
}

/** True if any tracker actually loaded this session (used to decide a reload on downgrade). */
export function trackersLoaded(): boolean {
  return ga4Initialized || pixelInitialized;
}

function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && window.gtag) window.gtag(...args);
}

function fbq(...args: unknown[]): void {
  if (typeof window !== "undefined" && window.fbq && pixelInitialized) window.fbq(...args);
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

let lastPageViewKey = "";

/** Track an SPA page view (GA4 page_view + Pixel PageView). */
export function trackPageView(path: string, title?: string): void {
  if (!ga4Initialized && !pixelInitialized) return; // nothing loaded → pure no-op
  if (path === lastPageViewKey) return; // guards StrictMode double-effects / init overlap
  lastPageViewKey = path;
  gtag("event", "page_view", { page_path: path, page_title: title || document.title });
  fbq("track", "PageView");
}

/** Track a successful lead-form submit (GA4 lead_submit + Pixel Lead). */
export function trackLeadSubmit(formName: string): void {
  gtag("event", "lead_submit", { form_name: formName });
  fbq("track", "Lead");
}

/** Track a document download (.pdf/.zip). */
export function trackPdfDownload(documentName: string): void {
  gtag("event", "pdf_download", { document_name: documentName });
}

/** Track a CTA click. */
export function trackCtaClick(ctaName: string, location: string): void {
  gtag("event", "cta_click", { cta_name: ctaName, cta_location: location });
}

// ---------------------------------------------------------------------------
// Bootstrap
// ---------------------------------------------------------------------------

function onDocumentClick(e: MouseEvent): void {
  const target = e.target as Element | null;
  const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
  if (!link) return;
  const href = link.getAttribute("href") || "";
  if (!/\.(pdf|zip)(?:[?#]|$)/i.test(href)) return;
  const name = href.split(/[?#]/)[0].split("/").pop() || href;
  trackPdfDownload(name);
}

let bootstrapped = false;

/**
 * Idempotent bootstrap, mounted once from Layout:
 *  - loads any tracker whose consent is already stored (returning visitors);
 *  - subscribes to consent changes so accepting in the banner loads trackers
 *    immediately, without a page reload;
 *  - installs the global .pdf/.zip download-click delegate.
 */
export function initAnalytics(): void {
  if (bootstrapped || typeof window === "undefined") return;
  bootstrapped = true;

  const start = () => {
    const wasLoaded = trackersLoaded();
    initGA4();
    initMetaPixel();
    if (!wasLoaded && trackersLoaded()) {
      // A tracker just came online (stored consent or a fresh "Accept all"):
      // record the page the visitor is currently on.
      trackPageView(window.location.pathname + window.location.search);
    }
  };

  start();
  onConsentChange(start);

  // capture phase → fires even when an inner handler stops propagation
  document.addEventListener("click", onDocumentClick, true);
}
