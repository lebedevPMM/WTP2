import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "../../content/services";
import { experts } from "../../content/experts";
import "./v3.css";

/* ============================================================
   V3 — "Midnight Route"
   Cinematic dark luxury 2.0. Standalone landing (own nav/footer),
   evolution of the locked scroll-scrub terrain hero.
   ============================================================ */

const dly = (ms: number): CSSProperties => ({ "--v3-d": `${ms}ms` } as CSSProperties);

/* ------------------------------------------------------------------ fonts */

const FONT_LINKS: { id: string; rel: string; href: string; cross?: boolean }[] = [
  { id: "v3-fonts-pre-g", rel: "preconnect", href: "https://fonts.googleapis.com" },
  { id: "v3-fonts-pre-gs", rel: "preconnect", href: "https://fonts.gstatic.com", cross: true },
  {
    id: "v3-fonts-css",
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap",
  },
];

function useGoogleFonts() {
  useEffect(() => {
    FONT_LINKS.forEach((spec) => {
      if (document.getElementById(spec.id)) return;
      const link = document.createElement("link");
      link.id = spec.id;
      link.rel = spec.rel;
      link.href = spec.href;
      if (spec.cross) link.crossOrigin = "anonymous";
      document.head.appendChild(link);
    });
  }, []);
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ------------------------------------------------------------------ nav */

const NAV_LINKS = [
  { label: "Method", href: "#v3-method" },
  { label: "Services", href: "#v3-services" },
  { label: "Who we help", href: "#v3-segments" },
  { label: "Experts", href: "#v3-experts" },
];

function V3Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 14);
        raf = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <header className={`v3-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="v3-wrap v3-nav-in">
        <Link to="/" className="v3-wordmark" aria-label="WTP — home">
          WTP<b>.</b>
        </Link>
        <nav className="v3-nav-links" aria-label="Page sections">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <Link to="/contact" className="v3-btn v3-btn-sm">
          Book a pre-screen
        </Link>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ hero */

const BEATS = [
  { out: 0.3 },
  { in: 0.4, out: 0.64 },
  { in: 0.7, out: 0.985 },
];

function V3Hero({ reduced }: { reduced: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    const stage = stageRef.current;
    const vid = vidRef.current;
    if (!stage || !vid) return;

    let dur = 5;
    let primed = false;
    let cur = 0;
    let raf = 0;

    const prime = () => {
      if (primed) return;
      primed = true;
      const pr = vid.play();
      if (pr && pr.then) pr.then(() => vid.pause()).catch(() => {});
    };
    const onMeta = () => {
      dur = vid.duration || 5;
      prime();
    };
    vid.addEventListener("loadedmetadata", onMeta);
    window.addEventListener("scroll", prime, { once: true, passive: true });
    window.addEventListener("pointerdown", prime, { once: true });

    const smooth = (e0: number, e1: number, x: number) => {
      const t = Math.min(Math.max((x - e0) / (e1 - e0), 0), 1);
      return t * t * (3 - 2 * t);
    };
    const F = 0.06;
    const bump = (p: number, a: number, b: number) =>
      Math.min(smooth(a, a + F, p), 1 - smooth(b - F, b, p));

    // Beat 0 is fully visible at p=0 and only fades when scrolled PAST.
    const ops: ((p: number) => number)[] = [
      (p) => 1 - smooth(BEATS[0].out - F, BEATS[0].out, p),
      (p) => bump(p, BEATS[1].in ?? 0, BEATS[1].out),
      (p) => bump(p, BEATS[2].in ?? 0, BEATS[2].out),
    ];

    const progress = () => {
      const r = stage.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      return Math.min(Math.max(-r.top / total, 0), 1);
    };

    const loop = () => {
      const p = progress();
      cur += (p - cur) * 0.18;
      if (dur && isFinite(dur)) {
        const t = Math.min(cur * dur, dur - 0.05);
        if (Math.abs(vid.currentTime - t) > 0.02) {
          try {
            vid.currentTime = t;
          } catch {
            /* seeking guard */
          }
        }
      }
      beatRefs.current.forEach((b, i) => {
        if (!b) return;
        const o = ops[i](p);
        b.style.opacity = o.toFixed(3);
        b.style.pointerEvents = o > 0.35 ? "auto" : "none";
      });
      if (cueRef.current) cueRef.current.style.opacity = String(1 - smooth(0.012, 0.085, p));
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      vid.removeEventListener("loadedmetadata", onMeta);
      window.removeEventListener("scroll", prime);
      window.removeEventListener("pointerdown", prime);
    };
  }, [reduced]);

  return (
    <div ref={stageRef} className={`v3-hero${reduced ? " is-static" : ""}`} data-v3-rail>
      <div className="v3-hero-frame">
        {reduced ? (
          <img className="v3-hero-media" src="/hero/poster.png" alt="" aria-hidden="true" />
        ) : (
          <video
            ref={vidRef}
            className="v3-hero-media"
            muted
            playsInline
            preload="auto"
            poster="/hero/poster.png"
            aria-hidden="true"
          >
            <source src="/hero/route.mp4" type="video/mp4" />
          </video>
        )}

        <div className="v3-hero-scrim" />
        <div className="v3-hero-floor" />

        {/* Beat 1 — fully visible at first paint */}
        <div
          ref={(el) => {
            beatRefs.current[0] = el;
          }}
          className="v3-beat"
          style={{ opacity: 1, pointerEvents: "auto" }}
        >
          <div className="v3-wrap">
            <div className="v3-beat-box">
              <p className="v3-label v3-fadein" style={{ animationDelay: ".05s" }}>
                Banking-first wealth relocation · UAE
              </p>
              <h1 className="v3-hl">
                <span className="v3-hl-line">
                  <span className="v3-hl-in" style={{ animationDelay: ".12s" }}>
                    Move your wealth
                  </span>
                </span>
                <span className="v3-hl-line">
                  <span className="v3-hl-in" style={{ animationDelay: ".24s" }}>
                    to the UAE.
                  </span>
                </span>
                <span className="v3-hl-line">
                  <span className="v3-hl-in v3-hl-gold" style={{ animationDelay: ".38s" }}>
                    Start with the bank.
                  </span>
                </span>
              </h1>
              <p className="v3-hero-sub v3-fadein" style={{ animationDelay: ".62s" }}>
                We deliver bankable structures, not company setups — one accountable team across
                bank, company, visa and assets.
              </p>
              <div className="v3-hero-ctas v3-fadein" style={{ animationDelay: ".78s" }}>
                <Link to="/contact" className="v3-btn">
                  Book a free pre-screen <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
                </Link>
                <Link to="/banking-first" className="v3-btn v3-btn-ghost">
                  How Banking-First works
                </Link>
              </div>
              <p className="v3-hero-quiet v3-fadein" style={{ animationDelay: ".94s" }}>
                For $1M+ liquid HNWI leaving the UK non-dom regime, DACH exit tax or NL Box 3.
              </p>
            </div>
          </div>
        </div>

        {!reduced && (
          <>
            {/* Beat 2 */}
            <div
              ref={(el) => {
                beatRefs.current[1] = el;
              }}
              className="v3-beat"
            >
              <div className="v3-wrap">
                <div className="v3-beat-box">
                  <p className="v3-label">The terrain</p>
                  <h2 className="v3-beat-h">Banking is the wall everyone hits.</h2>
                  <p className="v3-beat-p">
                    Set up the company first and the bank says no — about 30% of honest
                    applications are declined.
                  </p>
                  <span className="v3-source">WTP pre-screen data</span>
                </div>
              </div>
            </div>

            {/* Beat 3 */}
            <div
              ref={(el) => {
                beatRefs.current[2] = el;
              }}
              className="v3-beat"
            >
              <div className="v3-wrap">
                <div className="v3-beat-box">
                  <p className="v3-label">The route</p>
                  <h2 className="v3-beat-h">One pass. Four stations.</h2>
                  <p className="v3-beat-p">
                    Bank → company → visa → assets, in the only order that clears compliance.
                    The route continues below.
                  </p>
                </div>
              </div>
            </div>

            <div ref={cueRef} className="v3-cue" aria-hidden="true">
              <span className="v3-cue-t">Scroll — the route draws itself</span>
              <span className="v3-cue-line" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ stats */

const STATS = [
  {
    pre: "~",
    count: "30",
    suf: "%",
    label: "of honest applications banks decline",
    source: "WTP pre-screen data",
  },
  { value: "5–7", unit: "days", label: "to a Banking Roadmap", source: "L0 pre-screen" },
  { value: "4–8", unit: "wks", label: "typical full mandate", source: "WTP engagement model" },
  { value: "0", suf: "%", label: "personal income tax in the UAE", source: "UAE tax code" },
];

function StatsBand() {
  return (
    <section className="v3-stats" data-v3-rail aria-label="Proof in numbers">
      <div className="v3-wrap">
        <div className="v3-stats-grid">
          {STATS.map((s, i) => (
            <div key={s.label} className="v3-stat" data-v3-reveal style={dly(i * 110)}>
              <div className="v3-stat-num">
                {s.pre && <span className="v3-stat-aff">{s.pre}</span>}
                {s.count ? <span data-v3-count={s.count}>0</span> : <span>{s.value}</span>}
                {s.suf && <span className="v3-stat-aff">{s.suf}</span>}
                {s.unit && <span className="v3-stat-unit">{s.unit}</span>}
              </div>
              <p className="v3-stat-label">{s.label}</p>
              <span className="v3-source">{s.source}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ route spine (signature) */

function RouteSpine({
  zoneRef,
  reduced,
}: {
  zoneRef: RefObject<HTMLDivElement | null>;
  reduced: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const glowRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const zone = zoneRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;
    const glow = glowRef.current;
    const nodesG = nodesRef.current;
    if (!zone || !svg || !path || !glow || !nodesG) return;

    const mq = window.matchMedia("(min-width: 1100px)");
    let active = false;
    let total = 0;
    let cur = 0;
    let raf = 0;
    let stationLens: number[] = [];
    let nodeEls: SVGCircleElement[] = [];
    let lenForY: (y: number) => number = () => 0;

    const clearNodes = () => {
      while (nodesG.firstChild) nodesG.removeChild(nodesG.firstChild);
      nodeEls = [];
    };

    const rebuild = () => {
      active = mq.matches;
      if (!active) {
        total = 0;
        clearNodes();
        return;
      }
      const zr = zone.getBoundingClientRect();
      const W = Math.max(zone.clientWidth, 1);
      const H = Math.max(zone.offsetHeight, 1);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      const wrapEl = zone.querySelector(".v3-wrap");
      const wrapRect = wrapEl ? wrapEl.getBoundingClientRect() : null;
      const x = wrapRect ? wrapRect.left - zr.left + 76 : 96;

      const stations = Array.from(zone.querySelectorAll<HTMLElement>("[data-v3-station]"));
      if (!stations.length) return;
      const ys = stations.map((s) => {
        const r = s.getBoundingClientRect();
        return r.top - zr.top + r.height / 2;
      });

      // gently meandering vertical path through every station
      const pts = [0, ...ys];
      let d = `M ${x} 0`;
      let sign = 1;
      for (let i = 1; i < pts.length; i++) {
        const y0 = pts[i - 1];
        const y1 = pts[i];
        const seg = y1 - y0;
        const off = Math.min(26, Math.abs(seg) * 0.08) * sign;
        d += ` C ${x + off} ${y0 + seg * 0.38}, ${x - off} ${y0 + seg * 0.62}, ${x} ${y1}`;
        sign *= -1;
      }
      path.setAttribute("d", d);
      glow.setAttribute("d", d);
      total = path.getTotalLength();

      // sampled monotonic y -> length lookup
      const N = 260;
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
      stationLens = ys.map(lenForY);

      // station nodes (terminal gets a ring)
      clearNodes();
      const NS = "http://www.w3.org/2000/svg";
      ys.forEach((y, i) => {
        const last = i === ys.length - 1;
        if (last) {
          const ring = document.createElementNS(NS, "circle");
          ring.setAttribute("cx", String(x));
          ring.setAttribute("cy", String(y));
          ring.setAttribute("r", "11");
          ring.setAttribute("class", "v3-spine-ring");
          nodesG.appendChild(ring);
        }
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("cx", String(x));
        c.setAttribute("cy", String(y));
        c.setAttribute("r", last ? "5" : "3.5");
        c.setAttribute("class", "v3-spine-node");
        nodesG.appendChild(c);
        nodeEls.push(c);
      });

      path.style.strokeDasharray = String(total);
      glow.style.strokeDasharray = String(total);
      if (reduced) {
        path.style.strokeDashoffset = "0";
        glow.style.strokeDashoffset = "0";
        nodeEls.forEach((c) => c.classList.add("is-lit"));
        cur = total;
      }
    };

    const loop = () => {
      if (active && total > 0) {
        const zr = zone.getBoundingClientRect();
        const tip = window.innerHeight * 0.62;
        const yIn = Math.min(Math.max(tip - zr.top, 0), zone.offsetHeight);
        const target = lenForY(yIn);
        cur += (target - cur) * 0.14;
        if (Math.abs(target - cur) < 0.5) cur = target;
        const off = Math.max(total - cur, 0);
        path.style.strokeDashoffset = String(off);
        glow.style.strokeDashoffset = String(off);
        nodeEls.forEach((c, i) => {
          c.classList.toggle("is-lit", cur >= (stationLens[i] ?? Infinity) - 2);
        });
      }
      raf = requestAnimationFrame(loop);
    };

    rebuild();
    if (!reduced) raf = requestAnimationFrame(loop);

    const ro = new ResizeObserver(() => rebuild());
    ro.observe(zone);
    mq.addEventListener("change", rebuild);
    if (document.fonts) document.fonts.ready.then(() => rebuild()).catch(() => {});

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      mq.removeEventListener("change", rebuild);
    };
  }, [zoneRef, reduced]);

  return (
    <svg ref={svgRef} className="v3-spine" aria-hidden="true" preserveAspectRatio="none" focusable="false">
      <path ref={glowRef} className="v3-spine-glow" />
      <path ref={pathRef} className="v3-spine-path" />
      <g ref={nodesRef} />
    </svg>
  );
}

/* ------------------------------------------------------------------ right-edge progress rail */

function ProgressRail() {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    let fracs: number[] = [];
    let ticks: HTMLDivElement[] = [];
    let raf = 0;

    const rebuild = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-v3-rail]"));
      fracs = sections.map((s) => {
        const top = s.getBoundingClientRect().top + window.scrollY;
        return max > 0 ? Math.min(Math.max(top / max, 0), 1) : 0;
      });
      ticks.forEach((t) => t.remove());
      ticks = fracs.map((f) => {
        const t = document.createElement("div");
        t.className = "v3-rail-tick";
        t.style.top = `${f * 100}%`;
        track.appendChild(t);
        return t;
      });
    };

    const loop = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
      fill.style.transform = `scaleY(${p})`;
      ticks.forEach((t, i) => t.classList.toggle("is-passed", p >= (fracs[i] ?? 1) - 0.002));
      raf = requestAnimationFrame(loop);
    };

    rebuild();
    loop();
    const ro = new ResizeObserver(() => rebuild());
    ro.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      ticks.forEach((t) => t.remove());
    };
  }, []);

  return (
    <div className="v3-rail" aria-hidden="true">
      <div ref={trackRef} className="v3-rail-track">
        <div ref={fillRef} className="v3-rail-fill" />
      </div>
      <span className="v3-rail-word">Route</span>
    </div>
  );
}

/* ------------------------------------------------------------------ contour divider */

function ContourDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div className={`v3-contour${flip ? " is-flip" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1440 170" preserveAspectRatio="none" focusable="false">
        <path d="M-30 138 C 190 96, 420 64, 660 86 C 900 108, 1100 70, 1290 90 C 1380 99, 1430 94, 1470 88" />
        <path d="M-30 110 C 220 64, 460 30, 700 58 C 940 86, 1130 38, 1320 62 C 1400 72, 1440 66, 1480 58" />
        <path className="idx" d="M-30 86 C 250 36, 520 6, 760 36 C 1000 66, 1180 14, 1360 38 C 1420 46, 1450 42, 1480 36" />
        <path d="M 120 170 C 170 118, 290 92, 420 110 C 540 126, 600 158, 612 184" />
        <path d="M 250 170 C 290 138, 370 122, 460 134 C 540 144, 580 160, 588 178" />
        <path d="M 880 170 C 920 122, 1030 96, 1150 112 C 1260 126, 1310 152, 1320 180" />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ banking wall */

function WallDiagram() {
  return (
    <div className="v3-wall-fig" data-v3-reveal>
      <svg viewBox="0 0 560 460" role="img" aria-label="Two routes: company-first is declined at the banking wall; banking-first clears the pass">
        <defs>
          <pattern id="v3-hatch" width="7" height="7" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="0" y2="7" stroke="rgba(239,237,248,0.3)" strokeWidth="1.1" />
          </pattern>
          <linearGradient id="v3-routegrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#b98a3e" />
            <stop offset="1" stopColor="#f4d48e" />
          </linearGradient>
        </defs>

        {/* ridge contours, upper right */}
        <path className="v3-wd-contour" d="M 408 206 C 410 124, 468 70, 548 60" />
        <path className="v3-wd-contour" d="M 432 222 C 430 150, 478 100, 552 92" />
        <path className="v3-wd-contour" d="M 462 238 C 462 178, 502 134, 560 126" />

        {/* the banking wall */}
        <g transform="rotate(6 330 200)">
          <rect x="318" y="72" width="22" height="256" fill="url(#v3-hatch)" opacity="0.55" />
          <line className="v3-wd-wall-edge" x1="318" y1="72" x2="318" y2="328" />
          <line className="v3-wd-wall-edge" x1="340" y1="72" x2="340" y2="328" />
        </g>
        <text className="v3-svg-label" x="348" y="52" textAnchor="middle">
          THE BANKING WALL
        </text>

        {/* company-first: dashed, declined */}
        <path className="v3-wd-routea" d="M 64 408 C 150 386, 214 352, 254 308 C 282 277, 298 246, 308 218" />
        <g className="v3-wd-cross">
          <line x1="302" y1="200" x2="316" y2="214" className="v3-wd-cross" />
          <line x1="316" y1="200" x2="302" y2="214" className="v3-wd-cross" />
        </g>
        <text className="v3-svg-label" x="288" y="186" textAnchor="end">
          DECLINED AT COMPLIANCE
        </text>
        <text className="v3-svg-label" x="118" y="316">
          COMPANY-FIRST
        </text>

        {/* banking-first: gold, draws itself through the pass */}
        <path className="v3-wd-routeb" d="M 64 408 C 170 402, 260 392, 318 352 C 372 315, 350 268, 396 232 C 438 199, 478 166, 500 112" />
        <circle cx="64" cy="408" r="3" fill="rgba(239,237,248,0.5)" />
        <text className="v3-svg-label" x="78" y="434">
          EVERY MANDATE STARTS HERE
        </text>
        <circle cx="500" cy="112" r="4.5" fill="#e3b564" />
        <circle cx="500" cy="112" r="10" fill="none" stroke="rgba(227,181,100,0.4)" strokeWidth="1" />
        <text className="v3-svg-label gold" x="486" y="94" textAnchor="end">
          BANKING-FIRST · ACCOUNT LIVE
        </text>
      </svg>
    </div>
  );
}

function WallSection() {
  return (
    <section id="v3-wall" className="v3-section">
      <div className="v3-wrap">
        <div className="v3-wall-grid">
          <div>
            <div data-v3-reveal>
              <p className="v3-label">The banking wall</p>
              <h2 className="v3-h2">
                Everyone sells the company first. <em className="v3-em">Then the bank says no.</em>
              </h2>
              <p className="v3-lead">
                The licence was never the hard step — the account is. Source of funds, residency
                status, structure: get the sequence wrong and the bank declines an application
                that was honest from day one. So we run the route in the other direction and
                clear the hardest gate before anything else moves.
              </p>
            </div>
            <div data-v3-reveal style={dly(120)}>
              <div className="v3-wallnum">
                <span className="v3-stat-aff">~</span>30<span className="v3-stat-aff">%</span>
              </div>
              <p className="v3-wall-cap">of honest applications are declined when the company comes first.</p>
              <span className="v3-source">WTP pre-screen data</span>
            </div>
          </div>
          <WallDiagram />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ method stations */

const STATIONS = [
  {
    n: "01",
    name: "Bank",
    line: "Banking",
    slug: "banking",
    body:
      "A pre-screen and a Banking Roadmap before anything else moves — a named bank, a named officer, a realistic timeline. The account is the gate; we clear it first.",
    meta: "L0 free · Banking Roadmap in 5–7 days",
    src: "L0 pre-screen",
  },
  {
    n: "02",
    name: "Company",
    line: "Business Setup",
    slug: "business-setup",
    body:
      "The entity comes second, built to be banked. Mainland, free zone or DIFC — chosen for bankability and substance, not for whoever sells the fastest licence.",
    meta: "L2 · $5–15K",
    src: "",
  },
  {
    n: "03",
    name: "Visa",
    line: "Residency & Visa",
    slug: "residency-visa",
    body:
      "Residency sequenced so it reinforces the structure instead of fighting it — Golden Visa where your assets support it, standard residency where they don't.",
    meta: "L2–L3 · investment routes from AED 2M",
    src: "UAE Golden Visa rules",
  },
  {
    n: "04",
    name: "Assets",
    line: "Assets & Wealth",
    slug: "assets-wealth",
    body:
      "Real estate, investment accounts and digital assets brought under one coherent compliance contour — including the VARA-regulated side most advisors avoid.",
    meta: "L3 · $15–50K",
    src: "",
  },
];

function MethodSection() {
  return (
    <section id="v3-method" className="v3-section" data-v3-rail>
      <div className="v3-wrap">
        <header className="v3-shead" data-v3-reveal>
          <p className="v3-label">The Banking-First method</p>
          <h2 className="v3-h2">
            Bank → Company → Visa → Assets. <em className="v3-em">The order is the method.</em>
          </h2>
          <p className="v3-lead">
            Each station de-risks the next, and one team is accountable for the whole route —
            no hand-offs, no "talk to our banking partner".
          </p>
        </header>

        <div className="v3-stations">
          {STATIONS.map((st) => (
            <article key={st.slug} className="v3-station-row" data-v3-station>
              <div className="v3-station-num" aria-hidden="true" data-v3-reveal>
                {st.n}
              </div>
              <div data-v3-reveal style={dly(110)}>
                <h3 className="v3-h3">{st.name}</h3>
                <p className="v3-station-text">{st.body}</p>
                <div className="v3-station-meta">
                  <span className="v3-meta">{st.meta}</span>
                  {st.src && <span className="v3-source">{st.src}</span>}
                  <Link to={`/services/${st.slug}`} className="v3-quiet-link">
                    {st.line} <ArrowRight size={13} aria-hidden />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ services bento */

const BENTO: Record<string, { cls: string; price: string }> = {
  banking: { cls: "is-a", price: "L0 free · L1 $1.5–3K" },
  "business-setup": { cls: "is-b", price: "L2 · $5–15K" },
  "residency-visa": { cls: "is-c", price: "L2 $5–15K · L3 $15–50K" },
  "assets-wealth": { cls: "is-d", price: "L3 · $15–50K" },
};

const LADDER = [
  { tier: "L0", name: "Pre-screen + Banking Roadmap", price: "Free", note: "5–7 days" },
  { tier: "L1", name: "Banking", price: "$1.5–3K", note: "Account opened" },
  { tier: "L2", name: "Setup + Banking", price: "$5–15K", note: "Company built to be banked" },
  { tier: "L3", name: "Full relocation", price: "$15–50K", note: "Bank → company → visa → assets" },
];

function ServicesSection() {
  return (
    <section id="v3-services" className="v3-section" data-v3-rail>
      <div className="v3-wrap">
        <div className="v3-services-head" data-v3-reveal>
          <div>
            <p className="v3-label">Four service lines</p>
            <h2 className="v3-h2">
              Engage at <em className="v3-em">the depth you need.</em>
            </h2>
          </div>
          <span className="v3-meta">Priced as levels, L0–L3. Every mandate starts at L0 — free.</span>
        </div>

        <div className="v3-bento">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              className={`v3-cell ${BENTO[s.slug]?.cls ?? "is-b"}`}
              data-v3-reveal
              style={dly(i * 90)}
            >
              {s.slug === "banking" && (
                <svg className="v3-cell-topo" viewBox="0 0 300 220" aria-hidden="true" focusable="false">
                  <path d="M 30 220 C 60 140, 140 96, 240 104 C 290 108, 310 130, 316 150" />
                  <path d="M 80 220 C 104 168, 168 134, 246 140 C 286 144, 302 158, 306 172" />
                  <path d="M 130 220 C 148 190, 196 168, 252 172 C 282 175, 296 184, 298 192" />
                </svg>
              )}
              <div className="v3-cell-top">
                <span className="v3-cell-line">{s.line}</span>
                <span className="v3-chip">{s.tierRange}</span>
              </div>
              <h3 className="v3-cell-h">{s.outcomeHeadline}</h3>
              <p className="v3-cell-sub">{s.subhead}</p>
              {s.slug === "banking" && (
                <ul className="v3-cell-list">
                  {s.deliverables.slice(0, 4).map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
              <div className="v3-cell-foot">
                <span className="v3-cell-price">{BENTO[s.slug]?.price}</span>
                <span className="v3-cell-go">
                  Explore <ArrowRight size={14} aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="v3-ladder" data-v3-reveal>
          <div className="v3-ladder-head">
            <p className="v3-label">Engagement ladder</p>
            <span className="v3-meta">Step off wherever the structure is done.</span>
          </div>
          <div className="v3-ladder-grid">
            {LADDER.map((l) => (
              <div key={l.tier} className="v3-rung">
                <div className="v3-rung-tier">{l.tier}</div>
                <div className="v3-rung-name">{l.name}</div>
                <div className="v3-rung-price">{l.price}</div>
                <div className="v3-rung-note">{l.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ segments */

const SEGMENTS = [
  {
    name: "UK non-dom",
    href: "/who-we-help/uk-non-dom",
    desc: "The non-dom regime is gone. What replaces it is your decision — make it before the next tax year makes it for you.",
  },
  {
    name: "DACH exit tax",
    href: "/who-we-help/dach-exit-tax",
    desc: "Exit tax crystallises the day you leave. The order of operations decides what it costs.",
  },
  {
    name: "NL Box 3",
    href: "/who-we-help/nl-box3",
    desc: "Box 3 taxes returns you may never see. Relocation re-bases the whole equation.",
  },
  {
    name: "For partners",
    href: "/partners",
    desc: "Advisors, lawyers, family offices — plug your clients into our banking desk and keep the relationship.",
  },
];

function SegmentsSection() {
  return (
    <section id="v3-segments" className="v3-section" data-v3-rail>
      <div className="v3-wrap">
        <header className="v3-shead" data-v3-reveal>
          <p className="v3-label">Who we help</p>
          <h2 className="v3-h2">
            Built for the exits <em className="v3-em">people are actually making.</em>
          </h2>
        </header>
        <div>
          {SEGMENTS.map((s, i) => (
            <Link key={s.href} to={s.href} className="v3-seg" data-v3-reveal style={dly(i * 80)}>
              <span className="v3-seg-name">{s.name}</span>
              <span className="v3-seg-desc">{s.desc}</span>
              <span className="v3-seg-arrow" aria-hidden="true">
                <ArrowRight size={18} strokeWidth={1.8} />
              </span>
            </Link>
          ))}
        </div>
        <p className="v3-seg-note" data-v3-reveal>
          Spanning two of these? The pre-screen sorts it.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ experts */

function ExpertsSection() {
  const team = [experts.ivan, experts.oleg, experts.olya];
  return (
    <section id="v3-experts" className="v3-section" data-v3-rail>
      <div className="v3-wrap">
        <div className="v3-experts-grid">
          <header data-v3-reveal>
            <p className="v3-label">Named, accountable</p>
            <h2 className="v3-h2">
              The people <em className="v3-em">on your mandate.</em>
            </h2>
            <p className="v3-lead">
              No anonymous "our specialists". Every page of this site — and every mandate —
              carries a named expert who answers for the outcome.
            </p>
          </header>
          <div>
            {team.map((e, i) => (
              <div key={e.id} className="v3-expert" data-v3-reveal style={dly(i * 100)}>
                {e.photo ? (
                  <img className="v3-expert-photo" src={e.photo} alt={e.name} loading="lazy" />
                ) : (
                  <span className="v3-monogram" aria-hidden="true">
                    {e.initials}
                  </span>
                )}
                <div>
                  <h3 className="v3-expert-name">{e.name}</h3>
                  <p className="v3-expert-title">{e.title}</p>
                  <p className="v3-expert-cred">{e.credibility}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ final CTA */

function FinalCTA() {
  return (
    <section id="v3-cta" className="v3-cta" data-v3-rail>
      <div className="v3-wrap">
        <div className="v3-cta-inner" data-v3-station>
          <div data-v3-reveal>
            <p className="v3-label">Level 0 · free</p>
            <h2 className="v3-cta-h">
              Know you're bankable — <em className="v3-em">before you spend a dirham.</em>
            </h2>
            <p className="v3-cta-p">
              Tell us where your wealth sits today. In 5–7 days you get a Banking Roadmap — a
              named bank, a named officer, a realistic timeline. And if we can't bank you, we
              tell you that too. At L0, for free.
            </p>
            <div className="v3-cta-btns">
              <Link to="/contact" className="v3-btn">
                Book a free pre-screen <ArrowRight size={15} strokeWidth={2.2} aria-hidden />
              </Link>
              <Link to="/banking-first" className="v3-btn v3-btn-ghost">
                How Banking-First works
              </Link>
            </div>
            <p className="v3-cta-meta">
              <span>Free L0 pre-screen</span>
              <i>·</i>
              <span>Roadmap in 5–7 days</span>
              <i>·</i>
              <span>No obligation</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ footer */

function V3Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-wrap">
        <div className="v3-footer-grid">
          <div>
            <span className="v3-wordmark">
              WTP<b>.</b>
            </span>
            <p className="v3-footer-tag">Banking-first wealth relocation to the UAE.</p>
            <p className="v3-footer-spine">
              <b>1</b> Bank → <b>2</b> Company → <b>3</b> Visa → <b>4</b> Assets
            </p>
          </div>
          <nav aria-label="Page sections">
            <p className="v3-foot-label">On this page</p>
            <div className="v3-foot-links">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href}>
                  {l.label}
                </a>
              ))}
            </div>
          </nav>
          <nav aria-label="Next step">
            <p className="v3-foot-label">Next step</p>
            <div className="v3-foot-links">
              <Link to="/contact">Book a free pre-screen</Link>
              <Link to="/banking-first">The Banking-First method</Link>
              <Link to="/partners">For partners</Link>
            </div>
          </nav>
        </div>
        <div className="v3-footer-base">
          <span>© 2026 WTP. All rights reserved.</span>
          <span>Every number on this page carries its source.</span>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ page */

export default function V3Page() {
  useGoogleFonts();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const zoneRef = useRef<HTMLDivElement>(null);

  // one-shot reveals + count-up
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const reducedNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = Array.from(root.querySelectorAll<HTMLElement>("[data-v3-reveal]"));
    let io: IntersectionObserver | null = null;
    if (reducedNow) {
      els.forEach((el) => el.classList.add("is-in"));
    } else {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add("is-in");
              io?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -7% 0px" }
      );
      els.forEach((el) => io?.observe(el));
    }

    const counters = Array.from(root.querySelectorAll<HTMLElement>("[data-v3-count]"));
    let cio: IntersectionObserver | null = null;
    const runCount = (el: HTMLElement) => {
      const target = parseFloat(el.getAttribute("data-v3-count") || "0");
      const t0 = performance.now();
      const D = 1400;
      const tick = (now: number) => {
        const t = Math.min((now - t0) / D, 1);
        const e = 1 - Math.pow(1 - t, 3);
        el.textContent = String(Math.round(target * e));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    if (reducedNow) {
      counters.forEach((el) => {
        el.textContent = el.getAttribute("data-v3-count");
      });
    } else {
      cio = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              runCount(en.target as HTMLElement);
              cio?.unobserve(en.target);
            }
          });
        },
        { threshold: 0.5 }
      );
      counters.forEach((el) => cio?.observe(el));
    }

    return () => {
      io?.disconnect();
      cio?.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="v3-root">
      <a className="v3-skip" href="#v3-main">
        Skip to content
      </a>
      <V3Nav />

      <main id="v3-main">
        <V3Hero reduced={reduced} />
        <StatsBand />

        <div className="v3-zone" ref={zoneRef}>
          <RouteSpine zoneRef={zoneRef} reduced={reduced} />
          <WallSection />
          <MethodSection />
          <ContourDivider />
          <ServicesSection />
          <SegmentsSection />
          <ExpertsSection />
          <ContourDivider flip />
          <FinalCTA />
        </div>
      </main>

      <V3Footer />
      <ProgressRail />
    </div>
  );
}
