"use client";

import { useEffect, useRef, useState } from "react";
import { cellWidth, prefersReducedMotion } from "./useAsciiLoop";

type Theme = "light" | "dark";

const GLYPHS = "01<>/\\{}[]=+*#:;$%&ABCDEFGHJKLMNPRSTUVWXYZ";
const DURATION = 1100;
const TRAIL = 12;
const FONT_PX = 12;
const LH = FONT_PX * 1.05;

/** Matrix rain: each column's drop reveals the new theme above its head; old bg stays below. */
function rain(oldBg: string, newInk: string, done: () => void) {
  const cw = cellWidth(FONT_PX);
  const rows = Math.ceil(window.innerHeight / LH);
  const layer = document.createElement("div");
  layer.className = "rain";
  layer.setAttribute("aria-hidden", "true");
  const cols = Array.from({ length: Math.ceil(window.innerWidth / cw) }, (_, i) => {
    const el = document.createElement("div");
    el.style.cssText = `left:${(i * cw).toFixed(1)}px;width:${(cw + 0.2).toFixed(1)}px;top:0;background:${oldBg}`;
    layer.append(el);
    const d = Math.random() * 0.4;
    return { el, d, dur: (1 - d) * (0.55 + Math.random() * 0.45), seed: Math.floor(Math.random() * 1000) };
  });
  const pre = document.createElement("pre");
  pre.style.color = newInk;
  layer.append(pre);
  document.body.append(layer);

  const start = performance.now();
  const step = (now: number) => {
    const wp = Math.min(1, (now - start) / DURATION);
    if (wp >= 1) {
      layer.remove();
      done();
      return;
    }
    const heads = cols.map((c) => {
      const head = Math.min(1, Math.max(0, (wp - c.d) / c.dur)) * (rows + TRAIL);
      c.el.style.top = `${Math.max(0, head * LH).toFixed(1)}px`;
      return head;
    });
    const lines: string[] = [];
    for (let y = 0; y < rows; y++) {
      let line = "";
      for (let x = 0; x < cols.length; x++) {
        const dist = heads[x] - y;
        if (dist < 0 || dist > TRAIL || heads[x] <= 0) { line += " "; continue; }
        if (dist > 1 && Math.random() > 1 - (dist / TRAIL) * 0.85) { line += " "; continue; }
        line += GLYPHS[(cols[x].seed + y * 7 + Math.floor(Math.random() * 3)) % GLYPHS.length];
      }
      lines.push(line);
    }
    pre.textContent = lines.join("\n");
    requestAnimationFrame(step);
  };
  step(start);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);
  const busy = useRef(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const choose = (next: Theme) => {
    const root = document.documentElement;
    if (busy.current || root.dataset.theme === next) return;
    const oldBg = getComputedStyle(root).getPropertyValue("--bg").trim();
    root.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
    if (prefersReducedMotion()) return;
    busy.current = true;
    rain(oldBg, getComputedStyle(root).getPropertyValue("--ink").trim(), () => {
      busy.current = false;
    });
  };

  return (
    <div role="group" aria-label="Color theme" className="theme-toggle">
      <button type="button" data-for="light" aria-pressed={theme === "light"} onClick={() => choose("light")}>
        light
      </button>
      <span aria-hidden="true">/</span>
      <button type="button" data-for="dark" aria-pressed={theme === "dark"} onClick={() => choose("dark")}>
        dark
      </button>
    </div>
  );
}
