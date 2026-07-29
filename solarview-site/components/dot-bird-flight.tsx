"use client";

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";
import framesData from "@/lib/dot-bird-frames.json";

type Cell = [number, number] | [number, number, string];

type FramesPayload = {
  cols: number;
  rows: number;
  fps: number;
  frames: Cell[][];
};

const DATA = framesData as unknown as FramesPayload;

const ACCENT: Record<string, string> = {
  r: "#ff5a5a",
  g: "#5ae08a",
  c: "#5ab0ff",
};

function downsampleFrame(cells: Cell[], block: number): Cell[] {
  if (block <= 1) return cells;
  const map = new Map<string, string>();
  for (const item of cells) {
    const gx = Math.floor(item[0] / block);
    const gy = Math.floor(item[1] / block);
    const key = `${gx},${gy}`;
    const color = item.length > 2 ? String(item[2]) : "w";
    const prev = map.get(key);
    if (!prev || (prev === "w" && color !== "w")) {
      map.set(key, color);
    }
  }
  const out: Cell[] = [];
  for (const [key, color] of map) {
    const [gx, gy] = key.split(",").map(Number);
    out.push(color === "w" ? [gx, gy] : [gx, gy, color]);
  }
  return out;
}

function downsampleFrames(block: number) {
  const cols = Math.ceil(DATA.cols / block);
  const rows = Math.ceil(DATA.rows / block);
  const frames = DATA.frames.map((cells) => downsampleFrame(cells, block));
  return { cols, rows, frames };
}

function maxContentSize(frames: Cell[][]) {
  return frames.reduce(
    (acc, cells) => {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      for (const item of cells) {
        const [gx, gy] = item;
        if (gx < minX) minX = gx;
        if (gy < minY) minY = gy;
        if (gx > maxX) maxX = gx;
        if (gy > maxY) maxY = gy;
      }
      if (!Number.isFinite(minX)) return acc;
      return {
        cols: Math.max(acc.cols, maxX - minX + 1),
        rows: Math.max(acc.rows, maxY - minY + 1),
      };
    },
    { cols: 1, rows: 1 },
  );
}

interface DotBirdFlightProps {
  className?: string;
  /** CSS size for the square canvas. */
  size?: string;
  paused?: boolean;
  /** Override white dots (accents keep their colors). */
  dotColor?: string;
  /** Fill ratio inside each grid cell (0–1). */
  fillRatio?: number;
  /**
   * `content` — fixed scale from the largest pose, bird centered (hero).
   * `stage` — full motion bbox (lab).
   */
  fit?: "content" | "stage";
  /**
   * Downsample factor: 1 = source resolution, 2 = 2×2 cells → 1 pixel, etc.
   * Bigger block = chunkier pixels, same overall bird size.
   */
  blockSize?: number;
}

function DotBirdFlight({
  className,
  size = "100%",
  paused = false,
  dotColor = "#ffffff",
  fillRatio = 0.62,
  fit = "content",
  blockSize = 1,
}: DotBirdFlightProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const block = Math.max(1, Math.floor(blockSize));
  const grid = useMemo(() => downsampleFrames(block), [block]);
  const contentMax = useMemo(() => maxContentSize(grid.frames), [grid]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let frameIndex = 0;
    let lastTs = 0;
    const frameMs = 1000 / DATA.fps;

    const paint = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssW = canvas.clientWidth;
      const cssH = canvas.clientHeight;
      if (cssW === 0 || cssH === 0) return;

      const pixelW = Math.round(cssW * dpr);
      const pixelH = Math.round(cssH * dpr);
      if (canvas.width !== pixelW || canvas.height !== pixelH) {
        canvas.width = pixelW;
        canvas.height = pixelH;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);

      const cells = grid.frames[frameIndex] ?? [];
      if (cells.length === 0) return;

      const gridCols = fit === "stage" ? grid.cols : contentMax.cols;
      const gridRows = fit === "stage" ? grid.rows : contentMax.rows;

      // Fixed integer cell size — same every frame (no grow/shrink)
      const cell = Math.max(
        2,
        Math.floor(Math.min(cssW / gridCols, cssH / gridRows)),
      );
      const gapBudget = cell * (1 - fillRatio);
      const pad = Math.max(
        cell >= 3 ? 1 : 0,
        Math.floor(gapBudget / 2),
      );
      const side = Math.max(1, cell - pad * 2);

      let originX = 0;
      let originY = 0;
      if (fit === "content") {
        let sx = 0;
        let sy = 0;
        for (const item of cells) {
          sx += item[0];
          sy += item[1];
        }
        const cx = sx / cells.length;
        const cy = sy / cells.length;
        originX = cssW / 2 - cx * cell;
        originY = cssH / 2 - cy * cell;
      } else {
        originX = (cssW - grid.cols * cell) / 2;
        originY = (cssH - grid.rows * cell) / 2;
      }

      for (const item of cells) {
        const [gx, gy] = item;
        const accent = item.length > 2 ? item[2] : undefined;
        ctx.fillStyle = accent && ACCENT[accent] ? ACCENT[accent] : dotColor;
        ctx.fillRect(
          Math.round(originX + gx * cell + pad),
          Math.round(originY + gy * cell + pad),
          side,
          side,
        );
      }
    };

    const tick = (ts: number) => {
      if (!pausedRef.current) {
        if (lastTs === 0) lastTs = ts;
        const elapsed = ts - lastTs;
        if (elapsed >= frameMs) {
          const steps = Math.floor(elapsed / frameMs);
          frameIndex = (frameIndex + steps) % grid.frames.length;
          lastTs += steps * frameMs;
          paint();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    paint();
    raf = requestAnimationFrame(tick);

    const ro = new ResizeObserver(() => paint());
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [dotColor, fillRatio, fit, grid, contentMax]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block shrink-0", className)}
      style={{
        width: size,
        height: size,
        background: "transparent",
        imageRendering: "pixelated",
      }}
      aria-hidden
    />
  );
}

export { DotBirdFlight };
