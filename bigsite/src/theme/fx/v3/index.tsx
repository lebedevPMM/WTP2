import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

/* ============================================================
   V3 "Midnight Route" FX layer — the Route Spine, site-wide.

   Port of the approved /v3 concept signature (variants/v3/
   V3Page.tsx → RouteSpine) onto every Layout page: a measured
   gold SVG path engraved down the page's LEFT margin, one
   station node per qualifying `main .section`, scroll-linked
   stroke-dashoffset draw inside a lerped rAF loop, nodes
   igniting as the ink reaches them. The `.prescreen-panel`
   (final CTA), when present, becomes the terminal node —
   slightly larger, ringed, lit last.

   Pure overlay annotator: portals one aria-hidden host <div>
   into document.body, document-positioned (top = first section,
   on Home clamped below the 420vh `.hero-stage`). All visual
   styling lives in themes/v3.css ("FX LAYER — ROUTE SPINE"
   section) under html[data-theme="v3"]. Zero layout impact.

   Gates: viewport ≥1100px (matchMedia, reactive) · <2 stations
   → renders nothing · prefers-reduced-motion → fully drawn and
   lit, no rAF loop · pointer-events:none · z-index 5 (below
   nav z50 / grain z900 / ThemeSwitch z998) · full teardown on
   unmount (theme switch / breakpoint).
   ============================================================ */

const BAND = 120; // overlay strip width, px — bounds the glow's blur region
const PAD_BOTTOM = 48; // room below the terminal node for ring + glow
const MIN_SECTION = 200; // sections shorter than this contribute no station
const MIN_GAP = 48; // de-dupe stations vertically closer than this
const TIP = 0.62; // ink tip rides at 62% of viewport height (concept grammar)
const SVG_NS = "http://www.w3.org/2000/svg";

