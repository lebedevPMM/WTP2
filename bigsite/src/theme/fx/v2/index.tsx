/* ============================================================================
   V2 "THE CONTROL ROOM" — site-wide FX layer (runtime annotator).

   Mounted by ThemeFX only while html[data-theme="v2"] is active, inside the
   router (useLocation available). It SELECTS existing DOM, annotates it
   (data flags, `--v2fx-d` stagger delays, heading line wraps, counter spans)
   and mounts its own overlay chrome (telemetry HUD bottom-right + page frame
   rails + stepper connector strip). All visuals live in themes/v2.css under
   html[data-theme="v2"] — class/attr annotations are inert in other themes;
   STRUCTURAL changes (line wraps, counter spans, injected strip) are reverted
   on unmount via the undo registry.

   Techniques (award-validated set, 2026-06-12):
   1. registration ticks that draw on enter (cards + section frame corners)
   2. padded mono telemetry counters (statbar; the 0% tax stat counts DOWN 45→0)
   3. telemetry HUD — IDX nn / nn · scroll % · live GST clock
   4. status-dot chips (CSS only — eyebrow pulse, footer STATUS line)
   5. mechanical heading line reveals (offsetTop line grouping, clip wraps)
   6. drawn connector line in the stepper (RouteDiagram grammar, mini-scale)
   7. grid boot — frame rails sweep once per route
   8. caps-decode — one eyebrow per viewport entry, 420ms, session-once

   Hard rules honoured:
   - annotate after fonts (Archivo + IBM Plex Mono) ready + double rAF;
   - re-run per route (useLocation); data flags guard against double surgery;
   - NEVER touches `.hero-stage` (React mutates it per frame) or the MegaNav;
   - one shared reveal IO (rootMargin -8% / -10%), class set once + unobserve;
   - mobile ≤900px: light fades only (no counters / decode / strip / HUD);
   - prefers-reduced-motion: static baseline (CSS gates + live matchMedia);
   - full cleanup on unmount (observers, rAF loops, intervals, overlay nodes).
   ============================================================================ */

import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const DECODE_CHARSET = "ABCDEF0123456789▮";
const COUNT_MS = 900;
const DECODE_MS = 420;

/** Mechanical ease ≈ cubic-bezier(0.65, 0, 0.35, 1). */
const easeInOutCubic = (t: number): number =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

interface CounterRec {
  raw: string;
  from: number;
  final: number;
  width: number;
  pad: HTMLElement;
  num: HTMLElement;
  started: boolean;
  raf: number;
}

interface DecodeRec {
  el: HTMLElement;
  final: string;
  raf: number;
}

type Tok = { text: string; g: boolean };

function mk(tag: string, cls: string, text = ""): HTMLElement {
  const el = document.createElement(tag);
  el.className = cls;
  if (text) el.textContent = text;
  return el;
}

class V2FxEngine {
  private destroyed = false;
  private routeToken = 0;

  private readonly reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  private readonly mobile = window.matchMedia("(max-width: 900px)");
  private readonly hudWide = window.matchMedia("(min-width: 1100px)");

  private revealIO: IntersectionObserver | null = null;
  private counterIO: IntersectionObserver | null = null;
  private midIO: IntersectionObserver | null = null;

  private readonly undos = new Map<Element, Array<() => void>>();
  private readonly counters = new Map<HTMLElement, CounterRec>();
  private decode: DecodeRec | null = null;

  /* HUD */
  private hud: HTMLElement | null = null;
  private hudIdxP: HTMLElement | null = null;
  private hudIdxV: HTMLElement | null = null;
  private hudTotP: HTMLElement | null = null;
  private hudTotV: HTMLElement | null = null;
  private hudPctP: HTMLElement | null = null;
  private hudPctV: HTMLElement | null = null;
  private hudClock: HTMLElement | null = null;
  private rails: HTMLElement | null = null;

  private clockId = 0;
  private clockFmt: Intl.DateTimeFormat | null = null;
  private scrollRaf = 0;
  private lastPct = -1;
  private currentIdx = 0;
  private sectionTotal = 0;

  constructor() {
    try {
      this.buildObservers();
      this.buildOverlays();
      this.startClock();
      window.addEventListener("scroll", this.onScroll, { passive: true });
      window.addEventListener("resize", this.onScroll);
      document.addEventListener("visibilitychange", this.onVisibility);
    } catch {
      /* overlay chrome is optional — annotation may still run */
    }
  }

