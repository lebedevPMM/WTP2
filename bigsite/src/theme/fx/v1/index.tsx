/* ============================================================
   V1 "The Private Ledger" — site-wide FX layer.
   Runtime ANNOTATOR: selects existing DOM after fonts settle and
   annotates it (classes + CSS custom-property delays + a few
   structural word/roll wrappers). Every visual rule lives in
   src/themes/v1.css under html[data-theme="v1"], so leftover
   annotations are inert in other themes.

   Hard rules honoured here:
   - never touches .hero-stage (React mutates it every frame) or
     anything inside .meganav-root (React-owned children);
   - re-runs per route (useLocation), idempotent via class flags;
   - <900px: simple fade reveals only; prefers-reduced-motion:
     annotates nothing (static baseline, nothing is ever hidden);
   - cleanup on unmount: observers disconnected, rAF/timeouts
     cancelled, own overlay nodes removed.
   ============================================================ */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* never annotate inside these */
const EXCLUDE = ".hero-stage, .meganav-root";
/* "seats" with their own bespoke treatment — generic passes skip them */
const SEAT = ".card, .prescreen-panel, .statbar, table, footer, .hero-stage, .meganav-root";
/* headline splitting bails if the headline holds anything but these */
const MASK_SAFE_TAGS = new Set(["SPAN", "EM", "STRONG", "B", "I", "BR", "A", "SUP", "SUB"]);
/* leading number with optional prefix glyph; suffix stays static */
const NUM_RE = /^([~≈<>+]?\s?)(\d{1,4}(?:[.,]\d{1,2})?)([\s\S]{0,18})$/;

function qa<T extends Element = HTMLElement>(sel: string, root: ParentNode = document): T[] {
  return Array.from(root.querySelectorAll<T>(sel));
}
const excluded = (el: Element) => el.closest(EXCLUDE) !== null;
const inSeat = (el: Element) => el.closest(SEAT) !== null;
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