function useMQ(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia(query).matches
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setMatches(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

export default function V3FX() {
  const wide = useMQ("(min-width: 1100px)");
  const reduced = useMQ("(prefers-reduced-motion: reduce)");
  const { pathname } = useLocation();

  const hostRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!wide) return;
    const host = hostRef.current;
    const svg = svgRef.current;
    const glow = glowRef.current;
    const path = pathRef.current;
    const nodesG = nodesRef.current;
    if (!host || !svg || !glow || !path || !nodesG) return;

    // Prerendered HTML can carry a serialized copy of this portal; React never
    // adopts it on hydration, so it lingers with a stale inline height across
    // SPA navigations. Drop any host we don't own.
    document.querySelectorAll(".v3fx-spine-host").forEach((n) => {
      if (n !== host) n.remove();
    });

    let disposed = false;
    let raf = 0; // draw-loop handle
    let mRaf = 0; // queued re-measure handle
    let initRaf = 0; // initial double-rAF handle
    let total = 0; // current path length
    let cur = 0; // drawn length (lerped)
    let applied = -1; // last length written to the DOM
    let pathTop = 0; // document Y where the spine starts
    let height = 0; // overlay height
    let stationLens: number[] = [];
    let litStates: boolean[] = [];
    let nodeEls: SVGCircleElement[] = [];
    let lenForY: (y: number) => number = () => 0;

    const clearNodes = () => {
      while (nodesG.firstChild) nodesG.removeChild(nodesG.firstChild);
      nodeEls = [];
      litStates = [];
    };

    const hide = () => {
      total = 0;
      clearNodes();
      host.style.height = "0px";
    };

    const applyDraw = () => {
      const off = Math.max(total - cur, 0).toFixed(2);
      path.style.strokeDashoffset = off;
      glow.style.strokeDashoffset = off;
      for (let i = 0; i < nodeEls.length; i++) {
        const lit = cur >= (stationLens[i] ?? Infinity) - 2;
        if (lit !== litStates[i]) {
          litStates[i] = lit;
          nodeEls[i].classList.toggle("is-lit", lit);
        }
      }
    };

    const measure = () => {
      if (disposed) return;
      const main = document.querySelector<HTMLElement>("main");
      if (!main) {
        hide();
        return;
      }
      const sy = window.scrollY;

      // Home: never overlap the 420vh scroll-video hero
      const hero = main.querySelector<HTMLElement>(".hero-stage");
      const heroBottom = hero ? hero.getBoundingClientRect().bottom + sy : -Infinity;

      // final CTA: the prescreen panel pulls its section's node onto itself
      const panel = main.querySelector<HTMLElement>(".prescreen-panel");
      const panelSection = panel ? panel.closest<HTMLElement>(".section") : null;

      // stations — one per qualifying section, document-Y of its center
      const ys: number[] = [];
      let firstTop = Infinity;
      for (const s of Array.from(main.querySelectorAll<HTMLElement>(".section"))) {
        const r = s.getBoundingClientRect();
        if (r.height < MIN_SECTION) continue;
        let y = r.top + sy + r.height / 2;
        if (panel && panelSection === s) {
          const pr = panel.getBoundingClientRect();
          y = pr.top + sy + pr.height / 2;
        }
        if (y <= heroBottom) continue; // section swallowed by the hero stage
        const prev = ys.length ? ys[ys.length - 1] : -Infinity;
        if (y - prev < MIN_GAP) continue;
        ys.push(y);
        if (r.top + sy < firstTop) firstTop = r.top + sy;
      }
      if (ys.length < 2) {
        hide();
        return;
      }

      // vertical span (guarded against zero-height mid route-transition)
      let top0 = firstTop;
      if (isFinite(heroBottom)) top0 = Math.max(top0, heroBottom + 24);
      top0 = Math.min(top0, ys[0] - 40); // always a lead-in before station 1
      let H = ys[ys.length - 1] - top0 + PAD_BOTTOM;
      if (!isFinite(H) || H <= 0) {
        hide();
        return;
      }
      // Route transitions can leave a stale measure (the router flips the
      // pathname while the previous page is still painted) — never let the
      // spine stretch the document past the footer, or short pages gain
      // scrollable dead space below it.
      const foot = document.querySelector<HTMLElement>("footer");
      if (foot) {
        const footBottom = foot.getBoundingClientRect().bottom + sy;
        if (top0 >= footBottom) {
          hide();
          return;
        }
        H = Math.min(H, footBottom - top0);
      }

      // spine X — measured off the content column so the line lives in the
      // empty left margin: ~48px at 1440, ~22-29px under 1280 viewports
      const wrapEl = main.querySelector<HTMLElement>(".wrap");
      const contentLeft = (wrapEl ? wrapEl.getBoundingClientRect().left : 0) + 32;
      const x = Math.round(Math.min(48, Math.max(22, contentLeft * 0.55)));
      const amp = x >= 40 ? 12 : 8; // meander amplitude shrinks with the margin

      // gently meandering vertical path through every station (concept math)
      const pts = [0, ...ys.map((y) => y - top0)];
      let d = `M ${x} 0`;
      let sign = 1;
      for (let i = 1; i < pts.length; i++) {
        const y0 = pts[i - 1];
        const y1 = pts[i];
        const seg = y1 - y0;
        const off = Math.min(amp, Math.abs(seg) * 0.08) * sign;
        d += ` C ${x + off} ${y0 + seg * 0.38}, ${x - off} ${y0 + seg * 0.62}, ${x} ${y1}`;
        sign *= -1;
      }

      host.style.top = `${top0}px`;
      host.style.width = `${BAND}px`;
      host.style.height = `${H}px`;
      svg.setAttribute("viewBox", `0 0 ${BAND} ${H}`);
      path.setAttribute("d", d);
      glow.setAttribute("d", d);
      total = path.getTotalLength();
      pathTop = top0;
      height = H;

      // sampled monotonic y → length lookup (binary search)
      const N = Math.min(480, Math.max(120, Math.round(H / 24)));
      const samples: { y: number; l: number }[] = [];
      for (let i = 0; i <= N; i++) {
        const l = (total * i) / N;
        samples.push({ y: path.getPointAtLength(l).y, l });
      }
      lenForY = (y: number) => {
        let lo = 0;
        let hi = samples.length - 1;
        while (lo < hi) {
          const mid = (lo + hi) >> 1;
          if (samples[mid].y < y) lo = mid + 1;
          else hi = mid;
        }
        return samples[lo].l;
      };
      const localYs = pts.slice(1);
      stationLens = localYs.map(lenForY);

      // station nodes — terminal (last / prescreen panel) gets a ring
      clearNodes();
      localYs.forEach((y, i) => {
        const last = i === localYs.length - 1;
        if (last) {
          const ring = document.createElementNS(SVG_NS, "circle");
          ring.setAttribute("cx", String(x));
          ring.setAttribute("cy", String(y));
          ring.setAttribute("r", "11");
          ring.setAttribute("class", "v3fx-spine-ring");
          nodesG.appendChild(ring);
        }
        const c = document.createElementNS(SVG_NS, "circle");
        c.setAttribute("cx", String(x));
        c.setAttribute("cy", String(y));
        c.setAttribute("r", last ? "5" : "3.5");
        c.setAttribute("class", "v3fx-spine-node");
        nodesG.appendChild(c);
        nodeEls.push(c);
        litStates.push(false);
      });

      path.style.strokeDasharray = String(total);
      glow.style.strokeDasharray = String(total);
      cur = Math.min(cur, total);
      applied = -1; // force a re-apply on the next frame
      if (reduced) {
        cur = total;
        applied = total;
        path.style.strokeDashoffset = "0";
        glow.style.strokeDashoffset = "0";
        nodeEls.forEach((c) => c.classList.add("is-lit"));
        litStates = litStates.map(() => true);
      } else {
        applyDraw(); // sync immediately — no one-frame ghost after re-measure
        applied = cur;
      }
    };

    const loop = () => {
      if (total > 0) {
        const yIn = Math.min(
          Math.max(window.scrollY + window.innerHeight * TIP - pathTop, 0),
          height
        );
        const target = lenForY(yIn);
        cur += (target - cur) * 0.14;
        if (Math.abs(target - cur) < 0.5) cur = target; // settle → loop idles
        if (cur !== applied) {
          applyDraw();
          applied = cur;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const queueMeasure = () => {
      if (disposed || mRaf) return;
      mRaf = requestAnimationFrame(() => {
        mRaf = 0;
        measure();
      });
    };

    // first measure after the new route has painted (double rAF), then again
    // once fonts and the full page (images) have landed
    initRaf = requestAnimationFrame(() => {
      initRaf = requestAnimationFrame(() => {
        measure();
        if (!reduced) raf = requestAnimationFrame(loop);
      });
    });
    const ro = new ResizeObserver(queueMeasure);
    ro.observe(document.body);
    // main swaps its contents on route change; observing it directly
    // guarantees a re-measure once the new page's DOM actually lands
    const mainEl = document.querySelector("main");
    if (mainEl) ro.observe(mainEl);
    window.addEventListener("load", queueMeasure);
    if (document.fonts) {
      document.fonts.ready.then(() => queueMeasure()).catch(() => {});
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      cancelAnimationFrame(mRaf);
      cancelAnimationFrame(initRaf);
      ro.disconnect();
      window.removeEventListener("load", queueMeasure);
      clearNodes();
    };
  }, [wide, reduced, pathname]);

  if (!wide) return null;

  return createPortal(
    <div ref={hostRef} className="v3fx-spine-host" aria-hidden="true">
      <svg
        ref={svgRef}
        className="v3fx-spine"
        preserveAspectRatio="none"
        focusable="false"
        aria-hidden="true"
      >
        <path ref={glowRef} className="v3fx-spine-glow" />
        <path ref={pathRef} className="v3fx-spine-path" />
        <g ref={nodesRef} />
      </svg>
    </div>,
    document.body
  );
}
