// Ported from the design mockup. Constants were tuned by eye; keep them.

export function chartFrame(t: number): string {
  const W = 40, H = 11, rows: string[] = [];
  const ys: number[] = [];
  for (let x = 0; x < W; x++) {
    const k = x + t * 6;
    const p = Math.sin(k * 0.22) * 0.35 + Math.sin(k * 0.07) * 0.4 + Math.sin(k * 0.53) * 0.12;
    ys.push(Math.round((1 - (p + 0.9) / 1.8) * (H - 1)));
  }
  for (let y = 0; y < H; y++) {
    let row = "";
    for (let x = 0; x < W; x++) {
      if (ys[x] === y) row += x === W - 1 ? "@" : "*";
      else if (y > ys[x]) row += (x + y) % 2 === 0 ? ":" : ".";
      else row += " ";
    }
    rows.push(row);
  }
  const sig = Math.sin(t * 0.8) > 0 ? "BUY  ^" : "HOLD =";
  rows.push("─".repeat(W));
  rows.push(("NVDA  signal: " + sig + "                    ").slice(0, W));
  return rows.join("\n");
}

export function searchFrame(t: number): string {
  const q = "~Lectures/Day 23";
  const step = Math.floor(t * 9) % (q.length + 20);
  const typed = q.slice(0, Math.min(step, q.length));
  const cursor = Math.floor(t * 4) % 2 === 0 ? "_" : " ";
  const done = step >= q.length;
  return [
    "┌──────────────────────────────┐",
    "│ > " + (typed + cursor).padEnd(27) + "│",
    "├──────────────────────────────┤",
    "│ " + (done ? "* Bio/Lectures/Day 23.pdf" : "").padEnd(29) + "│",
    "│ " + (done ? "  Calc/Lectures/Day 23" : "").padEnd(29) + "│",
    "│ " + (done ? "  Chem/Lectures/Day 2-3" : "").padEnd(29) + "│",
    "└──────────────────────────────┘",
  ].join("\n");
}

export function treeFrame(t: number): string {
  const files = ["├─ src/", "│  ├─ agents/", "│  │  └─ decompose.py", "│  ├─ retrieval.py", "│  └─ api.py", "├─ evals/", "└─ README.md"];
  const hit = Math.floor(t * 2) % files.length;
  return ["repo/".padEnd(32)].concat(files.map((f, i) => (i === hit ? f + "  <- reading" : f).padEnd(32))).join("\n");
}

export function orbitFrame(t: number): string {
  const W = 21, H = 7, grid: string[][] = [];
  for (let y = 0; y < H; y++) grid.push(new Array(W).fill(" "));
  grid[3][10] = "@";
  for (let i = 0; i < 3; i++) {
    const a = t * 1.4 + i * 2.09;
    const x = Math.round(10 + Math.cos(a) * 9);
    const y = Math.round(3 + Math.sin(a) * 3);
    grid[y][x] = i === 0 ? "o" : ".";
  }
  return grid.map((r) => r.join("")).join("\n");
}

// --- black hole -----------------------------------------------------------

type HoleGeo = { cols: number; rows: number; sx0: number; sy0: number; sx1: number; sy1: number; scx: number; scy: number };
type Food = { rd: number; ad: number; ch: string };

const smooth = (a: number, b: number, x: number) => {
  const q = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return q * q * (3 - 2 * q);
};

export class BlackHole {
  view = { flat: 0.28, roll: 0, rate: 1 };
  food: Food[] = [];
  flare = 0;
  ht = 0;
  scrollP = 0;
  /** Pointer position in cells, relative to the section. null = resting. */
  mouse: { x: number; y: number } | null = null;
  hg: HoleGeo = { cols: 78, rows: 34, sx0: 0, sy0: 0, sx1: 78, sy1: 34, scx: 39, scy: 17 };

  /** s = section rect, b = figure slot rect, cw/lh = cell size in px. */
  measure(s: DOMRect, b: DOMRect, cw: number, lh: number) {
    if (!s.width || !b.width) return;
    const cols = Math.min(260, Math.ceil(s.width / cw));
    const rows = Math.min(110, Math.ceil(s.height / lh));
    const sx0 = (b.left - s.left) / cw, sy0 = (b.top - s.top) / lh;
    const sx1 = (b.right - s.left) / cw, sy1 = (b.bottom - s.top) / lh;
    this.hg = { cols, rows, sx0, sy0, sx1, sy1, scx: (sx0 + sx1) / 2, scy: (sy0 + sy1) / 2 };
  }

  geom() {
    const hg = this.hg, sp = this.scrollP;
    const e = smooth(0, 0.45, sp);
    const lerp = (a: number, b: number) => a + (b - a) * e;
    const zq = Math.min(1, Math.max(0, (sp - 0.35) / 0.65));
    return {
      cols: hg.cols, rows: hg.rows,
      cx: lerp(hg.scx, hg.cols / 2), cy: lerp(hg.scy, hg.rows / 2),
      ux: 32.5 * (1 + e * 0.9), uy: 17 * (1 + e * 0.9),
      zoom: 1 + zq * zq * 10,
      fade: 1 - smooth(0.6, 1, sp),
      x0: lerp(hg.sx0, 0), y0: lerp(hg.sy0, 0), x1: lerp(hg.sx1, hg.cols), y1: lerp(hg.sy1, hg.rows),
    };
  }

