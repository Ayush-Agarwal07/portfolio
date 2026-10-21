"use client";

import { useRef, type PointerEvent, type MouseEvent, type ReactNode } from "react";
import { BlackHole } from "./asciiFrames";
import { cellWidth, useAsciiLoop } from "./useAsciiLoop";

const FONT_PX = 11;
const LH = FONT_PX * 1.05;

export function BlackHoleHero({
  children,
  figLabel,
  feedLabel,
}: {
  children: ReactNode;
  figLabel: string;
  feedLabel: string;
}) {
  const stageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const preRef = useRef<HTMLPreElement>(null);
  const hole = useRef<BlackHole>(null);
  hole.current ??= new BlackHole();

  useAsciiLoop(preRef, () => {
    const h = hole.current!;
    const stage = stageRef.current!, sec = sectionRef.current!;
    const w = stage.getBoundingClientRect(), s = sec.getBoundingClientRect();
    // Stick by the bottom edge when the hero is taller than the viewport (small phones).
    const top = Math.min(0, Math.round(window.innerHeight - s.height));
    if (sec.style.top !== `${top}px`) sec.style.top = `${top}px`;
    const span = w.height - s.height;
    const target = span > 0 ? Math.min(1, Math.max(0, (top - w.top) / span)) : 0;
    const cur = h.scrollP;
    h.scrollP = Math.abs(target - cur) < 0.002 ? target : cur + (target - cur) * 0.3;

    const p = h.scrollP;
    const opacity = Math.max(0, 1 - p * 2.6).toFixed(3);
    const text = textRef.current!.style;
    text.opacity = opacity;
    text.transform = `translateY(${(-p * 60).toFixed(1)}px)`;
    text.visibility = p > 0.4 ? "hidden" : "visible";

    h.measure(s, slotRef.current!.getBoundingClientRect(), cellWidth(FONT_PX), LH);
    h.step();
    return h.frame();
  });

  const cellOf = (e: { clientX: number; clientY: number; currentTarget: Element }) => {
    const r = e.currentTarget.getBoundingClientRect();
    return { x: (e.clientX - r.left) / cellWidth(FONT_PX), y: (e.clientY - r.top) / LH };
  };
  const move = (e: PointerEvent<HTMLButtonElement>) => {
    // Touch has no hover, so tilt and time dilation are mouse/pen only.
    if (e.pointerType !== "touch") hole.current!.mouse = cellOf(e);
  };
  const leave = () => {
    hole.current!.mouse = null;
  };
  const feed = (e: MouseEvent<HTMLButtonElement>) => {
    const h = hole.current!;
    if (e.detail > 0) {
      const c = cellOf(e), G = h.geom();
      h.feed((c.x - G.cx) / G.ux / G.zoom, (c.y - G.cy) / G.uy / G.zoom);
    } else {
      h.feed(); // keyboard: random angle
    }
  };

  return (
    <div ref={stageRef} className="hero-stage">
      <section id="top" ref={sectionRef} className="hero">
        <button
          type="button"
          className="hero-feed"
          aria-label={feedLabel}
          onClick={feed}
          onPointerMove={move}
          onPointerLeave={leave}
        >
          <pre ref={preRef} aria-hidden="true" className="hero-hole" />
        </button>
        <div className="hero-inner">
          <div ref={textRef} className="hero-text">
            {children}
          </div>
          <figure role="img" aria-label={figLabel} className="hero-figure">
            <div ref={slotRef} className="hero-slot" />
          </figure>
        </div>
      </section>
      <div className="hero-runway" aria-hidden="true" />
    </div>
  );
}
