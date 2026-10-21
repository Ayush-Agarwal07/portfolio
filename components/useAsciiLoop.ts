"use client";

import { useEffect, useRef, type RefObject } from "react";

const TICK_MS = 70;
const widths = new Map<number, number>();

/** Width in px of one IBM Plex Mono cell at `fontPx`, measured from a hidden 100-char span. */
export function cellWidth(fontPx: number): number {
  let w = widths.get(fontPx);
  if (w) return w;
  const s = document.createElement("span");
  s.textContent = "0".repeat(100);
  s.style.cssText = `position:absolute;left:-9999px;visibility:hidden;white-space:pre;font:${fontPx}px "IBM Plex Mono",monospace`;
  document.body.append(s);
  w = s.getBoundingClientRect().width / 100 || fontPx * 0.6;
  s.remove();
  widths.set(fontPx, w);
  return w;
}

export const prefersReducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Writes `frame(t)` into `ref.current.textContent` at ~14 fps. `t` advances 0.07 per tick
 * (1 per second of visible time). Paused off screen and in hidden tabs; one static frame
 * under reduced motion.
 */
export function useAsciiLoop(ref: RefObject<HTMLElement | null>, frame: (t: number) => string) {
  const fn = useRef(frame);
  useEffect(() => {
    fn.current = frame;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let t = 0, last = 0, raf = 0, onScreen = false, dead = false;
    let io: IntersectionObserver | undefined;
    const reduce = prefersReducedMotion();
    const draw = () => {
      el.textContent = fn.current(t);
    };
    const tick = (now: number) => {
      raf = 0;
      if (!onScreen || document.hidden) return;
      raf = requestAnimationFrame(tick);
      if (now - last < TICK_MS - 5) return;
      last = now;
      t += 0.07;
      draw();
    };
    const start = () => {
      if (!raf && onScreen && !document.hidden) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      widths.clear();
      if (reduce) draw();
    };

    document.fonts.ready.then(() => {
      if (dead) return;
      widths.clear();
      draw();
      window.addEventListener("resize", onResize);
      if (reduce) return;
      io = new IntersectionObserver(([e]) => {
        onScreen = e.isIntersecting;
        start();
      });
      io.observe(el);
      document.addEventListener("visibilitychange", start);
    });

    return () => {
      dead = true;
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", start);
    };
  }, [ref]);
}
