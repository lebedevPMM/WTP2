import { useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

/** Live `prefers-reduced-motion` flag. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState<boolean>(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

interface InViewOptions {
  threshold?: number;
  rootMargin?: string;
  /** Disconnect after first intersection (default true). */
  once?: boolean;
}

/** IntersectionObserver as a hook. Returns [ref, inView]. */
export function useInView<T extends Element>(
  options?: InViewOptions
): [RefObject<T | null>, boolean] {
  const { threshold = 0.2, rootMargin = "0px 0px -6% 0px", once = true } = options ?? {};
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) io.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin, once]);

  return [ref, inView];
}

/**
 * 0→1 progress driven by requestAnimationFrame (ease-out cubic), started when
 * `active` flips true. Runs once. Jumps straight to 1 for reduced motion.
 */
export function useProgress(
  active: boolean,
  reduced: boolean,
  duration = 950,
  delay = 0
): number {
  const [progress, setProgress] = useState(() => (reduced ? 1 : 0));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (reduced) {
      setProgress(1);
      return;
    }

    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - t0 - delay) / duration));
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, reduced, duration, delay]);

  // If the user enables reduced motion mid-flight, settle immediately.
  useEffect(() => {
    if (reduced && startedRef.current) setProgress(1);
  }, [reduced]);

  return progress;
}

/** Ticking Gulf Standard Time clock (Asia/Dubai), HH:MM:SS. */
export function useGstClock(): string {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Asia/Dubai",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}