  /* ------------------------------------------------------------ observers */

  private buildObservers() {
    if (typeof IntersectionObserver === "undefined") return;

    // One shared reveal observer: `v2fx-in` toggled once, then unobserved.
    this.revealIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.classList.add("v2fx-in");
          this.revealIO?.unobserve(el);
          if (el.dataset.v2fxS) this.maybeDecode(el);
        }
      },
      { rootMargin: "-8% 0px -10% 0px", threshold: 0 }
    );

    // Counters fire once at 50% visibility.
    this.counterIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          this.counterIO?.unobserve(el);
          this.startCount(el);
        }
      },
      { threshold: 0.5 }
    );

    // Narrow band around the viewport middle → current module index for HUD.
    this.midIO = new IntersectionObserver(
      (entries) => {
        let next: number | null = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const idx = Number((e.target as HTMLElement).dataset.v2fxS ?? 0);
          if (idx > 0) next = idx;
        }
        if (next !== null && next !== this.currentIdx) {
          this.currentIdx = next;
          this.renderHudIdx();
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
  }

  /* ------------------------------------------------------- overlay chrome */

  private buildOverlays() {
    // Telemetry HUD — IDX 03 / 08 · 047% · 18:42:07 GST (desktop ≥1100 only,
    // hidden via CSS; aria-hidden; pointer-safe; z below ThemeSwitch).
    const hud = mk("div", "v2fx-hud");
    hud.setAttribute("aria-hidden", "true");

    const g1 = mk("span", "v2fx-hud-g");
    this.hudIdxP = mk("span", "v2fx-hud-p", "0");
    this.hudIdxV = mk("span", "v2fx-hud-b", "0");
    this.hudTotP = mk("span", "v2fx-hud-p", "0");
    this.hudTotV = mk("span", "v2fx-hud-b", "0");
    g1.append(
      mk("span", "v2fx-hud-l", "IDX "),
      this.hudIdxP,
      this.hudIdxV,
      mk("span", "v2fx-hud-l", " / "),
      this.hudTotP,
      this.hudTotV
    );

    const g2 = mk("span", "v2fx-hud-g");
    this.hudPctP = mk("span", "v2fx-hud-p", "00");
    this.hudPctV = mk("span", "v2fx-hud-b", "0");
    g2.append(this.hudPctP, this.hudPctV, mk("span", "v2fx-hud-l", "%"));

    const g3 = mk("span", "v2fx-hud-g");
    this.hudClock = mk("span", "v2fx-hud-b", "--:--:--");
    g3.append(this.hudClock, mk("span", "v2fx-hud-l", " GST"));

    hud.append(g1, mk("span", "v2fx-hud-s", "·"), g2, mk("span", "v2fx-hud-s", "·"), g3);
    document.body.appendChild(hud);
    this.hud = hud;

    // Page frame rails (concept DNA: two vertical hairlines at the wrap edge),
    // swept in once per route via the `v2fx-boot` class.
    const rails = mk("span", "v2fx-rails");
    rails.setAttribute("aria-hidden", "true");
    rails.append(mk("i", "v2fx-rail v2fx-rail-l"), mk("i", "v2fx-rail v2fx-rail-r"));
    document.body.appendChild(rails);
    this.rails = rails;
  }

  /* ----------------------------------------------------------- HUD engine */

  private renderPad(padEl: HTMLElement | null, valEl: HTMLElement | null, v: number, width: number) {
    if (!padEl || !valEl) return;
    const s = String(v).padStart(width, "0");
    const cut = Math.max(0, s.length - String(v).length);
    padEl.textContent = s.slice(0, cut);
    valEl.textContent = s.slice(cut);
  }

  private renderHudIdx() {
    this.renderPad(this.hudIdxP, this.hudIdxV, this.currentIdx, 2);
    this.renderPad(this.hudTotP, this.hudTotV, this.sectionTotal, 2);
  }

  private onScroll = () => {
    if (this.scrollRaf || this.destroyed || !this.hud || !this.hudWide.matches) return;
    this.scrollRaf = requestAnimationFrame(() => {
      this.scrollRaf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? Math.min(100, Math.max(0, Math.round((window.scrollY / max) * 100))) : 0;
      if (pct !== this.lastPct) {
        this.lastPct = pct;
        this.renderPad(this.hudPctP, this.hudPctV, pct, 3);
      }
    });
  };

  private startClock() {
    this.stopClock();
    if (!this.clockFmt) {
      try {
        this.clockFmt = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Dubai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
      } catch {
        return;
      }
    }
    const tick = () => {
      if (this.hudClock && this.clockFmt) this.hudClock.textContent = this.clockFmt.format(new Date());
    };
    tick();
    this.clockId = window.setInterval(tick, 1000);
  }

  private stopClock() {
    if (this.clockId) {
      window.clearInterval(this.clockId);
      this.clockId = 0;
    }
  }

  private onVisibility = () => {
    // HUD pauses while the tab is hidden (rAF loops self-pause).
    if (document.hidden) this.stopClock();
    else if (!this.destroyed) this.startClock();
  };

  /* -------------------------------------------------------- route lifecycle */

  async routeEnter() {
    const token = ++this.routeToken;

    // Fonts first — heading line measurement depends on final metrics.
    try {
      const fonts = document.fonts;
      if (fonts && typeof fonts.load === "function") {
        await Promise.race([
          Promise.all([fonts.load('880 16px "Archivo"'), fonts.load('500 11px "IBM Plex Mono"')]).then(
            () => fonts.ready
          ),
          new Promise((r) => window.setTimeout(r, 2500)),
        ]);
      }
    } catch {
      /* annotate with current metrics */
    }
    if (this.destroyed || token !== this.routeToken) return;

    // Double rAF: let the route's DOM settle and paint once.
    await new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r())));
    if (this.destroyed || token !== this.routeToken) return;

    try {
      this.annotate();
    } catch {
      /* never let FX take the page down */
    }
    this.bootRails();
  }

  /* -------------------------------------------------------------- annotate */

  private annotate() {
    // Re-registration pass: idempotent per element via data flags. Observers
    // are reset so a re-run (route change / theme round-trip) starts clean.
    this.revealIO?.disconnect();
    this.midIO?.disconnect();
    this.counterIO?.disconnect();
    for (const el of Array.from(this.undos.keys())) if (!el.isConnected) this.undos.delete(el);
    for (const el of Array.from(this.counters.keys())) if (!el.isConnected) this.counters.delete(el);

    const mobile = this.mobile.matches;
    const reduced = this.reduced.matches;

    /* 1 · sections — module chrome: frame ticks, HUD index, decode trigger */
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main section.section")).filter(
      (s) => !s.closest(".hero-stage")
    );
    this.sectionTotal = sections.length;
    this.currentIdx = 0;
    sections.forEach((sec, i) => {
      try {
        sec.dataset.v2fxS = String(i + 1);
        this.midIO?.observe(sec);
        if (!sec.classList.contains("v2fx-in")) this.revealIO?.observe(sec);
      } catch {
        /* skip section */
      }
    });
    const first = sections[0];
    if (first && first.getBoundingClientRect().top < window.innerHeight * 0.5) this.currentIdx = 1;
    this.renderHudIdx();
    this.lastPct = -1;
    this.onScroll();

    /* 2 · headings — mechanical line reveals (desktop) / light fade (mobile) */
    for (const sec of sections) {
      const heads: HTMLElement[] = [];
      if (sec.classList.contains("page-hero")) {
        const h1 = sec.querySelector<HTMLElement>("h1");
        if (h1) heads.push(h1);
      }
      sec.querySelectorAll<HTMLElement>("h2").forEach((h) => {
        if (!h.closest(".prose") && !h.closest(".card") && !h.closest(".hero-stage")) heads.push(h);
      });
      for (const h of heads) {
        try {
          if (h.dataset.v2fxH) {
            // theme round-trip: re-attach the observer to not-yet-revealed
            // headings (both split and fallback-fade variants)
            if (
              !h.classList.contains("v2fx-in") &&
              (h.classList.contains("v2fx-h") || h.hasAttribute("data-v2fx-r"))
            )
              this.revealIO?.observe(h);
            continue;
          }
          h.dataset.v2fxH = "1";
          if (!mobile && this.splitHeading(h)) {
            this.revealIO?.observe(h);
          } else {
            // fallback: plain fade reveal
            h.setAttribute("data-v2fx-r", "");
            this.revealIO?.observe(h);
          }
        } catch {
          /* leave heading untouched */
        }
      }
    }

    /* 3 · reveal items — cards, statbar, prescreen panel (stagger per group) */
    const items = Array.from(
      document.querySelectorAll<HTMLElement>("main .section .card, main .section .statbar, main .prescreen-panel")
    ).filter((el) => !el.closest(".hero-stage"));
    const groups = new Map<Element, number>();
    for (const el of items) {
      try {
        if (el.hasAttribute("data-v2fx-r")) {
          if (!el.classList.contains("v2fx-in")) this.revealIO?.observe(el);
          continue;
        }
        const parent = el.parentElement ?? document.body;
        const n = groups.get(parent) ?? 0;
        groups.set(parent, n + 1);
        el.setAttribute("data-v2fx-r", "");
        if (n > 0) el.style.setProperty("--v2fx-d", `${Math.min(n, 7) * 0.06}s`);
        this.revealIO?.observe(el);
      } catch {
        /* skip item */
      }
    }

    /* 4 · padded mono counters — statbar figures (desktop only) */
    if (!mobile) {
      document.querySelectorAll<HTMLElement>("main .statbar .g").forEach((el) => {
        try {
          this.prepCounter(el, reduced);
        } catch {
          /* leave value as authored */
        }
      });
    }

    /* 5 · stepper — drawn connector line + sequential station fills */
    document.querySelectorAll<HTMLElement>("main .stepper").forEach((st) => {
      try {
        if (st.closest(".hero-stage")) return;
        if (!st.dataset.v2fxSt) {
          st.dataset.v2fxSt = "1";
          if (!mobile) this.injectStepline(st);
        }
        if (!st.classList.contains("v2fx-in")) this.revealIO?.observe(st);
      } catch {
        /* skip stepper */
      }
    });
  }

  /* --------------------------------------------- 5 · stepper connector strip */

  private injectStepline(st: HTMLElement) {
    // Injected as <span> on purpose: themes/v2.css targets `.stepper > div`
    // with !important plates — a span dodges those rules entirely.
    const strip = document.createElement("span");
    strip.className = "v2fx-stepline";
    strip.setAttribute("aria-hidden", "true");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 100 8");
    svg.setAttribute("preserveAspectRatio", "none");
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "0");
    line.setAttribute("y1", "4");
    line.setAttribute("x2", "100");
    line.setAttribute("y2", "4");
    line.setAttribute("pathLength", "100");
    line.setAttribute("vector-effect", "non-scaling-stroke");
    svg.appendChild(line);
    strip.appendChild(svg);
    for (let i = 0; i < 4; i++) {
      const station = document.createElement("i");
      station.appendChild(document.createElement("b"));
      strip.appendChild(station);
    }
    st.appendChild(strip);
    this.addUndo(st, () => {
      strip.remove();
      delete st.dataset.v2fxSt;
      st.classList.remove("v2fx-in");
    });
  }

  /* -------------------------------------------------- 2 · heading line split */

  private splitHeading(el: HTMLElement): boolean {
    // Only headings made of text + simple inline emphasis are split.
    const nodes = Array.from(el.querySelectorAll("*"));
    const simple = nodes.every((n) => ["SPAN", "B", "STRONG", "EM", "BR"].includes(n.tagName));
    if (!simple) return false;

    const original = el.innerHTML;
    const label = (el.textContent ?? "").replace(/\s+/g, " ").trim();
    if (!label) return false;

    // Tokenize words, remembering `.g` (amber emphasis) ancestry.
    const toks: Tok[] = [];
    const walk = (node: Node, g: boolean) => {
      if (node.nodeType === Node.TEXT_NODE) {
        for (const w of (node.textContent ?? "").split(/\s+/)) if (w) toks.push({ text: w, g });
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const e = node as HTMLElement;
        if (e.tagName === "BR") return;
        const inG = g || e.classList.contains("g");
        e.childNodes.forEach((c) => walk(c, inG));
      }
    };
    el.childNodes.forEach((c) => walk(c, false));
    if (toks.length === 0 || toks.length > 40) return false;

    // Phase 1: word probes → measure line groups by offsetTop.
    el.innerHTML = "";
    const probes: { probe: HTMLElement; tok: Tok }[] = [];
    toks.forEach((tok, i) => {
      const w = document.createElement("span");
      w.className = tok.g ? "v2fx-w g" : "v2fx-w";
      w.textContent = tok.text;
      el.appendChild(w);
      if (i < toks.length - 1) el.appendChild(document.createTextNode(" "));
      probes.push({ probe: w, tok });
    });

    const lines: Tok[][] = [];
    let line: Tok[] = [];
    let lastTop: number | null = null;
    for (const { probe, tok } of probes) {
      const top = probe.offsetTop;
      if (lastTop !== null && Math.abs(top - lastTop) > 3) {
        lines.push(line);
        line = [];
      }
      line.push(tok);
      lastTop = top;
    }
    if (line.length) lines.push(line);

    // Phase 2: rebuild as clipped line wraps; `.g` runs re-wrapped per line.
    el.innerHTML = "";
    lines.forEach((lineToks, li) => {
      const lineEl = document.createElement("span");
      lineEl.className = "v2fx-line";
      lineEl.setAttribute("aria-hidden", "true");
      const inner = document.createElement("span");
      inner.className = "v2fx-line-in";
      if (li > 0) inner.style.setProperty("--v2fx-d", `${li * 0.04}s`);
      let i = 0;
      while (i < lineToks.length) {
        const g = lineToks[i].g;
        const words: string[] = [];
        let j = i;
        while (j < lineToks.length && lineToks[j].g === g) {
          words.push(lineToks[j].text);
          j++;
        }
        const run = words.join(" ");
        if (g) {
          const gs = document.createElement("span");
          gs.className = "g";
          gs.textContent = run;
          inner.appendChild(gs);
        } else {
          inner.appendChild(document.createTextNode(run));
        }
        if (j < lineToks.length) inner.appendChild(document.createTextNode(" "));
        i = j;
      }
      lineEl.appendChild(inner);
      el.appendChild(lineEl);
    });

    el.setAttribute("aria-label", label);
    el.classList.add("v2fx-h");
    this.addUndo(el, () => {
      el.innerHTML = original;
      el.removeAttribute("aria-label");
      el.classList.remove("v2fx-h", "v2fx-in");
      delete el.dataset.v2fxH;
    });
    return true;
  }

  /* ------------------------------------------------- 4 · telemetry counters */

  private prepCounter(el: HTMLElement, reduced: boolean) {
    if (el.dataset.v2fxCt) return;
    const raw = el.textContent ?? "";
    const m = raw.match(/\d+/);
    if (!m || m.index === undefined) return;
    const final = parseInt(m[0], 10);
    if (!Number.isFinite(final)) return;

    el.dataset.v2fxCt = "1";
    const prefix = raw.slice(0, m.index);
    const suffix = raw.slice(m.index + m[0].length);
    // Concept DNA: the 0% tax stat counts DOWN 45→0. Everything else 0→N.
    const from = final === 0 ? 45 : 0;
    const width = Math.max(String(final).length, String(from).length) + (final === 0 ? 0 : 1);

    el.textContent = "";
    if (prefix) el.appendChild(document.createTextNode(prefix));
    const wrap = mk("span", "v2fx-ct");
    const pad = mk("span", "v2fx-ct-pad");
    const num = mk("span", "v2fx-ct-num");
    wrap.append(pad, num);
    el.appendChild(wrap);
    if (suffix) el.appendChild(document.createTextNode(suffix));

    const rec: CounterRec = { raw, from, final, width, pad, num, started: false, raf: 0 };
    this.counters.set(el, rec);
    this.addUndo(el, () => {
      if (rec.raf) cancelAnimationFrame(rec.raf);
      el.textContent = raw;
      delete el.dataset.v2fxCt;
      this.counters.delete(el);
    });

    if (reduced) {
      rec.started = true;
      this.renderCount(rec, final);
      return;
    }
    this.renderCount(rec, from);
    this.counterIO?.observe(el);
  }

  private renderCount(rec: CounterRec, v: number) {
    const s = String(v).padStart(rec.width, "0");
    const cut = Math.max(0, s.length - String(v).length);
    rec.pad.textContent = s.slice(0, cut);
    rec.num.textContent = s.slice(cut);
  }

  private startCount(el: HTMLElement) {
    const rec = this.counters.get(el);
    if (!rec || rec.started) return;
    rec.started = true;
    if (this.reduced.matches) {
      this.renderCount(rec, rec.final);
      return;
    }
    const t0 = performance.now();
    const step = (now: number) => {
      if (this.destroyed) return;
      if (this.reduced.matches) {
        this.renderCount(rec, rec.final);
        rec.raf = 0;
        return;
      }
      const p = Math.min(1, (now - t0) / COUNT_MS);
      this.renderCount(rec, Math.round(rec.from + (rec.final - rec.from) * easeInOutCubic(p)));
      rec.raf = p < 1 ? requestAnimationFrame(step) : 0;
    };
    rec.raf = requestAnimationFrame(step);
  }

  /* ------------------------------------------------------- 8 · caps-decode */

  private maybeDecode(section: HTMLElement) {
    // ONE eyebrow per viewport entry; session-once per element; desktop only.
    if (this.decode || this.reduced.matches || this.mobile.matches) return;
    const el = section.querySelector<HTMLElement>(".eyebrow");
    if (!el || el.dataset.v2fxDe || el.closest(".hero-stage")) return;
    const final = el.textContent ?? "";
    if (final.length < 3 || final.length > 40 || el.children.length > 0) return;
    el.dataset.v2fxDe = "1";
    el.setAttribute("aria-label", final);

    const t0 = performance.now();
    const step = (now: number) => {
      if (this.destroyed) return;
      const p = Math.min(1, (now - t0) / DECODE_MS);
      const lock = Math.floor(p * final.length);
      let out = final.slice(0, lock);
      for (let i = lock; i < final.length; i++) {
        const c = final[i];
        out += c === " " ? " " : DECODE_CHARSET[(Math.random() * DECODE_CHARSET.length) | 0];
      }
      try {
        el.textContent = p < 1 ? out : final;
      } catch {
        /* element may be gone */
      }
      if (p < 1 && this.decode) {
        this.decode.raf = requestAnimationFrame(step);
      } else {
        el.removeAttribute("aria-label");
        this.decode = null;
      }
    };
    this.decode = { el, final, raf: requestAnimationFrame(step) };
  }

  /* ------------------------------------------------------ 7 · route boot */

  private bootRails() {
    if (!this.rails || this.reduced.matches || !this.hudWide.matches) return;
    this.rails.classList.remove("v2fx-boot");
    void this.rails.offsetWidth; // restart the sweep animation
    this.rails.classList.add("v2fx-boot");
  }

  /* ----------------------------------------------------------------- undo */

  private addUndo(el: Element, fn: () => void) {
    const list = this.undos.get(el) ?? [];
    list.push(fn);
    this.undos.set(el, list);
  }

  destroy() {
    this.destroyed = true;
    this.routeToken++;
    this.revealIO?.disconnect();
    this.counterIO?.disconnect();
    this.midIO?.disconnect();
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onScroll);
    document.removeEventListener("visibilitychange", this.onVisibility);
    if (this.scrollRaf) cancelAnimationFrame(this.scrollRaf);
    this.stopClock();
    if (this.decode) {
      cancelAnimationFrame(this.decode.raf);
      try {
        this.decode.el.textContent = this.decode.final;
        this.decode.el.removeAttribute("aria-label");
      } catch {
        /* detached */
      }
      this.decode = null;
    }
    for (const rec of this.counters.values()) if (rec.raf) cancelAnimationFrame(rec.raf);
    // Revert all structural surgery (line wraps, counter spans, stepper strip).
    for (const list of this.undos.values())
      for (const undo of list) {
        try {
          undo();
        } catch {
          /* detached nodes are fine */
        }
      }
    this.undos.clear();
    this.counters.clear();
    this.hud?.remove();
    this.hud = null;
    this.rails?.remove();
    this.rails = null;
  }
}

/* ------------------------------------------------------------- component */

export default function V2FX() {
  const { pathname } = useLocation();
  const engineRef = useRef<V2FxEngine | null>(null);

  // Engine lives exactly as long as the v2 theme is active.
  useEffect(() => {
    const engine = new V2FxEngine();
    engineRef.current = engine;
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, []);

  // Annotate on mount and on every route change.
  useEffect(() => {
    void engineRef.current?.routeEnter();
  }, [pathname]);

  return null;
}
