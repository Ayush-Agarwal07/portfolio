"use client";

import { useEffect, useRef } from "react";

type TokenNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  glyph: string | null;
  hue: number;
};

type Pulse = {
  a: TokenNode;
  b: TokenNode;
  t: number;
  hue: "terra" | "blue";
};

const COUNT = 64;
const LINK_DIST = 160;
const PULSE_RATE = 0.012;
const GLYPHS = [
  "▮",
  "▯",
  "·",
  "•",
  "◆",
  "◇",
  "○",
  "□",
  "qkv",
  "<bos>",
  "</s>",
  "tok",
  "ctx",
  "agent",
  "mem",
  "α",
  "β",
  "θ",
  "λ",
  "π",
  "Σ",
  "∇",
  "∂",
  "0x1F",
  "0xA4",
  "→",
  "↦",
  "⊗",
  "⊕",
  "≡",
  "syn",
  "rag",
  "eval",
  "0.74",
  "p99",
  "k=8",
];

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    const context = canvasElement?.getContext("2d");
    if (!canvasElement || !context) return;

    const canvas: HTMLCanvasElement = canvasElement;
    const ctx: CanvasRenderingContext2D = context;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let nodes: TokenNode[] = [];
    let pulses: Pulse[] = [];
    let raf = 0;
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function init() {
      resize();
      nodes = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: rand(-0.12, 0.12),
        vy: rand(-0.07, 0.07),
        r: rand(1.2, 2.2),
        glyph: Math.random() < 0.18 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
        hue: Math.random(),
      }));
      pulses = [];
    }

    function drawEdges() {
      ctx.lineWidth = 0.8;

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSquared = dx * dx + dy * dy;

          if (distSquared > LINK_DIST * LINK_DIST) continue;

          const distance = Math.sqrt(distSquared);
          const strength = 1 - distance / LINK_DIST;
          const alpha = Math.pow(strength, 1.6) * 0.32;
          const hueMix = (a.hue + b.hue) * 0.5;

          ctx.strokeStyle =
            hueMix < 0.5
              ? `oklch(0.58 0.13 38 / ${alpha.toFixed(3)})`
              : `oklch(0.40 0.08 245 / ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    function maybeStartPulse() {
      if (Math.random() >= PULSE_RATE || pulses.length >= 6) return;

      const a = nodes[Math.floor(Math.random() * nodes.length)];
      let bestNeighbor: TokenNode | null = null;
      let bestDistance = Infinity;

      for (const b of nodes) {
        if (b === a) continue;

        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const distance = dx * dx + dy * dy;

        if (distance < bestDistance && distance < LINK_DIST * LINK_DIST) {
          bestDistance = distance;
          bestNeighbor = b;
        }
      }

      if (bestNeighbor) {
        pulses.push({
          a,
          b: bestNeighbor,
          t: 0,
          hue: Math.random() < 0.5 ? "terra" : "blue",
        });
      }
    }

    function drawPulses() {
      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const pulse = pulses[i];
        pulse.t += 0.015;

        if (pulse.t >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const x = pulse.a.x + (pulse.b.x - pulse.a.x) * pulse.t;
        const y = pulse.a.y + (pulse.b.y - pulse.a.y) * pulse.t;
        const fade = Math.sin(pulse.t * Math.PI);

        ctx.beginPath();
        ctx.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle =
          pulse.hue === "terra"
            ? `oklch(0.58 0.13 38 / ${(0.85 * fade).toFixed(3)})`
            : `oklch(0.40 0.08 245 / ${(0.85 * fade).toFixed(3)})`;
        ctx.fill();
      }
    }

    function drawNodes() {
      ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      for (const node of nodes) {
        ctx.fillStyle =
          node.hue < 0.5 ? "oklch(0.58 0.13 38 / 0.55)" : "oklch(0.40 0.08 245 / 0.55)";

        if (node.glyph) {
          ctx.fillText(node.glyph, node.x, node.y);
          continue;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < -20) node.x = width + 20;
        else if (node.x > width + 20) node.x = -20;

        if (node.y < -20) node.y = height + 20;
        else if (node.y > height + 20) node.y = -20;
      }

      drawEdges();
      maybeStartPulse();
      drawPulses();
      drawNodes();

      raf = requestAnimationFrame(step);
    }

    function handleResize() {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(raf);
        init();
        step();
      }, 150);
    }

    function handleVisibilityChange() {
      if (document.hidden) cancelAnimationFrame(raf);
      else step();
    }

    init();
    step();
    window.addEventListener("resize", handleResize);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />;
}
