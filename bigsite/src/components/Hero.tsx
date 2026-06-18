import { useEffect, useRef } from "react";
import { Button } from "./ui";
import { useThemeId } from "../theme/ThemedRoute";

// Port of the LOCKED scroll-scrub video hero (hero-video-scroll/index.html).
// Route draws itself across a generated 3D relief as you scroll. Requires HTTP Range
// (CF Pages native; local dev = vite serves Range fine).

const beats = [
  { in: 0, out: 0.3 },
  { in: 0.34, out: 0.7 },
  { in: 0.74, out: 1.01 },
];

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const vidRef = useRef<HTMLVideoElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Daylight theme gets its own regenerated asset (same choreography, light grade)
  const daylight = useThemeId() === "v4";
  const vidSrc = daylight ? "/hero/route-light.mp4" : "/hero/route.mp4";
  const vidPoster = daylight ? "/hero/poster-light.png" : "/hero/poster.png";

  useEffect(() => {
    const stage = stageRef.current;
    const vid = vidRef.current;
    const fill = fillRef.current;
    if (!stage || !vid || !fill) return;

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
    const f = 0.05;
    const bump = (p: number, a: number, b: number) => {
      return Math.min(smooth(a, a + f, p), 1 - smooth(b - f, b, p));
    };
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
      fill.style.height = p * 100 + "%";
      beatRefs.current.forEach((b, i) => {
        if (!b) return;
        // Beat 0 (H1 + offer + CTA) is visible at rest so the page states its value on first
        // paint, before any scroll; it only fades OUT as beat 1 takes over. Beats 1-2 cross-fade in.
        const op = i === 0 ? 1 - smooth(beats[0].out - f, beats[0].out, p) : bump(p, beats[i].in, beats[i].out);
        b.style.opacity = String(op);
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      vid.removeEventListener("loadedmetadata", onMeta);
    };
  }, [vidSrc]);

  return (
    <div ref={stageRef} className="hero-stage" style={{ position: "relative", height: "420vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <video
          key={vidSrc}
          ref={vidRef}
          muted
          playsInline
          preload="auto"
          poster={vidPoster}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 50%", zIndex: 0 }}
        >
          <source src={vidSrc} type="video/mp4" />
        </video>

        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "radial-gradient(72% 96% at 22% 50%, rgba(6,5,18,.9), rgba(6,5,18,.34) 44%, rgba(6,5,18,0) 72%), linear-gradient(90deg, rgba(6,5,18,.84) 0%, rgba(6,5,18,.3) 36%, rgba(6,5,18,0) 60%)",
          }}
        />

        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}>
          {[
            {
              eyebrow: "We've surveyed the terrain",
              h: (
                <>
                  We've mapped the <span className="g">only route through.</span>
                </>
              ),
              p: "Most routes to a UAE-centered structure dead-end at the bank. Scroll — and watch the route draw itself.",
              quiet: "We deliver bankable structures, not company setups.",
              cta: true,
            },
            {
              eyebrow: "The banking ridge",
              h: (
                <>
                  Banking is the <span className="g">wall everyone hits.</span>
                </>
              ),
              p: "Form the company first and the bank says no — about a third of corporate applications are declined. We cross at the one pass.",
              cta: false,
            },
            {
              eyebrow: "The hub",
              h: (
                <>
                  Your structure, <span className="g">end to end.</span>
                </>
              ),
              p: "Banking, company, residency and assets — under one accountable team.",
              cta: true,
            },
          ].map((b, i) => (
            <div
              key={i}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", width: "100%", opacity: i === 0 ? 1 : 0 }}
            >
              <div className="wrap">
                <div style={{ maxWidth: 560, pointerEvents: "auto" }}>
                  <span className="eyebrow" style={{ marginBottom: 20 }}>
                    {b.eyebrow}
                  </span>
                  {i === 0 ? (
                    <h1 className="h-grad" style={{ fontSize: "clamp(38px,5.6vw,72px)", margin: "20px 0", letterSpacing: "-0.03em" }}>
                      {b.h}
                    </h1>
                  ) : (
                    <h2 className="h-grad" style={{ fontSize: "clamp(38px,5.6vw,72px)", margin: "20px 0", letterSpacing: "-0.03em" }}>
                      {b.h}
                    </h2>
                  )}
                  <p style={{ fontSize: "clamp(16px,1.5vw,19px)", color: "var(--ink-70)", maxWidth: 460, marginBottom: 26 }}>{b.p}</p>
                  {b.quiet && (
                    <p style={{ marginTop: 6, fontSize: 13.5, color: "var(--ink-55)", display: "flex", alignItems: "center", gap: 9 }}>
                      <span style={{ width: 22, height: 1, background: "var(--gold)" }} />
                      {b.quiet}
                    </p>
                  )}
                  {b.cta && (
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                      <Button to="/contact">Book a free pre-screen</Button>
                      <Button to="/banking-first" ghost>
                        How it works
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* route progress rail */}
        <div style={{ position: "fixed", right: 26, top: "50%", transform: "translateY(-50%)", zIndex: 7, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 2, height: 150, background: "rgba(237,235,246,.16)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
            <div ref={fillRef} style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0%", background: "var(--gold-grad)" }} />
          </div>
          <div style={{ writingMode: "vertical-rl", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "var(--ink-40)" }}>Route</div>
        </div>
      </div>
    </div>
  );
}