  step() {
    const mc = this.mouse;
    let flatT = 0.28, rollT = 0, rateT = 1;
    if (mc) {
      const G = this.geom();
      const u = (mc.x - G.cx) / G.ux, v = (mc.y - G.cy) / G.uy;
      flatT = 0.06 + 0.8 * Math.min(1, Math.max(0, (v + 1) / 2));
      rollT = Math.max(-0.5, Math.min(0.5, u * 0.35));
      const d = Math.hypot(u, v);
      const s = Math.min(1, Math.max(0, (d - 0.3) / 0.9));
      rateT = 0.04 + 0.96 * s * s * (3 - 2 * s);
    }
    const vw = this.view;
    vw.flat += (flatT - vw.flat) * 0.08;
    vw.roll += (rollT - vw.roll) * 0.08;
    vw.rate += (rateT - vw.rate) * 0.15;
    this.ht += 0.07 * vw.rate;
    // matter falling in: spiral inward, faster as it gets closer
    const food = this.food;
    for (let i = food.length - 1; i >= 0; i--) {
      const p = food[i];
      p.ad += (0.07 * vw.rate * 1.1) / Math.pow(Math.max(p.rd, 0.25), 1.5);
      p.rd -= 0.07 * vw.rate * (0.12 + 0.35 / (p.rd + 0.2)) * 0.75;
      if (p.rd < 0.3) {
        food.splice(i, 1);
        this.flare = Math.min(1.5, this.flare + 0.06);
      }
    }
    this.flare *= 0.95;
  }

  /** (u0, v0) in disk units relative to the centre; omit for a random angle. */
  feed(u0?: number, v0?: number) {
    const vw = this.view;
    const cr = Math.cos(vw.roll), sr = Math.sin(vw.roll);
    let rd0: number, ad0: number;
    if (u0 == null || v0 == null) {
      rd0 = 1.5;
      ad0 = Math.random() * Math.PI * 2;
    } else {
      const u = u0 * cr + v0 * sr, v = -u0 * sr + v0 * cr;
      rd0 = Math.min(2.4, Math.max(0.6, Math.hypot(u, v / vw.flat)));
      ad0 = Math.atan2(v / vw.flat, u);
    }
    const text = "AGENTSTHATSHOWTHEIRWORK";
    const food = this.food;
    for (let i = 0; i < 46; i++) {
      food.push({
        rd: rd0 + (Math.random() - 0.5) * 0.35,
        ad: ad0 + (Math.random() - 0.5) * 0.7,
        ch: text[Math.floor(Math.random() * text.length)],
      });
    }
    if (food.length > 400) food.splice(0, food.length - 400);
  }

  frame(): string {
    const t = this.ht;
    const G = this.geom();
    const W = G.cols, H = G.rows, zoom = G.zoom, fade = G.fade;
    const view = this.view;
    const cr = Math.cos(view.roll), sr = Math.sin(view.roll);
    const ramp = " .,:;-=+*#%@";
    const text = "AGENTS THAT SHOW THEIR WORK  OBSERVE  PLAN  ACT  VERIFY  ";
    const fl = this.flare;
    const rows: string[] = [];
    for (let y = 0; y < H; y++) {
      let row = "";
      for (let x = 0; x < W; x++) {
        if (x < G.x0 || x >= G.x1 || y < G.y0 || y >= G.y1) { row += " "; continue; }
        const u0 = (x - G.cx) / G.ux / zoom;
        const v0 = (y - G.cy) / G.uy / zoom;
        const u = u0 * cr + v0 * sr;
        const v = -u0 * sr + v0 * cr;
        // sqrt, not Math.hypot: hypot is several times slower in V8 and this runs per cell.
        const r = Math.sqrt(u * u + v * v);
        const a = Math.atan2(v, u);
        const dv = v / view.flat;
        const rd = Math.sqrt(u * u + dv * dv);
        const ad = Math.atan2(dv, u);
        const swirl = ad - t * 0.9 + 1.3 / (rd + 0.15);
        const streak = 0.5 + 0.5 * Math.sin(swirl * 5 + rd * 9);
        let disk = Math.exp(-Math.pow((rd - 0.8) / 0.34, 2)) * (0.3 + 0.7 * streak);
        disk *= 1 - 0.25 * Math.cos(ad);
        const halo = Math.exp(-Math.pow((r - 0.42) / 0.07, 2)) * (0.5 + 0.5 * Math.sin(a * 3 - t * 1.6));
        const ring = Math.exp(-Math.pow((r - 0.31) / (0.03 + fl * 0.05), 2)) * (1 + fl * 2);
        let I = r < 0.29 ? (v > 0 ? disk : 0) : halo * 0.85 + ring + disk;
        if (I < 0.05) {
          const h = ((x * 73856093) ^ (y * 19349663)) >>> 0;
          if (h % 89 === 0) I = 0.25 + 0.25 * Math.sin(t * 3 + h);
        }
        I = Math.max(0, Math.min(1, I * fade));
        let ch: string;
        if (I > 0.6) {
          ch = text[(y * W + x + Math.floor(t * 12)) % text.length];
          if (ch === " ") ch = "·";
        } else {
          ch = ramp[Math.min(ramp.length - 1, Math.floor(I * 1.7 * (ramp.length - 1)))];
        }
        row += ch;
      }
      rows.push(row);
    }
    if (!this.food.length) return rows.join("\n");
    const grid = rows.map((r) => r.split(""));
    for (const p of this.food) {
      const u = p.rd * Math.cos(p.ad), v = p.rd * Math.sin(p.ad) * view.flat;
      const u0 = u * cr - v * sr, v0 = u * sr + v * cr;
      const x = Math.round(G.cx + u0 * G.ux * zoom);
      const y = Math.round(G.cy + v0 * G.uy * zoom);
      if (x < G.x0 || x >= G.x1 || y < G.y0 || y >= G.y1 || x >= W || y >= H) continue;
      grid[y][x] = p.rd > 0.75 ? p.ch : p.rd > 0.45 ? "*" : ".";
    }
    return grid.map((r) => r.join("")).join("\n");
  }
}