export default function V1FX() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (document.documentElement.dataset.theme !== "v1") return;

    /* reduced motion → static baseline: annotate nothing, hide nothing */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mobile = window.matchMedia("(max-width: 899px)").matches;

    let dead = false;
    const rafs = new Set<number>();
    const timers = new Set<number>();

    /* ---------- one shared IO drives .is-in (toggle once, unobserve) ---------- */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "-8% 0px -10% 0px", threshold: 0 }
    );

    /* ---------- dedicated IO: count-ups fire at 50% visibility ---------- */
    const counterIO = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const host = e.target as HTMLElement;
          counterIO.unobserve(host);
          if (host.classList.contains("v1fx-ledger")) {
            host.classList.add("is-in");
            /* provenance registry rises 150ms after the figures land */
            const t = window.setTimeout(() => host.classList.add("is-fin"), 1280);
            timers.add(t);
          }
          qa<HTMLElement>("[data-v1fx-num]", host).forEach(runCounter);
        }
      },
      { threshold: 0.5 }
    );

    /* ---------- annotation primitives ---------- */

    function rev(el: HTMLElement, d: number) {
      if (excluded(el) || el.classList.contains("v1fx-rev") || el.classList.contains("v1fx-clip")) return;
      el.style.setProperty("--d", `${d}ms`);
      el.classList.add("v1fx-rev");
    }

    function clip(el: HTMLElement, d: number) {
      if (mobile) return rev(el, d); /* <900px: fades only */
      if (excluded(el) || el.classList.contains("v1fx-clip") || el.classList.contains("v1fx-rev")) return;
      el.style.setProperty("--d", `${d}ms`);
      el.classList.add("v1fx-clip");
    }

    /* masked line-by-line headline reveal: words become per-word masks;
       all words on one measured line share --lnd, so each line rises as
       one. Guarded: bails (leaving plain text) on anything unexpected. */
    function maskHeadline(h: HTMLElement, base: number, step = 85) {
      if (h.classList.contains("v1fx-lines") || h.dataset.v1fx === "mask" || excluded(h)) return;
      const text = h.textContent ?? "";
      if (!text.trim() || text.length > 300) return;
      for (const el of Array.from(h.querySelectorAll("*"))) {
        if (!MASK_SAFE_TAGS.has(el.tagName)) return;
      }
      try {
        const walker = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        const nodes: Text[] = [];
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if ((n.nodeValue ?? "").trim()) nodes.push(n as Text);
        }
        for (const t of nodes) {
          const frag = document.createDocumentFragment();
          for (const part of (t.nodeValue ?? "").split(/(\s+)/)) {
            if (!part) continue;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(part));
              continue;
            }
            const wm = document.createElement("span");
            wm.className = "v1fx-wm";
            const w = document.createElement("span");
            w.className = "v1fx-w";
            w.textContent = part;
            wm.appendChild(w);
            frag.appendChild(wm);
          }
          t.parentNode?.replaceChild(frag, t);
        }
        const wms = qa<HTMLElement>(".v1fx-wm", h);
        if (!wms.length) return;
        /* group words into lines by measured top (spans are still inline
           and unstyled here, so geometry is the final layout) */
        let line = -1;
        let prevTop = -Infinity;
        for (const wm of wms) {
          const top = wm.getBoundingClientRect().top;
          if (top > prevTop + 3) {
            line += 1;
            prevTop = top;
          }
          wm.style.setProperty("--lnd", `${base + line * step}ms`);
        }
        h.dataset.v1fx = "mask";
        h.classList.add("v1fx-lines");
      } catch {
        /* leave whatever happened unstyled-inert; never break the page */
        h.classList.remove("v1fx-lines");
      }
    }

    /* tabular count-up: leading number rolls, prefix/suffix stay static */
    function markCounter(g: HTMLElement) {
      if (g.dataset.v1fxNum || excluded(g)) return;
      const txt = (g.textContent ?? "").trim();
      if (!txt || txt.length > 24 || !NUM_RE.test(txt)) return;
      g.dataset.v1fxNum = "1";
      g.dataset.v1fxOrig = txt;
    }

    function runCounter(g: HTMLElement) {
      if (g.dataset.v1fxDone) return;
      g.dataset.v1fxDone = "1";
      const orig = g.dataset.v1fxOrig ?? (g.textContent ?? "").trim();
      const m = NUM_RE.exec(orig);
      if (!m) return;
      const pre = m[1] ?? "";
      const numStr = m[2] ?? "";
      const suf = m[3] ?? "";
      const decSep = numStr.includes(",") ? "," : ".";
      const intPart = numStr.split(/[.,]/)[0] ?? "";
      const decimals = (numStr.split(/[.,]/)[1] ?? "").length;
      const pad = intPart.length > 1 && intPart.startsWith("0") ? intPart.length : 0;
      const target = parseFloat(numStr.replace(",", "."));
      if (!isFinite(target) || target === 0) {
        g.textContent = orig;
        return;
      }
      const dur = 1100;
      const t0 = performance.now();
      const fmt = (v: number) => {
        let s = v.toFixed(decimals);
        if (decSep === ",") s = s.replace(".", ",");
        if (pad) {
          const [i, d] = s.split(decSep);
          s = (i ?? "").padStart(pad, "0") + (d ? decSep + d : "");
        }
        return s;
      };
      const tick = (now: number) => {
        if (dead || !g.isConnected) return;
        const t = Math.min((now - t0) / dur, 1);
        if (t >= 1) {
          g.textContent = orig; /* exact original restored at the end */
          return;
        }
        g.textContent = pre + fmt(target * easeOutQuart(t)) + suf;
        const id = requestAnimationFrame(tick);
        rafs.add(id);
      };
      const id = requestAnimationFrame(tick);
      rafs.add(id);
    }

    /* word roll-over: two stacked copies in an overflow-clipped mask.
       The duplicate carries [hidden] → display:none in every other
       theme (inert); v1.css re-displays it. */
    function buildRoll(label: string, moveChildrenOf?: HTMLElement): HTMLSpanElement {
      const roll = document.createElement("span");
      roll.className = "v1fx-roll";
      const top = document.createElement("span");
      top.className = "v1fx-roll-a";
      if (moveChildrenOf) {
        while (moveChildrenOf.firstChild) top.appendChild(moveChildrenOf.firstChild);
      } else {
        top.textContent = label;
      }
      const dup = document.createElement("span");
      dup.className = "v1fx-roll-b";
      dup.textContent = label;
      dup.setAttribute("aria-hidden", "true");
      dup.hidden = true;
      roll.append(top, dup);
      return roll;
    }

    function annotateRoll(a: HTMLElement) {
      if (excluded(a) || a.classList.contains("btn") || a.dataset.v1fx === "roll" || a.querySelector(".v1fx-roll")) return;
      const label = (a.textContent ?? "").trim();
      if (!label || label.length > 26) return;
      for (const n of Array.from(a.childNodes)) {
        if (n.nodeType === Node.ELEMENT_NODE) return; /* text-only links */
      }
      a.appendChild(buildRoll(label, a));
      a.dataset.v1fx = "roll";
    }

    function annotateRollText(host: HTMLElement, textNode: Text) {
      if (host.dataset.v1fx === "roll" || host.querySelector(".v1fx-roll")) return;
      const label = (textNode.nodeValue ?? "").trim();
      if (!label || label.length > 26) return;
      host.replaceChild(buildRoll(label), textNode);
      host.dataset.v1fx = "roll";
    }

    /* ---------- the annotation pass (idempotent) ---------- */

    function annotate() {
      /* 1 · sections — opening hairlines arm themselves to draw */
      for (const sec of qa<HTMLElement>("section.section")) {
        if (excluded(sec)) continue;
        sec.classList.add("v1fx-sec");
        const wrap = sec.querySelector<HTMLElement>(":scope > .wrap") ?? sec;

        /* 2 · editorial header rhythm: eyebrow 0 → rule ~80 (CSS) →
               headline 140 (+85/line) → lede 260 → CTA row ~360 */
        qa<HTMLElement>(".eyebrow", wrap).forEach((e, i) => {
          if (!inSeat(e)) rev(e, i === 0 ? 0 : 60);
        });
        const crumb = wrap.querySelector<HTMLElement>(":scope > nav, :scope > * > nav");
        if (crumb && !inSeat(crumb)) rev(crumb, 0);

        const head = qa<HTMLElement>("h1, h2", wrap).find((h) => !inSeat(h));
        if (head) {
          if (mobile) rev(head, 140);
          else maskHeadline(head, 140, 85);
          let sib = head.nextElementSibling;
          let d = 260;
          while (sib && sib.tagName === "P") {
            rev(sib as HTMLElement, d);
            d += 60;
            sib = sib.nextElementSibling;
          }
          if (sib instanceof HTMLElement && !inSeat(sib) && sib.querySelector(".btn")) rev(sib, d + 40);
        }
        qa<HTMLElement>(".btn", wrap).forEach((b) => {
          if (inSeat(b) || b.closest(".v1fx-rev, .v1fx-clip")) return;
          rev(b, 320);
        });

        /* 3 · blocks: cards clip per grid seat, entries cascade */
        for (const grid of qa<HTMLElement>(".grid-2, .grid-3, .grid-4", wrap)) {
          const cols = grid.classList.contains("grid-4") ? 4 : grid.classList.contains("grid-3") ? 3 : 2;
          Array.from(grid.children).forEach((kid, i) => {
            if (!(kid instanceof HTMLElement)) return;
            const d = 90 + (i % cols) * 75 + Math.min(Math.floor(i / cols), 2) * 60;
            if (kid.classList.contains("card")) clip(kid, d);
            else if (cols > 2) rev(kid, d);
            /* grid-2 layout columns stay static; their inner units animate */
          });
        }
        qa<HTMLElement>(".stepper > div", wrap).forEach((cell, i) => clip(cell, 90 + i * 75));
        qa<HTMLElement>('li[style*="border-bottom"]', wrap).forEach((li, i) => rev(li, Math.min(120 + i * 55, 500)));
        qa<HTMLElement>("details", wrap).forEach((dt, i) => rev(dt, Math.min(90 + i * 55, 470)));
        qa<HTMLElement>(".chip", wrap).forEach((ch, i) => {
          if (!inSeat(ch)) rev(ch, 120 + i * 45);
        });
        qa<HTMLElement>(".prose", wrap).forEach((p) => rev(p, 200));
      }

      /* 4 · statbar → ledger band: frame draws, figures count,
             provenance registry rises last */
      for (const sb of qa<HTMLElement>(".statbar")) {
        if (excluded(sb)) continue;
        const cells = Array.from(sb.children).filter((c): c is HTMLElement => c instanceof HTMLElement);
        if (mobile) {
          cells.forEach((c, i) => rev(c, i * 60));
          continue;
        }
        if (!sb.classList.contains("v1fx-ledger")) {
          sb.classList.add("v1fx-ledger");
          cells.forEach((c, i) => c.style.setProperty("--d", `${i * 90}ms`));
          qa<HTMLElement>(":scope > div > div:nth-child(3)", sb).forEach((p) => p.classList.add("v1fx-prov"));
          qa<HTMLElement>(".g", sb).forEach(markCounter);
        }
      }

      /* padded card numerals (01/02/03 step figures) also count */
      if (!mobile) qa<HTMLElement>(".card .g").forEach(markCounter);

      /* 5 · tables → ruled ledger frames with row cascade */
      for (const tbl of qa<HTMLElement>("main table")) {
        if (excluded(tbl)) continue;
        const shell = tbl.parentElement;
        if (!shell) continue;
        if (mobile) {
          rev(shell, 120);
          continue;
        }
        if (!shell.classList.contains("v1fx-tbl")) {
          shell.classList.add("v1fx-tbl");
          qa<HTMLElement>("tbody tr", tbl).forEach((r, i) => r.style.setProperty("--ri", String(i)));
        }
      }

      /* 6 · pre-screen panel: the document seals itself */
      qa<HTMLElement>(".prescreen-panel").forEach((p) => {
        if (excluded(p)) return;
        if (mobile) rev(p, 80);
        else p.classList.add("v1fx-seal");
      });

      /* 7 · footer colophon: double rule draws, columns cascade, links roll */
      const foot = document.querySelector<HTMLElement>("footer");
      if (foot && !excluded(foot)) {
        if (!mobile) foot.classList.add("v1fx-foot");
        qa<HTMLElement>(".footer-grid > div", foot).forEach((col, i) => rev(col, 80 + i * 80));
        qa<HTMLElement>(".footer-cta", foot).forEach((row) => rev(row, 120));
        if (!mobile) qa<HTMLElement>("a", foot).forEach(annotateRoll);
      }

      /* 8 · card "Explore" labels → word roll-over (text node only;
             the arrow icon is left untouched) */
      if (!mobile) {
        qa<HTMLElement>(".card span").forEach((s) => {
          if (excluded(s)) return;
          const first = Array.from(s.childNodes).find(
            (n) => n.nodeType === Node.TEXT_NODE && (n.nodeValue ?? "").trim()
          );
          if (first && (first.nodeValue ?? "").trim() === "Explore") annotateRollText(s, first as Text);
        });
      }
    }

    /* observe everything annotated but not yet revealed — also catches
       flagged-but-unrevealed nodes after a theme round-trip */
    function observeAll() {
      qa<HTMLElement>(
        ".v1fx-rev:not(.is-in), .v1fx-clip:not(.is-in), .v1fx-sec:not(.is-in), .v1fx-lines:not(.is-in), .v1fx-seal:not(.is-in), .v1fx-foot:not(.is-in), .v1fx-tbl:not(.is-in)"
      ).forEach((el) => io.observe(el));
      qa<HTMLElement>(".v1fx-ledger:not(.is-in)").forEach((el) => counterIO.observe(el));
      qa<HTMLElement>(".card").forEach((c) => {
        if (c.querySelector("[data-v1fx-num]:not([data-v1fx-done])")) counterIO.observe(c);
      });
    }

    /* ---------- grain parallax overlay (desktop only, technique 7) ---------- */
    let grain: HTMLDivElement | null = null;
    let onScroll: (() => void) | null = null;
    if (!mobile) {
      grain = document.createElement("div");
      grain.className = "v1fx-grain";
      grain.setAttribute("aria-hidden", "true");
      document.body.appendChild(grain);
      let pending = false;
      onScroll = () => {
        if (pending || dead) return;
        pending = true;
        const id = requestAnimationFrame(() => {
          pending = false;
          rafs.delete(id);
          /* slow counter-drift; tile-periodic so it never runs out */
          if (grain) grain.style.transform = `translate3d(0, ${(-((window.scrollY * 0.025) % 180)).toFixed(2)}px, 0)`;
        });
        rafs.add(id);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }

    /* ---------- boot: fonts settled + double rAF, then annotate ---------- */
    document.fonts.ready.then(() => {
      if (dead) return;
      const r1 = requestAnimationFrame(() => {
        rafs.delete(r1);
        const r2 = requestAnimationFrame(() => {
          rafs.delete(r2);
          if (dead || document.documentElement.dataset.theme !== "v1") return;
          try {
            annotate();
          } catch {
            /* annotator must never break the page */
          }
          observeAll();
        });
        rafs.add(r2);
      });
      rafs.add(r1);
    });

    return () => {
      dead = true;
      io.disconnect();
      counterIO.disconnect();
      rafs.forEach((id) => cancelAnimationFrame(id));
      timers.forEach((id) => window.clearTimeout(id));
      if (onScroll) window.removeEventListener("scroll", onScroll);
      grain?.remove();
    };
  }, [pathname]);

  return null;
}
