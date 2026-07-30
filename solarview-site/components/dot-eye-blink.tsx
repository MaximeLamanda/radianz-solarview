"use client";

import { useEffect, useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

type Cell = [number, number];

/**
 * Blink cycle — filled eye with left→right glance while open.
 */
function buildEyeFrames(gridSize: number): Cell[][] {
  const cx = (gridSize - 1) / 2;
  const cy = (gridSize - 1) / 2;
  const rx = (gridSize - 1) / 2 - 0.4;
  // Flatter oval — less vertical open than a circle
  const maxRy = (gridSize - 3) / 2 * 0.62;

  // halfH + pupil X offset (negative = look left)
  const sequence: { halfH: number; lookX: number }[] = [
    { halfH: 0, lookX: 0 },
    { halfH: 0, lookX: 0 },
    { halfH: maxRy * 0.3, lookX: 0 },
    { halfH: maxRy * 0.65, lookX: 0 },
    { halfH: maxRy, lookX: -2 },
    { halfH: maxRy, lookX: -2 },
    { halfH: maxRy, lookX: -1 },
    { halfH: maxRy, lookX: 0 },
    { halfH: maxRy, lookX: 1 },
    { halfH: maxRy, lookX: 2 },
    { halfH: maxRy, lookX: 2 },
    { halfH: maxRy, lookX: 0 },
    { halfH: maxRy * 0.65, lookX: 0 },
    { halfH: maxRy * 0.3, lookX: 0 },
    { halfH: 0, lookX: 0 },
    { halfH: 0, lookX: 0 },
  ];

  return sequence.map(({ halfH, lookX }) => {
    const cells: Cell[] = [];

    if (halfH < 0.35) {
      for (let gx = Math.ceil(cx - rx); gx <= Math.floor(cx + rx); gx++) {
        cells.push([gx, Math.round(cy)]);
        cells.push([gx, Math.round(cy) - 1]);
      }
      return dedupe(cells, gridSize);
    }

    const ry = halfH;
    const pupilR = Math.max(1.1, ry * 0.42);
    const pupilCx = cx + lookX;

    for (let gy = 0; gy < gridSize; gy++) {
      for (let gx = 0; gx < gridSize; gx++) {
        const nx = (gx - cx) / rx;
        const ny = (gy - cy) / ry;
        if (nx * nx + ny * ny > 1) continue;

        if (halfH >= maxRy * 0.55) {
          const px = gx - pupilCx;
          const py = gy - cy;
          if (px * px + py * py <= pupilR * pupilR) continue;
        }

        cells.push([gx, gy]);
      }
    }

    return dedupe(cells, gridSize);
  });
}

function dedupe(cells: Cell[], gridSize: number): Cell[] {
  const seen = new Set<string>();
  const unique: Cell[] = [];
  for (const [gx, gy] of cells) {
    const key = `${gx},${gy}`;
    if (seen.has(key)) continue;
    if (gx < 0 || gy < 0 || gx >= gridSize || gy >= gridSize) continue;
    seen.add(key);
    unique.push([gx, gy]);
  }
  return unique;
}

interface DotEyeBlinkProps {
  className?: string;
  size?: string;
  cellSize?: number;
  fillRatio?: number;
  dotColor?: string;
  fps?: number;
  paused?: boolean;
  label?: string;
}

function DotEyeBlink({
  className,
  size,
  cellSize = 6,
  fillRatio = 0.62,
  dotColor = "rgba(10,10,10,0.45)",
  fps = 2,
  paused = false,
  label,
}: DotEyeBlinkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  const gridSize = 15;
  const frames = useMemo(() => buildEyeFrames(gridSize), []);
  const cssSize = size ?? `${gridSize * cellSize}px`;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let frameIndex = 0;
    let lastTs = 0;
    const frameMs = 1000 / fps;

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

      const cells = frames[frameIndex] ?? [];
      if (cells.length === 0) return;

      const cell = cellSize;
      const gapBudget = cell * (1 - fillRatio);
      const pad = Math.max(cell >= 3 ? 1 : 0, Math.floor(gapBudget / 2));
      const side = Math.max(1, cell - pad * 2);
      const originX = (cssW - gridSize * cell) / 2;
      const originY = (cssH - gridSize * cell) / 2;

      ctx.fillStyle = dotColor;
      for (const [gx, gy] of cells) {
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
          frameIndex = (frameIndex + steps) % frames.length;
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
  }, [cellSize, dotColor, fillRatio, fps, frames]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("block shrink-0", className)}
      style={{
        width: cssSize,
        height: cssSize,
        background: "transparent",
        imageRendering: "pixelated",
      }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}

export { DotEyeBlink };
