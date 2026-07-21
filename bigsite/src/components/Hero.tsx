import { useEffect, useRef } from "react";
import { Button } from "./ui";
import { useLang } from "../i18n/lang";

// Scroll-scrub route reveal. Frames are pre-decoded JPEGs drawn to <canvas> via drawImage
// (synchronous, ~2ms each) — NOT a <video> seeked by currentTime. Seeking video on scroll
// stutters badly on mobile (async seek + per-frame GPU re-upload); drawImage of a decoded
// image does not. Same pixels, same scroll-linked animation, smooth on phones.

const FRAME_COUNT = 61; // public/hero/frames/r_001.jpg .. r_061.jpg (every 2nd source frame)
const frameUrl = (i: number) => `/hero/frames/r_${String(i + 1).padStart(3, "0")}.jpg`;

const beats = [
  { in: 0, out: 0.3 },
  { in: 0.34, out: 0.7 },
  { in: 0.74, out: 1.01 },
];

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lang = useLang();

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    const fill = fillRef.current;
    if (!stage || !canvas || !fill) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Progressive frame loading. Eagerly fetching all frames (~3MB of jpeg) on mount starves
    // fonts/CSS on mobile connections and pushes FCP/LCP past 4s — so only the frame the
    // resting hero actually shows loads now; the rest wait for window load or first scroll,
    // whichever comes first. drawIndex falls back to the nearest loaded frame meanwhile.
    const images: HTMLImageElement[] = [];
    const loadFrame = (i: number) => {
      if (images[i]) return;
      const img = new Image();
      img.decoding = "async";
      img.src = frameUrl(i);
      images[i] = img;
    };
    loadFrame(reduced ? FRAME_COUNT - 1 : 0);
    let warmed = false;
    const warm = () => {
      if (warmed) return;
      warmed = true;
      for (let i = 0; i < FRAME_COUNT; i++) loadFrame(i);
    };
    const warmSoon = () => setTimeout(warm, 200);
    if (document.readyState === "complete") warmSoon();
    else window.addEventListener("load", warmSoon, { once: true });
    window.addEventListener("scroll", warm, { once: true, passive: true });
    const ready = (i: number) => !!images[i] && images[i].complete && images[i].naturalWidth > 0;

    let dpr = 1, cw = 0, ch = 0, raf = 0, lastDrawn = -1, cur = 0;

    // cover-fit the 1280x720 frame into the viewport at objectPosition ~60% 50% (matches old video)
    const drawCover = (img: HTMLImageElement) => {
      const fw = img.naturalWidth, fh = img.naturalHeight;
      const scale = Math.max(cw / fw, ch / fh);
      const dw = fw * scale, dh = fh * scale;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - dw) * 0.6, (ch - dh) * 0.5, dw, dh);
    };
    const drawIndex = (idx: number) => {
      let di = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
      while (di > 0 && !ready(di)) di--; // fall back to nearest loaded frame while preloading
      if (!ready(di) || di === lastDrawn) return;
      drawCover(images[di]);
      lastDrawn = di;
    };

    const resize = () => {
      dpr = Math.min(devicePixelRatio || 1, 2);
      cw = canvas.clientWidth || window.innerWidth;
      ch = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.round(cw * dpr);
      canvas.height = Math.round(ch * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      lastDrawn = -1; // force a redraw at the new size
    };

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

    resize();
    window.addEventListener("resize", resize, { passive: true });

    if (reduced) {
      // static hero: paint the fully-drawn route (last frame) once it has loaded
      const paintStatic = () => {
        if (ready(FRAME_COUNT - 1)) { drawCover(images[FRAME_COUNT - 1]); lastDrawn = FRAME_COUNT - 1; }
        else raf = requestAnimationFrame(paintStatic);
      };
      paintStatic();
    } else {
      const loop = () => {
        const p = progress();
        cur += (p - cur) * 0.18;
        drawIndex(Math.round(cur * (FRAME_COUNT - 1)));
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
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("load", warmSoon);
      window.removeEventListener("scroll", warm);
    };
  }, []);

  const t = lang === "ru"
    ? {
        b0eyebrow: "Бэк-офис для частного капитала",
        b0hA: "Бэк-офис для ",
        b0hB: "частного капитала.",
        b0p: "Сдержанная команда, которая ведёт банкинг, структуры, резидентство и наследование капитала — чтобы он продолжал работать, тихо.",
        b0quiet: "Мы создаём банкабельные структуры, а не открываем компании.",
        b1eyebrow: "Почему мы",
        b1hA: "Проходим комплаенс, который ",
        b1hB: "не пройдут другие.",
        // ВЫЧИТКА ОЛЕ: banking-decline + source-of-funds claim
        b1p: "Происхождение средств, структура, резидентство — вопросы, из-за которых честным деньгам отказывают. Закрыть их — в этом всё ремесло.",
        b2eyebrow: "Одна ответственная команда",
        b2hA: "Ваша структура — ",
        b2hB: "от и до.",
        b2p: "Банкинг, компания, резидентство и активы — в руках одной ответственной команды.",
        ctaPrimary: "Записаться на пре-скрининг",
        ctaSecondary: "Как это работает",
        // ВЫЧИТКА ОЛЕ: banking substantiation stat (accounts opened)
        stat1: "открытых счетов в ОАЭ",
        // ВЫЧИТКА ОЛЕ: banking substantiation stat (working-account rate)
        stat2: "доходят до работающего счёта",
        noPitch: "Без продаж. Если мы не сможем взяться за ваш случай — скажем прямо.",
        route: "Маршрут",
      }
    : {
        b0eyebrow: "The back office for private wealth",
        b0hA: "The back office for ",
        b0hB: "private wealth.",
        b0p: "The discreet team that runs a fortune's banking, structures, residency and succession — so it keeps working, quietly.",
        b0quiet: "We deliver bankable structures, not company setups.",
        b1eyebrow: "Why us",
        b1hA: "We clear the compliance ",
        b1hB: "others can't.",
        b1p: "Source of funds, structure, residency — the questions that get honest money declined. Closing them is the whole craft.",
        b2eyebrow: "One accountable team",
        b2hA: "Your structure, ",
        b2hB: "end to end.",
        b2p: "Banking, company, residency and assets — under one accountable team.",
        ctaPrimary: "Request a Pre-Screen",
        ctaSecondary: "How it works",
        stat1: "UAE accounts opened",
        stat2: "reach a working account",
        noPitch: "No pitch. If we can't take your case, we'll tell you.",
        route: "Route",
      };

  return (
    <div ref={stageRef} className="hero-stage" style={{ position: "relative", height: "420vh" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: "#06050f" }}>
        {/* Static first frame in the HTML so the browser paints the hero (the LCP element)
            straight from markup, long before JS boots; the canvas draws the same pixels
            over it once React mounts, so the swap is invisible. */}
        <img
          src={frameUrl(0)}
          alt=""
          fetchPriority="high"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% 50%", zIndex: 0 }}
        />
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0, display: "block" }}
        />

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
              eyebrow: t.b0eyebrow,
              h: (
                <>
                  {t.b0hA}<span className="g">{t.b0hB}</span>
                </>
              ),
              p: t.b0p,
              quiet: t.b0quiet,
              cta: true,
            },
            {
              eyebrow: t.b1eyebrow,
              h: (
                <>
                  {t.b1hA}<span className="g">{t.b1hB}</span>
                </>
              ),
              p: t.b1p,
              cta: false,
            },
            {
              eyebrow: t.b2eyebrow,
              h: (
                <>
                  {t.b2hA}<span className="g">{t.b2hB}</span>
                </>
              ),
              p: t.b2p,
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
                    <>
                      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                        <Button to="/contact">{t.ctaPrimary}</Button>
                        <Button to="/banking-first" ghost>
                          {t.ctaSecondary}
                        </Button>
                      </div>
                      {i === 0 && (
                        <p style={{ marginTop: 18, fontSize: 13, color: "var(--ink-70)", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                          <span><strong className="g" style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>100+</strong> {t.stat1}</span>
                          <span aria-hidden style={{ width: 1, height: 12, background: "var(--line)" }} />
                          <span><strong className="g" style={{ fontFamily: "var(--font-display)", fontSize: 15 }}>90%+</strong> {t.stat2}</span>
                        </p>
                      )}
                      <p style={{ marginTop: 14, fontSize: 13.5, color: "var(--ink-55)" }}>
                        {t.noPitch}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* route progress rail — hidden on narrow viewports (see .hero-route-rail
            in index.css); below ~1080px the hero copy column reaches right:26 and
            the rail would slice through the headline, stats and taglines. */}
        <div className="hero-route-rail" style={{ position: "fixed", right: 26, top: "50%", transform: "translateY(-50%)", zIndex: 7, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ width: 2, height: 150, background: "rgba(237,235,246,.16)", borderRadius: 2, overflow: "hidden", position: "relative" }}>
            <div ref={fillRef} style={{ position: "absolute", top: 0, left: 0, right: 0, height: "0%", background: "var(--gold-grad)" }} />
          </div>
          <div style={{ writingMode: "vertical-rl", fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "var(--ink-40)" }}>{t.route}</div>
        </div>
      </div>
    </div>
  );
}
