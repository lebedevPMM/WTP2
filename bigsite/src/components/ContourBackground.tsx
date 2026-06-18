import { memo, useEffect, useRef } from "react";

/**
 * Living contour-map background — the Surveyor's Midnight signature.
 *
 * Ported 1:1 from the v5 static prototype (site.js). A survey-relief watermark
 * that drifts slower than the page (parallax) while a gold light-band travels
 * the engraved lines (the «перелив»). Echo of the Hero.
 *
 * White-out-safe BY CONSTRUCTION: the `.topo` host is `position:sticky` +
 * `isolation:isolate`, and the gold "lighter" compositing happens INSIDE the
 * canvas 2d context only — never a CSS `mix-blend-mode`/`backdrop-filter` over
 * content (that was the v5 white-out culprit). One offscreen marching-squares
 * plate is built once; each frame blits a parallax slice + one clipped stroke.
 *
 * Mounts once in Layout and persists across route changes (never re-renders).
 */
function ContourBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Prod base is the v3 dark theme; the daylight (v4) palette is dev-gated.
    const day = document.documentElement.getAttribute("data-theme") === "v4";
    const P = day
      ? { line: "rgba(154,116,52,0.13)", idx: "rgba(154,116,52,0.21)", hi: "rgba(154,116,52,0.42)", hi0: "rgba(154,116,52,0)", comp: "source-over" as GlobalCompositeOperation }
      : { line: "rgba(227,181,100,0.085)", idx: "rgba(227,181,100,0.15)", hi: "rgba(244,212,142,0.50)", hi0: "rgba(244,212,142,0)", comp: "lighter" as GlobalCompositeOperation };

    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;
    const PF = 0.1;
    let dpr = 1, W = 0, H = 0, FH = 0, raf = 0;
    let pThin = new Path2D(), pIdx = new Path2D();
    let alive = true;
    let rt: number | undefined;

    const maxScroll = () => Math.max(document.documentElement.scrollHeight - innerHeight, 1);

    // domain-warped sum-of-sines scalar field → organic survey contours
    const fld = (x: number, y: number) => {
      const wx = Math.sin(y * 0.0062 + 1.3) * 40 + Math.sin(y * 0.0129 - 0.4) * 15;
      const wy = Math.sin(x * 0.0051 - 0.7) * 30;
      return Math.sin((x + wx) * 0.009) + Math.sin((y + wy) * 0.0075 + x * 0.001)
        + 0.78 * Math.sin(Math.hypot(x - W * 0.72, y - FH * 0.3) * 0.0063)
        + 0.66 * Math.sin(Math.hypot(x - W * 0.2, y - FH * 0.72) * 0.0069);
    }

    // build the full-height engraving ONCE to an offscreen plate (thin + bold index paths)
    const plate = () => {
      off.width = Math.max(1, Math.round(W * dpr));
      off.height = Math.max(1, Math.round(FH * dpr));
      octx.setTransform(dpr, 0, 0, dpr, 0, 0);
      octx.clearRect(0, 0, W, FH);
      const g = 22, cols = Math.ceil(W / g) + 1, rows = Math.ceil(FH / g) + 1;
      const v = new Float32Array(cols * rows);
      let i = 0, j = 0;
      for (j = 0; j < rows; j++) for (i = 0; i < cols; i++) v[j * cols + i] = fld(i * g, j * g);
      const levels = [-2.1, -1.5, -0.9, -0.3, 0.3, 0.9, 1.5, 2.1];
      pThin = new Path2D();
      pIdx = new Path2D();
      const ip = (a: number, b: number, L: number) => (L - a) / (b - a);
      levels.forEach((L, li) => {
        const pth = li % 2 === 0 ? pIdx : pThin;
        for (j = 0; j < rows - 1; j++) for (i = 0; i < cols - 1; i++) {
          const a = v[j * cols + i], b = v[j * cols + i + 1], c = v[(j + 1) * cols + i + 1], d = v[(j + 1) * cols + i];
          const x0 = i * g, y0 = j * g, x1 = x0 + g, y1 = y0 + g;
          const k = (a > L ? 1 : 0) | (b > L ? 2 : 0) | (c > L ? 4 : 0) | (d > L ? 8 : 0);
          if (k === 0 || k === 15) continue;
          const T = { x: x0 + ip(a, b, L) * g, y: y0 };
          const R = { x: x1, y: y0 + ip(b, c, L) * g };
          const B = { x: x0 + ip(d, c, L) * g, y: y1 };
          const Lp = { x: x0, y: y0 + ip(a, d, L) * g };
          const s = (p: { x: number; y: number }, q: { x: number; y: number }) => { pth.moveTo(p.x, p.y); pth.lineTo(q.x, q.y); };
          switch (k) {
            case 1: case 14: s(Lp, T); break;
            case 2: case 13: s(T, R); break;
            case 3: case 12: s(Lp, R); break;
            case 4: case 11: s(R, B); break;
            case 5: s(Lp, T); s(R, B); break;
            case 6: case 9: s(T, B); break;
            case 7: case 8: s(Lp, B); break;
            case 10: s(T, R); s(Lp, B); break;
          }
        }
      });
      octx.strokeStyle = P.line; octx.lineWidth = 1; octx.stroke(pThin);
      octx.strokeStyle = P.idx; octx.lineWidth = 1.25; octx.stroke(pIdx);
    }

    const drawLight = (sx: number, sy: number, isStatic: boolean) => {
      const off1 = isStatic ? 0 : Math.min(Math.max(scrollY * PF, 0), Math.max(FH - H, 0));
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, Math.round(off1 * dpr), Math.round(W * dpr), Math.round(H * dpr), 0, 0, W, H);
      ctx.save();
      ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.clip(); // bound the stroke raster to the viewport
      ctx.translate(0, -off1);
      const sf = off1 + sy, Rr = Math.max(W, H) * 0.42;
      const rg = ctx.createRadialGradient(sx, sf, 0, sx, sf, Rr);
      rg.addColorStop(0, P.hi); rg.addColorStop(1, P.hi0);
      ctx.globalCompositeOperation = P.comp; ctx.strokeStyle = rg;
      ctx.lineWidth = day ? 1.4 : 1.3; ctx.stroke(pIdx); ctx.stroke(pThin);
      ctx.restore();
    }

    const size = () => {
      dpr = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
      FH = H + maxScroll() * PF + 240;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      plate();
      if (reduced) drawLight(W * 0.6, H * 0.42, true);
    }

    const frame = (now: number) => {
      const prog = scrollY / maxScroll();
      const sy = H * (0.12 + prog * 0.66) + Math.sin(now * 0.00045) * 40;
      const sx = W * (0.6 + Math.sin(now * 0.0003) * 0.05);
      drawLight(sx, sy, false);
      raf = requestAnimationFrame(frame);
    }

    const onResize = () => { clearTimeout(rt); rt = window.setTimeout(size, 160); };

    size();
    addEventListener("resize", onResize, { passive: true });
    // re-plate when the document height changes on route navigation (SPA: Layout persists)
    const ro = "ResizeObserver" in window ? new ResizeObserver(onResize) : null;
    ro?.observe(document.body);
    if (document.fonts?.ready) document.fonts.ready.then(() => { if (alive) size(); }).catch(() => {});
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      clearTimeout(rt);
      removeEventListener("resize", onResize);
      ro?.disconnect();
    };
  }, []);

  return (
    <div className="topo" aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

export default memo(ContourBackground);
